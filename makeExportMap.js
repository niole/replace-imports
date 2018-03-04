const path = require('path');
const fs = require('fs');


const isImportPattern = /^\s*import/;
const isFromPackagePattern = /@domino\/(.+)'|@domino\/(.+)"/;

const isExportPattern = /^\s*export/;
const getExportNameMatcher = /^\s*export\s*{\s*default\s*as\s*(.*)\s*}\s*from\s*.+/;
const getExportNameMultiLineMatcher = /^\s*default\s*as\s*(.*)\s*/;
const getExportPathMatcher = /^\s*export\s*{\s*default\s*as\s*.*\s*}\s*from\s*(.+)/;
const getExportMultiLinePathMatcher = /^\s*\s*}\s*from\s*(.+)/;
const getWildcardExportMatcher = /\s*export\s*(\*)\s*from\s*.*/;
const getWildcardExportPathMatcher = /\s*export\s*\*\s*from\s*(.+)/;

const failedParses = [];


function walk({ dir = ".", depth = 0, fileCallback = () => {}, dirCallback = () => {}, state = {}, ignoreDirs = /node_modules|stories|test|tests/}, cb) {
    fs.readdir(dir, (error, entities) => {
        if (error) {
            reject(error);
        } else {
            const filesList = entities.filter(e => !ignoreDirs.test(e));

            const promises = filesList.map(file => {
                const nextPath = path.join(dir, file);
                return new Promise(function(resolve, reject) {

                    fs.stat(nextPath, (error, stats) => {

                        if (error) {
                            reject(error);
                        } else if (stats.isDirectory()) {
                            dirCallback(nextPath, file, depth, state, (updatedState) => {
                                walk({
                                    dir: nextPath,
                                    depth: depth + 1,
                                    fileCallback,
                                    dirCallback,
                                    state: updatedState,
                                },
                                stateComingUp => {
                                    resolve(stateComingUp);
                                });
                            });
                        } else if (stats.isFile()) {
                            fileCallback(nextPath, file, depth, state, (updatedState) => {
                                resolve(updatedState);
                            });
                        }
                    });

                });

            });

            Promise.all(promises).then(states => {
                cb(states.reduce((acc, next) => Object.assign({}, next, acc), state));
            });

        }
    });
}

function getFileContent(filePath, callback) {
    fs.readFile(filePath, 'utf-8', (error, content) => {
        if (error) {
            throw error;
        } else {
            callback(content);
        }
    });
}

/*
 * tries to get name of export
 */
function getExportName(exportLine) {
    const name = exportLine.match(getExportNameMatcher);
    if (name) {
        return name[1];
    } else {
        const wildcard = exportLine.match(getWildcardExportMatcher);
        if (wildcard) {
            return wildcard[1];
        } else {
            const mulitName = exportLine.match(getExportNameMultiLineMatcher);
            if (mulitName) {
                return mulitName[1];
            }
        }
    }

    console.warn("couldn't get name for line :", exportLine);

    failedParses.push(exportLine);

    return "";
}

/*
 * tries to get path to export
 */
function getPathToDepFromExport(exportLine) {
    const pathToExport = exportLine.match(getExportPathMatcher);
    if (pathToExport) {
        return pathToExport[1];
    } else {
        const pathToWildCard = exportLine.match(getWildcardExportPathMatcher);
        if (pathToWildCard) {
            return pathToWildCard[1];
        } else {
            const multilinpath = exportLine.match(getExportMultiLinePathMatcher);
            if (multilinpath) {
                return multilinpath[1];
            }
        }
    }

    console.warn("couldn't get path from line :", exportLine);

    failedParses.push(exportLine);

    return "";
}

function getExportLines(lines) {
    let i = 0;
    let lookingForExport = true;
    let lookingForName = false;
    let lookingForPath = false;
    const exportLines = [];

    while (i < lines.length) {
        let line = lines[i];

        if (isExportPattern.test(line) && lookingForExport) {
            lookingForExport = false;
            lookingForName = true;
            exportLines.push({ name: "", path: ""});
        }

        if (lookingForName) {
            const exportName = getExportName(line);
            if (exportName) {
                lookingForName = false;
                lookingForPath = true;

                exportLines[exportLines.length - 1].name = exportName;
            }

        }

        if (lookingForPath) {
            const pathToDep = getPathToDepFromExport(line);
            if (pathToDep) {
                lookingForExport = true;
                lookingForPath = false;
                let path = pathToDep;
                var p = /'\.(.+)'|"\.(.+)"/
                const inside = path.match(p);
                if (inside) {
                    path = inside[1];
                }
                exportLines[exportLines.length - 1].path = path;
            }
        }

        i += 1;
    }

    return exportLines;
}

/*
 * make map from export name to path to export
 *
 * assume executed at top level
 * find exports and build map
 * { exportName: pathFromPackageLevel }
 */
function buildExportMap() {
    function fileCallback(fullPath, fileName, depth, state, cb) {
        if (fileName === "index.js") {
            getFileContent(fullPath, content => {
                // look for export names
                const lines = content.split("\n");
                const exportLines = getExportLines(lines);
                const path = fullPath.slice(0, fullPath.length - fileName.length - 1); // subtract 1 for the slash at end of fullPath before fileName

                const newState = exportLines.reduce((acc, nextSpec) => {
                   acc[nextSpec.name] =  path + nextSpec.path;
                   return acc;
                }, {});

                cb(newState);
            });
        } else {
            cb({});
        }
    }

    const opts = {
        fileCallback,
        dirCallback: (a, b, c, d, cb) => {
            cb(d)
        },
        state: {},
    };

    return new Promise(function(resolve, reject) {
        walk(opts, exportMap => {
            console.log('failed parses', failedParses);
            resolve(exportMap);
        });
    });
}

/*
 * make mapping from top level package to its uses, detailed by import names, file path location, line start, line end
 * this will help map to replacement strings in export map, but also allow easier replacement of import chunks
 *
 * { packageName: { importLocations: [{ filePath: string, lineStart: #, lineEnd: #, importNames: [string,...]},..] } }
 */
function makeExportUseMap() {
//function walk({ dir = ".", depth = 0, fileCallback = () => {}, dirCallback = () => {}, state = {}, ignoreDirs = /node_modules|stories|test|tests/}, cb) {
//const isImportPattern = /^\s*import/;
//const isFromPackagePattern = /@domino\/(.+)'|@domino\/(.+)"/;

}

buildExportMap().then(exportMap => {
    console.log('export map', exportMap);
});

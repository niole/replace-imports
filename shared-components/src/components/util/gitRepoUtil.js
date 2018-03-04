import React from 'react';
import {
  forceReload,
} from './sharedComponentUtil';

const isGitPattern = /\.git$/;

const references = [
  { value: "head", label: "Use default branch" },
  { value: "branches", label: "Branches" },
  { value: "tags", label: "Tags" },
  { value: "commitId", label: "Commit ID" },
  { value: "ref", label: "Custom Git Ref" },
];

export function getModalHeader(repoName) {
  if (repoName) {
    return `Editing ${repoName}`;
  }
  return 'Add a New Repository';
}

export function gitRepoURLValidator(url) {
  return !url || !isGitPattern.test(url);
}

function getRefExplainatoryPlaceholder(showingRef) {
  switch (showingRef) {
    case "tags":
      return "Specify the tag you want to use";

    case "commitId":
      return "Specify the commit id you want to use";

    case "ref":
      return "Specify the custom ref you want to use";

    case "branches":
      return "Specify the name of the branch you want to use";

    default:
      return "";
  }
}

export function addDefaultRefComponents(areReferencesCustomizable, baseFields, cantCustomizeRefMessage = "") {
  if (areReferencesCustomizable) {
    return baseFields.concat([[
      {
        inputType: "select",
        inputOptions: {
          key: "defaultref",
          className: "defaultref",
          label: "Default ref",
          options: references,
          onValuesUpdate: (value, props, values) => {
            const labelToUse = references.find(ref => ref.value === value);
            return {
              title: labelToUse ? labelToUse.label : "Default ref",
            };
          },
        },
      },
      {
        inputType: "input",
        inputOptions: {
          key: "refdetails",
          className: "refdetails",
          validated: true,
          validators: [
            {
              checker: (value, props, values) => {
                // check if should exist
                if (values.defaultref && values.defaultref !== "head") {
                  return !value;
                }
              },
              errorCreator: () => "You must specify a reference",
            },
          ],
          onValuesUpdate: (value, props, values) => {
            if (values.defaultref && values.defaultref !== "head") {
              return {
                placeholder: getRefExplainatoryPlaceholder(values.defaultref),
              };
            }

            return {
              type: "hidden",
            };
          },
        },
      },
    ]]);
  } else if (cantCustomizeRefMessage) {
    return baseFields.concat([[
      {
        inputType: "text",
        inputOptions: (
          <div className="uncustomizable-refs">
            {cantCustomizeRefMessage}
          </div>
        ),
      }
    ]]);
  }

  return baseFields;
}

export function returnUserToGitReposTab(ownerUsername, projectName) {
  const nextHref = `/u/${ownerUsername}/${projectName}/browse#gitrepos`;
  forceReload(nextHref);
}

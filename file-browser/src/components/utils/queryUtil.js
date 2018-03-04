import axios from 'axios';
import querystring from 'query-string';

export function archiveRepo(ownerUsername, projectName, uri, csrfToken) {
  const url = `/u/${ownerUsername}/${projectName}/repositories/archive`;

  return axios(url, {
    method: "POST",
    data: querystring.stringify({
      csrfToken,
      uri,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export function removeProjectDependency(projectUser, importedProjectName, csrfToken, dependencyName, dependencyId) {
  const url = `/u/${projectUser}/${importedProjectName}/dependencies/remove`;

  return axios(url, {
    method: "POST",
    data: querystring.stringify({
      csrfToken,
      dependencyName,
      dependencyId,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

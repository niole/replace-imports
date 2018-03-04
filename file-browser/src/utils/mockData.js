import randomSeed from 'random-seed';
import loremIpsum from 'lorem-ipsum';

export function mockUsername({ index = 0 } = {}) {
  const usernames = [
    'tstark',
    'jdoe',
    'chrismyang',
    'nelprin',
    'trob',
    'kshenk',
    'msteele',
    'earino',
  ];
  const username = usernames[index % usernames.length];
  return username;
}

export function mockUser(
  { index = 0, username = mockUsername({ index }) } = {},
) {
  return {
    username,
  };
}

export function mockSha(shaIndex) {
  const random = randomSeed.create(`mockSha-${shaIndex}`);
  let sha = '';
  for (let characterIndex = 0; characterIndex < 40; characterIndex++) {
    sha += random.range(16).toString(16);
  }
  return sha;
}

const defaultReferenceDate = new Date(2017, 3, 19, 6, 0, 0);

export function mockRevision(
  {
    index = 0,
    fromNow = false,
    referenceDate = fromNow ? Date.now() : defaultReferenceDate,
    dateInterval = 1000 * 60 * 60 * (3 + 20 / 60),
    random = randomSeed.create(`mockRevision-${index}`),
    messageWordCount = random.range(1, 20),
    withRunId = false,
  } = {},
) {
  const sha = mockSha(index);
  const timestamp = referenceDate.valueOf() - dateInterval * index;
  const url = `/u/username/project-name/browse?commitId=${sha}`;
  const message = loremIpsum({
    count: messageWordCount,
    random: () => random.random(),
  });
  const author = mockUser({ index: random.range(100) });
  const runId = withRunId ? random.range(100) : null;
  return {
    sha,
    timestamp,
    url,
    message,
    author,
    runId,
  };
}

export function mockRevisions(
  {
    numRevisions = 5,
    fromNow,
    referenceDate,
    dateInterval,
    withRunIds = false,
    random = randomSeed.create('mockRevisions'),
  } = {},
) {
  const revisions = [];
  for (let index = 0; index < numRevisions; index++) {
    const withRunId = withRunIds ? random.range(2) > 0 : undefined;
    revisions.push(
      mockRevision({
        index,
        fromNow,
        referenceDate,
        dateInterval,
        withRunId,
      }),
    );
  }
  return revisions;
}

export function mockProject(
  {
    name = 'my-project',
    username,
    owner = mockUser({ username }),
    numRevisions,
    withRunIds,
    fromNow,
    revisions = mockRevisions({ numRevisions, withRunIds, fromNow }),
  } = {},
) {
  return {
    name,
    owner,
    revisions,
  };
}

export function mockFile() {
  return {
    name: 'foo.txt',
    type: 'file',
    size: 512,
    lastModifiedDate: defaultReferenceDate.valueOf(),
  };
}

export function mockFiles({ numFiles = 10 } = {}) {
  const files = [];
  for (let index = 0; index < numFiles; index++) {
    files.push(mockFile());
  }
  return files;
}

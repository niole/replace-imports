import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getInitialBulkMoveTreeData,
} from '../src/components/util/queryUtil';
import {
  getCanonicalisedPath,
} from './testUtil';


describe('getInitialBulkMoveTreeData', () => {
  const ownerUsername = 'niole';
  const projectName = 'quick-start';
  const url = `/u/${ownerUsername}/${projectName}/files/getDirectories`;
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  it('should be able to get initial data, simple path', function(done) {
    const pathToCWD = "A/B/C";
    mock.onPost(
      url, {
        directoryPath: "/",
      }).reply(200, { message: [
        getCanonicalisedPath("A"),
      ]});

    mock.onPost(
      url, {
        directoryPath: "A",
      }).reply(200, { message: [
        getCanonicalisedPath("A/B"),
      ]});

    mock.onPost(
      url, {
        directoryPath: "A/B",
      }).reply(200, { message: [
        getCanonicalisedPath("A/B/C"),
      ]});

    mock.onPost(
      url, {
        directoryPath: "A/B/C",
      }).reply(200, { message: []});
    const selectedEntities = [];
    const expected = [
      "/",
      [[
        "A",
        [[
          "A/B",
          [[
            "A/B/C",
            [],
          ]],
        ]],
      ]],
    ];

    getInitialBulkMoveTreeData(ownerUsername, projectName, selectedEntities)
    .then(data => {
      expect(data).toEqual(expected);
      done();
    });

  })

  it('should be able to get initial data, many siblings path', function(done) {
    const pathToCWD = "A/B/C";
    mock.onPost(
      url, {
        directoryPath: "/",
      }).reply(200, { message: [
        getCanonicalisedPath("A"),
        getCanonicalisedPath("B"),
      ]});

    mock.onPost(
      url, {
        directoryPath: "A",
      }).reply(200, { message: [
        getCanonicalisedPath("A/C"),
        getCanonicalisedPath("E/F"),
      ]});

    mock.onPost(
      url, {
        directoryPath: "B",
      }).reply(200, { message: [
        getCanonicalisedPath("B/D"),
      ]});

    mock.onPost(
      url, {
        directoryPath: "B/D",
      }).reply(200, { message: []});

    mock.onPost(
      url, {
        directoryPath: "A/C",
      }).reply(200, { message: []});

    mock.onPost(
      url, {
        directoryPath: "E/F",
      }).reply(200, { message: []});

    const selectedEntities = [];
    const expected = [
      "/",
      [
        ["A", [
          ["A/C", []],
          ["E/F", []],
        ]], [
        "B", [
          ["B/D", []],
        ]]
      ]
    ];

    getInitialBulkMoveTreeData(ownerUsername, projectName, selectedEntities)
      .then(data => {
        expect(data).toEqual(expected);
        done();
      });
  });
});

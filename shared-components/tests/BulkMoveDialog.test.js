import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import WaitSpinner from '../src/components/WaitSpinner';
import BulkMoveDialog from '../src/components/BulkMoveDialog';
import BulkMoveNode from '../src/components/BulkMoveNode';
import PlusIcon from '../src/components/icons/PlusIcon';
import MinusIcon from '../src/components/icons/MinusIcon';
import {
  getCanonicalisedPath,
} from './testUtil';

const ownerUsername = 'niole';
const projectName = 'quick-start';

function getProps(otherProps = {}) {
  return {
    ownerUsername,
    projectName,
    relativePath: "/", // initial root path
    selectedEntities: [{
      isDir: false,
      path: "a.txt",
    }],
    handleClose: () => console.log('closing'),
    shouldTriggerNotifications: false,
    ...otherProps
  };
}


function mountDialog(props = {}) {
  return mount(
    <BulkMoveDialog
      {...props}
    />
  );
}

describe('<BulkMoveDialog />', () => {
  const url = `/u/${ownerUsername}/${projectName}/files/getDirectories`;
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  it('should show a loading spinner while initial requests resolve', () => {
    const wrapper = mountDialog(getProps());
    const spinner = wrapper.find(WaitSpinner);
    expect(spinner).toHaveLength(1);
  })

  it('should not show a loading spinner after intial requests have resolved', function(done) {
    expect.assertions(1);
    mock.onPost(url).reply(200, { message: [] });

    const wrapper = mountDialog(getProps());

    setTimeout(() => {
      const spinner = wrapper.find(WaitSpinner);
      expect(spinner).toHaveLength(0);
      done();
    }, 100);
  })

  it('should render a file tree with two levels', function(done) {
    expect.assertions(1);
    const pathToCWD = "A/B";

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
        getCanonicalisedPath("A/D"),
      ]});

    mock.onPost(
      url, {
        directoryPath: "A/B",
      }).reply(200, { message: [
        getCanonicalisedPath("A/B/C"),
      ]});

    mock.onPost(
      url, {
        directoryPath: "A/D",
      }).reply(200, { message: []});

    mock.onPost(
      url, {
        directoryPath: "A/B/C",
      }).reply(200, { message: []});

    const wrapper = mountDialog(getProps({ relativePath: pathToCWD }));

    setTimeout(() => {
      const moveNodes = wrapper.find(BulkMoveNode);
      expect(moveNodes).toHaveLength(4);
      done();
    }, 200);
  })

  it('should not render a toggle handle for A/B/C', function(done) {
    expect.assertions(1);
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

    const wrapper = mountDialog(getProps({ relativePath: pathToCWD }));

    setTimeout(() => {
      const moveNodes = wrapper.find(BulkMoveNode);
      const nodeWOutHandle = moveNodes.filterWhere(node => {
        const foundPlus = node.find(PlusIcon);
        const foundMinus = node.find(MinusIcon);

        return !foundPlus.length && !foundMinus.length;
      });

      expect(nodeWOutHandle).toHaveLength(1);
      done();
    }, 100);
  })

})

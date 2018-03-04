import React, {Component} from 'react';
import { mount } from 'enzyme';
import Modal from '../src/components/Modal';

function getModalInBody(bodyChildren) {
  let i = 0;
  for (; i < bodyChildren.length; i++) {
    let child = bodyChildren[i];
    if (child.getAttribute("id").indexOf("modal-mount") === 0) {
      return child;
    }
  }
}

function getAllModalMounts(bodyChildren) {
  const mounts = []
  let i = 0;
  for (; i < bodyChildren.length; i++) {
    let child = bodyChildren[i];
    if (child.getAttribute("id").indexOf("modal-mount") === 0) {
      mounts.push(child);
    }
  }

  return mounts;
}


class ModalRenderer extends Component {
  constructor() {
    super();
    this.state = { show: true };
  }

  render() {
    const {
      show,
    } = this.state;

    return (
      <div>
        { show && <Modal>content</Modal> }
        <button onClick={() => this.setState({ show: false })}>
          click
        </button>
      </div>
    )
  }
}

it('should render a modal with content', () => {
  const content = "Content";
  const cmp = (
    <Modal>
      {content}
    </Modal>
  );
  mount(cmp);
  const foundModalMount = getModalInBody(document.body.children);

  // should render mount and mount should have children
  expect(foundModalMount).toBeTruthy();
  expect(foundModalMount.children.length).toBeGreaterThan(0);
})

it('should remove modal from DOM when Modal component no longer shown', () => {
  const content = "Content";
  const cmp = <ModalRenderer />;
  const wrapper = mount(cmp);
  const foundModalMount = getModalInBody(document.body.children);

  // should find rendered modal in body
  expect(foundModalMount).toBeTruthy();
  expect(foundModalMount.children.length).toBeGreaterThan(0);

  const button = wrapper.find("button");
  button.simulate('click');

  // modal mount should still exist, but shouldn't have any children
  const secondFoundMount = getModalInBody(document.body.children);
  expect(secondFoundMount).toBeTruthy();
  expect(secondFoundMount.children).toHaveLength(0);
})

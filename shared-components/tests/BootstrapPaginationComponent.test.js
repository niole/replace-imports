import React from 'react';
import { mount } from 'enzyme';
import BootstrapPaginationComponent from '../src/components/BootstrapPaginationComponent';
import {
  Button,
} from 'react-bootstrap';

const defaultProps = {
  pageSize: 5,
  page: 0,
  pages: 1,
};

function render(props = {}) {
  return mount(<BootstrapPaginationComponent { ...defaultProps } { ...props } />);
}

function findButton(wrapper, textPattern) {
  return wrapper.findWhere(node =>
    node.is(Button) && (textPattern ? textPattern.test(node.text()) : true)
  );
}

function allButtonsWithoutPrevNext(wrapper) {
  const excludePattern = /Next|Previous/;
  return wrapper.findWhere(node => node.is(Button) && !excludePattern.test(node.text()));
}

function testForNextAndPrevious(wrapper) {
  const nextButton = findButton(wrapper, /^Next$/);
  const prevButton = findButton(wrapper, /^Previous$/);
  expect(nextButton, "should have a next button").toHaveLength(1);
  expect(prevButton, "should have a previous button").toHaveLength(1);
}

describe('<BootstrapPaginationComponent />', () => {
  it('shouldn\'t show pagination buttons if only 1 page', () => {
    const wrapper = render({ pages: 1 });
    const foundButtons = wrapper.find(Button);
    expect(foundButtons).toHaveLength(0);
  });

  it('should show 2 pagination buttons including next and previous when 2 pages', () => {
    const wrapper = render({ pages: 2 });
    const foundButtons = wrapper.find(Button);
    const oneButton = findButton(foundButtons, /^1$/);
    const twoButton = findButton(foundButtons, /^2$/);

    expect(foundButtons, "should have 4 buttons").toHaveLength(4);
    testForNextAndPrevious(foundButtons);
    expect(oneButton, "should have a button for the first page").toHaveLength(1);
    expect(twoButton, "should have a button for the second page").toHaveLength(1);
  });

  it('should show truncation button at index right after max index before truncation, many pages', () => {
    const maxIndexBeforeTruncation = 2;
    const wrapper = render({ pages: 5, maxIndexBeforeTruncation });
    const truncationButton = findButton(wrapper, /^...$/);
    const allButtons = allButtonsWithoutPrevNext(wrapper);

    expect(truncationButton, "should find one truncation button").toHaveLength(1);
    expect(
      allButtons.find(Button).at(maxIndexBeforeTruncation+1).text(),
      `truncation button should be at index ${maxIndexBeforeTruncation+1}`
    ).toBe(truncationButton.text())
  });

  it('should show button right before truncation button with viewed page\'s number when page > maxIndexBeforeTruncation and < index of last page', () => {
    const pages = 8;
    const maxIndexBeforeTruncation = 2;
    const page = 5;
    const wrapper = render({
      pages,
      maxIndexBeforeTruncation,
      page,
    });
    const allButtons = allButtonsWithoutPrevNext(wrapper);
    expect(
      allButtons.at(maxIndexBeforeTruncation).text(),
      "button before truncation button should be the current page"
    ).toBe(`${page+1}`)
  });

  it('should trigger onPageChange prop when clicking next button', () => {
    const pages = 2;
    const page = 0;
    let nextPage = null;
    const onPageChange = (p) => { nextPage = p; };
    const wrapper = render({ pages, page, onPageChange });
    const nextButton = findButton(wrapper, /Next/);

    nextButton.props().onClick();
    expect(nextPage, "next page should be 1").toBe(1);
  });

  it('shouldn\'t trigger onPageChange prop when clicking next and at max page', () => {
    const pages = 2;
    const page = 1;
    let nextPage = null;
    const onPageChange = (p) => { nextPage = p; };
    const wrapper = render({ pages, page, onPageChange });
    const nextButton = findButton(wrapper, /Next/);

    nextButton.props().onClick();
    expect(nextPage, "next page should be null").toBe(null);
  });

  it('should trigger onPageChange prop when clicking previous button', () => {
    const pages = 2;
    const page = 1;
    let nextPage = null;
    const onPageChange = (p) => { nextPage = p; };
    const wrapper = render({ pages, page, onPageChange });
    const nextButton = findButton(wrapper, /Previous/);

    nextButton.props().onClick();
    expect(nextPage, "next page should be 0").toBe(0);
  });

  it('shouldn\'t trigger onPageChange prop when clicking previous button and at min page', () => {
    const pages = 2;
    const page = 0;
    let nextPage = null;
    const onPageChange = (p) => { nextPage = p; };
    const wrapper = render({ pages, page, onPageChange });
    const nextButton = findButton(wrapper, /Previous/);

    nextButton.props().onClick();
    expect(nextPage, "next page should be null").toBe(null);
  });

  it('should trigger onPageSizeChange prop when page size selection changes, should be transformed to number', () => {
    const pages = 2;
    const page = 0;
    const showPageSizeOptions = true;

    let nextPageSize = null;
    const onPageSizeChange = (p) => { nextPageSize = p; };
    const wrapper = render({ pages, page, onPageSizeChange, showPageSizeOptions, });

    wrapper.find('select').props().onChange({ target: { value : "10" }});

    expect(nextPageSize, "next page size should be 10").toBe(10);
  });

});





import styled from 'styled-components';

const revisionListMaxHeight = 350;
const revisionListItemHeight = 66;

const SelectMenu = styled.div`
  position: absolute;
  overflow: hidden;
  width: 450px;
  margin: 2px 0 0;
  font-size: 14px;
  text-align: left;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
`;

SelectMenu.RevisionList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  max-height: ${revisionListMaxHeight}px;
`;

SelectMenu.RevisionList.maxHeight = revisionListMaxHeight;

SelectMenu.RevisionListItem = styled.li`
  height: ${revisionListItemHeight}px;
  box-sizing: border-box;

  &.active a,
  & a:hover,
  & a:focus,
  & a:active {
    text-decoration: none;
    color: white;
    background-color: #4c89d6;

    .unique-identifiers {
      color: white;
    }
  }

  &.active a strong,
  & a:hover strong,
  & a:focus strong,
  & a:active strong {
    color: white;
  }

  & + & {
    border-top: 1px solid #eee;
  }
`;

SelectMenu.RevisionListItem.height = revisionListItemHeight;

SelectMenu.RevisionListItemLink = styled.a`
  display: block;
  padding: 15px 20px;
  font-size: 13px;
  color: #999;
  position: relative;
`;

export default SelectMenu;

import React, { Component } from 'react';
import { func, bool, string, arrayOf } from 'prop-types';
import styled from 'styled-components';
import {
    MinimalDropdown,
    GitCommit,
} from '@domino/shared-components';
import RevisionSelectMenuList from './RevisionSelectMenuList';
import { revisionShape } from '../propTypes';
import formatDate from '../utils/formatDate';

const FilterInput = styled.input`
    height: 100%;
    width: 100%;
    padding-left: 8px;
    border-radius: 3px;
    border: none;

    &:focus {
        outline: none;
        border: none;
    }

    &:active {
        outline: none;
        border: none;
    }
`;

const ClosedToggleLabel = styled.div`
    padding: 0px 8px;
    display: inline-flex;
    font-weight: bold;
    width: 100%;

    svg {
        flex-shrink: 0;
        margin-right: 5px;
    }

    span, a {
        text-align: left;
        display: inline;
        margin-left: 5px;
    }
`;

const CommitDateSummary = styled.div`
    margin-left: auto;
`;

const CommitMessage = styled.span`
    color: #45474a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0px;
`;

class RevisionControl extends Component {
  static propTypes = {
    asMessage: bool,
    runNumber: string,
    runLink: string,
    revision: revisionShape,
    revisions: arrayOf(revisionShape),
    onChange: func,
    navigateOnChange: bool,
    id: string,
  };

  static defaultProps = {
    onChange: () => {},
    asMessage: false,
    id: 'revision-control',
    bsSize: 'small',
    navigateOnChange: false,
  };

  state = {
    open: false,
    filterText: "",
  };

  handleCloseDropdown = () => {
    this.setState({ open: false });
  }

  handleDropdownToggleClick = (event) => {
   if (!this.props.asMessage && (!event || event.target.tagName !== "INPUT")) {
     this.setState(previousState => ({
         open: !previousState.open,
     }));
   }
  };

  handleDropdownToggle = (isOpen, event) => {
   if (!this.props.asMessage && event && event.target.tagName !== "INPUT" && !event.nativeEvent) {
    // only allow execution if haven't clicked on filter input
    // or have clicked outside of drop down (have clicked in non-React DOM)
    // can't do Overlay anymore, as want to use react bootstrap dropdown for format of toggle button
     this.setState(previousState => ({
         open: isOpen,
     }));
   } else if (event && event.nativeEvent) {
    event.nativeEvent.stopImmediatePropagation();
   }
  }

  onFilterTextChange = (event) => {
    const filterText = event.target.value;
    this.setState({ filterText });
  }

  getRevisionMessageLabel() {
    const {
        revision,
        runNumber,
        runLink,
    } = this.props;
    const commitMessage = revision.message;
    const selectedRevisionsCommitter = revision.author.username;
    const shortSha = revision.sha.substr(0, 7);
    const formattedDate = formatDate(revision.timestamp);
    return (
        <ClosedToggleLabel>
            <GitCommit
                width={11}
                height={15}
            />
            {selectedRevisionsCommitter}
            <CommitMessage title={commitMessage}>
                {`"${commitMessage}"`}
            </CommitMessage>
            {runNumber &&
                <a
                    href={runLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {runNumber}
                </a>}
            <CommitDateSummary>
                <span title={revision.sha}>{shortSha}</span>
                {` on ${formattedDate}`}
            </CommitDateSummary>
        </ClosedToggleLabel>
    );
  }

  handleSelect = (selection) => {
    const {
        onChange,
    } = this.props;

    onChange(selection);

    this.setState({ open: false });
  }

  render() {
    const {
      id,
      revisions,
      navigateOnChange,
      asMessage,
      runNumber,
      runLink,
      ...otherProps
    } = this.props;
    const {
        open,
        filterText,
    } = this.state;

    return (
        <MinimalDropdown
          open={open}
          showToggle={!asMessage}
          onToggle={this.handleDropdownToggle}
          onClick={this.handleDropdownToggleClick}
          label={
            open ?
                <FilterInput
                    value={filterText}
                    onChange={this.onFilterTextChange}
                    autoFocus
                /> :
                this.getRevisionMessageLabel()
          }
          id={id}
          {...otherProps}
        >
          <RevisionSelectMenuList
              revisions={revisions}
              onSelect={this.handleSelect}
              navigateOnSelect={navigateOnChange}
              onClose={this.handleCloseDropdown}
              filterText={filterText}
          />
        </MinimalDropdown>
    );
  }
}

export default RevisionControl;

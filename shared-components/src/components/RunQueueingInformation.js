import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import { Well, Glyphicon } from 'react-bootstrap';

export function RunQueueingInformation({
  explanation,
  helpText,
  expectedWait,
  ...otherProps
}) {
  return (
    <RunQueueingInformationContainer>
      <Glyphicon glyph="info-sign" />
      <div>
        <TopLine>
          <span>
            <strong>Queued:</strong> {explanation}
          </span>
          <strong>
            Expected wait: {expectedWait}
          </strong>
        </TopLine>
        {helpText &&
          <div>
          {/*
            The helpText prop may contain HTML, so it is rendered using innerHTML. This is
            considered safe because this prop should only contain strings defined in
            QueuedRunHistoryTranslator.scala. This prop *MUST NOT* contain user-provided text.
          */}
          <small dangerouslySetInnerHTML={{ __html: helpText }} />
          </div>}
      </div>
    </RunQueueingInformationContainer>
  );
}

RunQueueingInformation.propTypes = {
  explanation: string.isRequired,
  helpText: string,
  expectedWait: string,
};

export const RunQueueingInformationContainer = styled(Well)`
  border: 1px solid #E8C100;
  border-radius: 4px;
  background: #FFFBF2;
  color: #736000;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > *:last-child {
    flex-grow: 1;
    margin-left: 5px;
    & > * + * {
      margin-top: 5px;
    }
  }
`;

export const TopLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > *:last-child {
    flex-shrink: 0;
    margin-left: 15px;
  }
`;

export default RunQueueingInformation;

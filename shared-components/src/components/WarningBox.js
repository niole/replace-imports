import styled from 'styled-components';
import {
  BaseInfoBoxStyle,
  InfoBox,
} from './InfoBox';

const WarningBox = styled(InfoBox)`
  ${BaseInfoBoxStyle}
  color: #736000;
  background-color: #FFFBF2;
  border: 1px solid #E8C300;

  svg {
    fill: #E8C300;
  }
`;

export default WarningBox;

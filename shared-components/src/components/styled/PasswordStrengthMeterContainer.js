import styled from 'styled-components';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

export default styled(HelpBlock)`
  & .progress {
    margin-bottom: 3px;
  }

  & .progress-bar-danger {
    background-color: red;
  }
`;

import styled from 'styled-components';
import DominoLogo from './DominoLogo';

const SpinningDominoLogo = styled(DominoLogo)`
  transform-origin: center center;
  animation: spin 1s infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default SpinningDominoLogo;

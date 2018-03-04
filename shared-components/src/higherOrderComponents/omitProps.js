import { mapProps } from 'recompose';
import { omit } from 'lodash';

/**
 * A higher-order-component which omits one or more props being passed to the
 * target component
 */
export default (...propNames) => mapProps(props => omit(props, propNames));

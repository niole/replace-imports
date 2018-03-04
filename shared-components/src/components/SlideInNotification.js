import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
    func,
    string,
    number,
    bool,
    element,
    oneOf,
    oneOfType,
    shape,
} from 'prop-types';
import {
    notificationBackground,
    primaryButtonBackground,
    rejectRedColor,
    secondaryWarningRed,
} from './styled/colors';
import MinimalWarning from './icons/MinimalWarning';
import MinimalSuccess from './icons/MinimalSuccess';

const SUCCESS = 'success';
const WARNING = 'warning';
const GENERAL = 'general';
const DEFAULT_TIMEOUT = 5000;
const UNICODE_DISMISS = '\u2715';
const headerZIndex = 2100;

const Notification = styled.tbody`
  word-break: break-all;
  z-index: ${headerZIndex};
  right: ${props => props.show ? 4 : -375}px;
  position: fixed;
  background: ${props => {
    if (props.type === GENERAL) {
        return notificationBackground;
    }

    if (props.type === WARNING) {
        return rejectRedColor;
    }

    if (props.type === SUCCESS) {
        return primaryButtonBackground;
    }

    return notificationBackground;
  }};
  color: white;
  margin-top: 4px;
  border-radius: 3px;
  transition: right .5s;

  a {
    color: white;
    text-decoration: underline;
  }

  .primary {
    font-weight: bold;
  }
`;

const Icon = styled.td`
    float: left;
    margin: 5px 0px 0px 5px;
`;

const Content = styled.td`
    cursor: ${props => props.isClickable ? 'pointer' : 'auto'};
    width: 300px;
    display: inline-block;
    padding: 15px;
`;

const CancelButton = styled.td`
    cursor: ${props => props.isClickable ? 'pointer' : 'auto'};
    border-radius: 3px;
    padding: 0px 15px;
    background: ${props => {
        if (props.messageType === "warning") {
            return secondaryWarningRed;
        }
        if (props.messageType === "success") {
            return primaryButtonBackground;
        }
        return "transparent";
    }};
`;

const propTypes = {
    message: shape({
        primary: shape({
            content: string.isRequired,
            link: string,
            handler: func,
        }),
        secondary: shape({
            content: string.isRequired,
            link: string,
            handler: func,
        }),
    }),
    messageType: oneOf([SUCCESS, WARNING, GENERAL]),
    isDismissable: bool,
    className: string,
    timeout: number,
    shouldDisappear: bool,
    show: bool,
    icon: oneOfType([element, string]),
    handleClick: func,
    isClickable: bool,
};

const defaultProps = {
    show: false,
    messageType: GENERAL,
    timeout: DEFAULT_TIMEOUT,
    shouldDisappear: true,
    isDismissable: true,
    className: '',
    icon: '',
    handleClick: () => {},
    isClickable: false,
};


/**
 * A slide in notification which is controlled by an event called "slideintoggle".
 */
class SlideInNotification extends PureComponent {
    constructor() {
        super();
        this.state = {
            message: {
                primary: {
                    content: "",
                },
            },
            show: false,
            messageType: GENERAL,
            timeout: DEFAULT_TIMEOUT,
            shouldDisappear: true,
            isDismissable: true,
            className: '',
            icon: '',
            isClickable: false,
        };

        this.timerId = null;
        this.onDismiss = this.onDismiss.bind(this);
        this.onTimeoutEnd = this.onTimeoutEnd.bind(this);
        this.hide = this.hide.bind(this);
        this.triggerOpen = this.triggerOpen.bind(this);
    }

    componentDidMount() {
        window.addEventListener("slideintoggle", this.triggerOpen);
    }

    triggerOpen(event) {
        const {
            timeout = this.props.timeout,
            shouldDisappear,
        } = event.detail;

        this.show(event.detail);
        if (this.shouldSetTimeout(shouldDisappear, true, this.timerId)) {
            this.setTimeout(timeout);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("slideintoggle", this.triggerOpen);
    }

    show(details) {
        this.setState({
            show: true,
            ...details
        });
    }

    hide() {
        this.setState({ show: false });
    }

    onTimeoutEnd() {
        this.hide();
    }

    setTimeout(timeout) {
        this.timerId = setTimeout(() => {
            this.resetTimerId();
            this.onTimeoutEnd();
        }, timeout);
    }

    shouldSetTimeout(shouldDisappear, show, timerId) {
        return shouldDisappear && show && timerId === null;
    }

    resetTimerId() {
        this.timerId = null;
    }

    onDismiss() {
        const {
            isDismissable,
        } = this.state;

        if (isDismissable) {
            clearTimeout(this.timerId);
            this.resetTimerId();
            this.hide();
        }
    }

    getIcon() {
        const {
            icon,
        } = this.props;
        const {
            messageType,
        } = this.state;

        if (icon) {
            return icon;
        }
        switch (messageType) {
        case SUCCESS:
            return (
                <MinimalSuccess />
            );

        case WARNING:
            return (
                <MinimalWarning />
            );
        default:
            return null;
        }
    }

    renderMessage({ content, link, handler }, className) {
        if (link) {
            if (handler) {
                return (
                    <a className={className} onClick={handler}>
                        {content}
                    </a>
                );
            }
            return (
                <a className={className} href={link}>
                    {content}
                </a>
            );
        }

        if (handler) {
            return (
                <div className={className} onClick={handler}>
                    {content}
                </div>
            );
        }
        return (
            <div className={className}>
                {content}
            </div>
        );
    }

    renderBody() {
        const {
            handleClick,
        } = this.props;
        const {
            message,
            isClickable,
            messageType,
        } = this.state;

        return [
            <Icon key="a" className="notification-info icon" onClick={this.onDismiss}>
                { this.getIcon() }
            </Icon>,
            <Content
                key="c"
                isClickable={isClickable}
                onClick={handleClick}
            >
                {this.renderMessage(message.primary, "primary")}
                { message.secondary &&
                    this.renderMessage(message.secondary, "secondary") }
            </Content>,
            <CancelButton
                key="b"
                onClick={this.onDismiss}
                messageType={messageType}
                isClickable={isClickable}
            >
                { UNICODE_DISMISS }
            </CancelButton>,
        ];
    }

    render() {
        const {
            messageType,
            show,
        } = this.state;

        return (
            <Notification type={messageType} show={show}>
                <tr>
                    {this.renderBody()}
                </tr>
            </Notification>
        );
    }
}

SlideInNotification.propTypes = propTypes;
SlideInNotification.defaultProps = defaultProps;

export default SlideInNotification;

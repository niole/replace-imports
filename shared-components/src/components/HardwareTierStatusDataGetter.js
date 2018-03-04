import React, {PureComponent} from 'react';
import {string} from 'prop-types';
import axios from'axios';
import {
  forceReload,
  getErrorMessage,
} from './util/sharedComponentUtil';
import {
    changeHardwareTier,
} from './util/queryUtil';

class HardwareTierStatusDataGetter extends PureComponent {
  state = {
    selectedTier: "",
    hardwareTierDetails: [],
  }

  createSlideinEvent(props) {
    return new CustomEvent("slideintoggle", {
      detail: props,
    });
  }

  showSlideinNotification(props) {
    const opener = this.createSlideinEvent({
      show: true,
      ...props,
    });
    window.dispatchEvent(opener);
  }

  componentDidMount() {
    if (document.readyState !== "complete" && document.readyState !== "interactive") {
      // depending on where this component mounts,
      // the rest of the DOM might not be ready, meaning the slide in notification
      // might not exist
      document.addEventListener("DOMContentLoaded", () => {
        this.getHardwareTierDetails();
      });
    } else {
      this.getHardwareTierDetails();
    }
  }

  handleUpdateGloballySelectedTier = (event) => {
    const {
      locationUrl,
      ownerUsername,
      projectName,
    } = this.props;
    const selectedTier = event.target.value;

    changeHardwareTier(
      ownerUsername,
      projectName,
      selectedTier,
      response => {
        this.showSlideinNotification({
          message: {
              primary: {
                  content: response.message || response,
              },
          },
          messageType: 'success',
          isDismissable: true,
          shouldDisappear: true,
          show: true,
          isClickable: true,
        });
        this.setState({ selectedTier });
        if (locationUrl) {
          forceReload(locationUrl);
        }
      },
      error => {
        this.showSlideinNotification({
          message: {
              primary: {
                  content: getErrorMessage(error),
              },
          },
          messageType: 'warning',
          isDismissable: true,
          shouldDisappear: false,
          show: true,
          isClickable: true,
        });
      },
    );
  }

  getHardwareTierDetails() {
    const {
      hardwareTierDetailsUrl,
      selectedHardwareTier,
    } = this.props;

    axios(hardwareTierDetailsUrl)
      .then(({ data }) => {
        const {
          allHardwareTierDetails,
          selectedHardwareTierId,
        } = data;
        this.setState({
          selectedTier: selectedHardwareTier !== undefined ?
            selectedHardwareTier :
            selectedHardwareTierId,
          hardwareTierDetails: allHardwareTierDetails,
        });
      })
      .catch(error => {
        this.showSlideinNotification({
          message: {
              primary: {
                  content: getErrorMessage(error),
              },
          },
          messageType: 'warning',
          isDismissable: true,
          shouldDisappear: false,
          show: true,
          isClickable: true,
        });
      });
  }

  render() {
    return <div/>;
  }
}

export const HardwareTierStatusDataGetterProps = {
  locationUrl: string,
  hardwareTierDetailsUrl: string.isRequired,
};

HardwareTierStatusDataGetter.propTypes = HardwareTierStatusDataGetterProps;

export default HardwareTierStatusDataGetter;

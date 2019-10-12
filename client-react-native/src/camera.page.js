import React from "react";
import { View, Text } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

import styles from "./styles";
import Toolbar from "./toolbar.component";
import Gallery from "./gallery.component";

export default class CameraPage extends React.Component {
  camera = React.createRef();

  state = {
    captures: [],
    capturing: null,
    hasCameraPermission: null,
    cameraType: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off
  };

  setFlashMode = flashMode => this.setState({ flashMode });
  setCameraType = cameraType => this.setState({ cameraType });
  handleCaptureIn = () => this.setState({ capturing: true });

  handleShortCapture = async () => {
    const photoData = await this.camera.current.takePictureAsync();
    this.setState(
      {
        capturing: false,
        captures: [photoData, ...this.state.captures]
      },
      () => {
        // console.log(this.props);
        this.props.navigation.navigate("ProcessedImage", {
          captures: this.state.captures
        });
      }
    );
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const hasCameraPermission = camera.status === "granted";
    this.setState({ hasCameraPermission });
  }

  render() {
    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
      captures
    } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <React.Fragment>
        <View>
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={styles.preview}
            ref={this.camera}
          />
        </View>

        {/* {captures.length > 0 && <Gallery captures={captures} />} */}

        <Toolbar
          capturing={capturing}
          flashMode={flashMode}
          cameraType={cameraType}
          setFlashMode={this.setFlashMode}
          setCameraType={this.setCameraType}
          onCaptureIn={this.handleCaptureIn}
          onShortCapture={this.handleShortCapture}
        />
      </React.Fragment>
    );
  }
}

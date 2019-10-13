import React from "react";
import { View, Text, Image, Button } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";

import styles from "./styles";
import { create } from "uuid-js";

class ProcessedImagePage extends React.Component {
  static navigationOptions = {
    title: "Confirm Image"
  };

  state = {
    image: null,
    response: null
  };

  navigationHandler = response => {
    this.setState({ image: null, response: response }, () => {
      this.props.navigation.navigate("Items", { items: this.state.response });
    });
  };

  uploadImageHandler = capture => {
    let localUri = capture.uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("file", {
      uri: localUri,
      name: filename,
      type,
      resizeNrotate: true
    });

    fetch("http://35.0.46.81:5000/upload_image", {
      method: "POST",
      body: formData,
      header: {
        "content-type": "multipart/form-data"
      }
    })
      .then(response => response.json())
      .then(response => {
        this.navigationHandler(response);
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };

  render() {
    const captures = this.props.navigation.getParam("captures");
    // this.setState({ image: captures[0] });
    var imageUri = captures[0].uri;
    // console.log(oneImage);

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{ uri: imageUri }}
          style={{ width: "80%", height: 500, resizeMode: "contain" }}
        />
        <Button
          title="Confirm"
          onPress={() => {
            this.uploadImageHandler(captures[0]);
          }}
        />
      </View>
    );
  }
}

export default ProcessedImagePage;

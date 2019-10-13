import React from "react";
import { View, Text, Image, Button } from "react-native";

import styles from "./styles";
import { create } from "uuid-js";

const createFormData = (photo, body) => {
  const data = new FormData();

  data.append("file", {
    // name: photo.fileName,
    // type: photo.type,
    // uri:
    //   Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    uri: photo.uri.replace("file://", "")
    // uri: photo.uri
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  console.log(data);

  return data;
};

class ProcessedImagePage extends React.Component {
  static navigationOptions = {
    title: "Confirm Image"
  };

  state = {
    image: null
  };

  // constructor(props) {
  //   super(props);
  // }

  // componentDidMount() {
  //   const { navigation } = this.props;
  //   this.captures = navigation.getParam("captures");
  //   const captures = this.props.navigation.getParam("captures");
  //   this.setState({ image: captures[0] });
  //   console.log(this.state);
  // }

  uploadImageHandler = capture => {
    // console.log("HERE");
    // console.log(capture.uri);

    // console.log(
    //   JSON.stringify({
    //     file: capture.uri
    //   })
    // );
    let localUri = capture.uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("file", { uri: localUri, name: filename, type });

    fetch("http://35.0.46.81:5000/upload_image", {
      method: "POST",
      body: formData,
      header: {
        "content-type": "multipart/form-data"
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log("upload success", response);
        alert("Upload success!");
        this.setState({ image: null });
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

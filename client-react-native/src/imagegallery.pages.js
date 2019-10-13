import * as React from "react";
import { Button, Image, View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default class ImagePickerExample extends React.Component {
  static navigationOptions = {
    title: "Tong-tong"
  };

  state = {
    image: null
  };

  uploadImageHandler = capture => {
    console.log(capture);
    let localUri = capture;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("file", {
      uri: localUri,
      name: filename,
      type,
      resizeNrotate: false
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
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome!</Text>  
        <Text style={styles.text}>Ready with your receipt?</Text>

        <View style={styles.buttons}>
          <FontAwesome.Button 
            name="camera"
            size={30}
            onPress={() => {
              this.props.navigation.navigate("Camera", {});
            }}
          >
            Take a picture
          </FontAwesome.Button>

          <FontAwesome.Button 
            name="plus"  
            size={30}
            onPress={this._pickImage}
          >
            Look in Gallery
          </FontAwesome.Button>
        </View>
        

        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: "80%", height: 200 }}
          />
        )}
        
        <Button
          title="Confirm"
          onPress={() => {
            this.uploadImageHandler(this.state.image);
          }}
        />
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    //alignItems: "column", 
    // justifyContent: "center",
    flexDirection: 'column'
  },
  buttons : {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-around',
    padding: 15,
  },
  items: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 30,
    alignSelf: "center"
  }
});

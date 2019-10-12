import React from "react";
import { View, Text, Image, Button } from "react-native";

import styles from "./styles";

class ProcessedImagePage extends React.Component {
  render() {
    const captures = this.props.navigation.getParam("captures");
    var oneImage = captures[0].uri;
    // console.log(captures);
    console.log(oneImage);

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{ uri: oneImage }}
          style={{ width: "80%", height: 500, resizeMode: "contain" }}
        />
        <Button title="Confirm" />
      </View>

      // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      //   {captures.map(({ uri }) => (
      //     <View style={{ flex: 1 }} key={uri}>
      //       <Image source={{ uri }} style={styles.galleryImage} />
      //     </View>
      //   ))}
      // </View>
    );
  }
}

export default ProcessedImagePage;

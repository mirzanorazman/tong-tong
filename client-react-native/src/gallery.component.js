import React from "react";
import { View, Image, ScrollView } from "react-native";

import styles from "./styles";

export default ({ captures = [] }) => (
  //   <View>
  //     {captures.map(({ uri }) => (
  //       <View style={styles.galleryImageContainer} key={uri}>
  //         <Image source={{ uri }} style={styles.galleryImage} />
  //       </View>
  //     ))}
  //   </View>

  <ScrollView
    horizontal={true}
    style={[styles.bottomToolbar, styles.galleryContainer]}
  >
    {captures.map(({ uri }) => (
      <View style={styles.galleryImageContainer} key={uri}>
        <Image source={{ uri }} style={styles.galleryImage} />
      </View>
    ))}
  </ScrollView>
);

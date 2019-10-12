import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import CameraPage from "./src/camera.page";
import ProcessedImagePage from "./src/processed.page";

const MainNavigator = createStackNavigator(
  {
    Camera: { screen: CameraPage },
    ProcessedImage: { screen: ProcessedImagePage }
  },
  {
    initialRouteName: "Camera"
  }
);

const App = createAppContainer(MainNavigator);

export default App;

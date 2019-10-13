import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import CameraPage from "./src/camera.page";
import ProcessedImagePage from "./src/processed.page";
import ItemsPage from "./src/items.page";
import SummaryPage from "./src/summary.page";

const MainNavigator = createStackNavigator(
  {
    Camera: { screen: CameraPage },
    ProcessedImage: { screen: ProcessedImagePage },
    Items: { screen: ItemsPage },
    Summary: {screen: SummaryPage }
  },
  {
    initialRouteName: "Camera"
  }
);

const App = createAppContainer(MainNavigator);

export default App;

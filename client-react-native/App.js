import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import CameraPage from "./src/camera.page";
import ImageGalleryPage from "./src/imagegallery.pages";
import ProcessedImagePage from "./src/processed.page";
import ItemsPage from "./src/items.page";
import SummaryPage from "./src/summary.page";

const MainNavigator = createStackNavigator(
  {
    Camera: { screen: CameraPage },
    ImageGallery: { screen: ImageGalleryPage },
    ProcessedImage: { screen: ProcessedImagePage },
    Items: { screen: ItemsPage },
    Summary: { screen: SummaryPage }
  },
  {
    initialRouteName: "ImageGallery"
  }
);

const App = createAppContainer(MainNavigator);

export default App;

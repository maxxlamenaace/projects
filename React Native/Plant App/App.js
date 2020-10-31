import React, { useState } from "react";

import { AppLoading } from "expo";
import { Asset } from "expo-asset";

import Navigation from "./navigation";
import Block from "./components/Block";

// import all used images
const images = [
  require("./assets/icons/plants.png"),
  require("./assets/icons/seeds.png"),
  require("./assets/icons/fertilizers.png"),
  require("./assets/icons/sprayers.png"),
  require("./assets/icons/flowers.png"),
  require("./assets/icons/pots.png"),
  require("./assets/images/plants_1.png"),
  require("./assets/images/plants_2.png"),
  require("./assets/images/plants_3.png"),
  require("./assets/images/explore_1.png"),
  require("./assets/images/explore_2.png"),
  require("./assets/images/explore_3.png"),
  require("./assets/images/explore_4.png"),
  require("./assets/images/explore_5.png"),
  require("./assets/images/explore_6.png"),
  require("./assets/images/avatar.png"),
];

export default function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const handleResourcesAsync = async () => {
    // Caching all the image for better performances on the app...
    const cacheImages = images.map((img) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };

  while (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={handleResourcesAsync}
        onError={(error) => console.warn(error)}
        onFinish={setIsLoadingComplete(true)}
      />
    );
  }

  return (
    <Block>
      <Navigation />
    </Block>
  );
}

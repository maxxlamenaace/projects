import React, { useState } from "react";
import {
  Animated,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "react-native-vector-icons";
import { Block, Text, Input, Button } from "../components";
import { theme, mocks } from "../constants";

const Explore = (props) => {
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(new Animated.Value(0.6));
  const images = mocks.explore;
  const { width, height } = Dimensions.get("window");

  const renderImage = (image, index) => {
    const sizes = Image.resolveAssetSource(image);
    const fullWidth = width - theme.sizes.base * 2;
    const resize = (sizes.width * 100) / fullWidth;
    const imgWidth = resize > 75 ? fullWidth : sizes.width * 1.1;

    return (
      <TouchableOpacity
        key={`img-${index}`}
        onPress={() => props.navigation.navigate("Product")}
      >
        <Image
          source={image}
          style={[styles.image, { minWidth: imgWidth, maxWidth: imgWidth }]}
        />
      </TouchableOpacity>
    );
  };

  const handleSearchFocus = (status) => {
    Animated.timing(searchFocus, {
      toValue: status ? 0.8 : 0.6,
      duration: 300,
    }).start();
  };

  const renderSearch = () => {
    const isEditing = searchFocus && search;
    return (
      <Block animated middle flex={searchFocus} style={styles.search}>
        <Input
          placeholder="Search"
          placeholderTextColor={theme.colors.gray2}
          style={styles.searchInput}
          onFocus={() => handleSearchFocus(true)}
          onBlur={() => handleSearchFocus(false)}
          onChangeText={(text) => setSearch(text)}
          value={search}
          onRightPress={() => (isEditing ? setSearch("") : null)}
          rightStyle={styles.searchRight}
          rightLabel={
            <FontAwesome
              name={isEditing ? "close" : "search"}
              size={theme.sizes.base / 1.6}
              color={theme.colors.gray2}
              style={styles.searchIcon}
            />
          }
        />
      </Block>
    );
  };

  const renderExplore = () => {
    return (
      <Block style={{ marginBottom: height / 3 }}>
        <TouchableOpacity
          style={[styles.image, styles.mainImage]}
          onPress={() => props.navigation.navigate("Product")}
        >
          <Image source={images[0]} style={[styles.image, styles.mainImage]} />
        </TouchableOpacity>
        <Block row space="between" wrap>
          {images.slice(1).map((image, index) => renderImage(image, index))}
        </Block>
      </Block>
    );
  };

  const renderFooter = () => {
    return (
      <LinearGradient
        locations={[0.5, 1]}
        style={styles.footer}
        colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.6)"]}
      >
        <Button gradient style={{ width: width / 2.678 }}>
          <Text bold white center>
            Filter
          </Text>
        </Button>
      </LinearGradient>
    );
  };

  return (
    <Block color={"white"}>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text h1 bold>
          Explore
        </Text>
        {renderSearch()}
      </Block>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.explore}>
        {renderExplore()}
      </ScrollView>

      {renderFooter()}
    </Block>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2,
  },
  search: {
    height: theme.sizes.base * 2,
    width: Dimensions.get("window").width - theme.sizes.base * 2,
  },
  searchInput: {
    fontSize: theme.sizes.caption,
    height: theme.sizes.base * 2,
    backgroundColor: "rgba(142, 142, 147, 0.06)",
    borderColor: "rgba(142, 142, 147, 0.06)",
    paddingLeft: theme.sizes.base / 1.333,
    paddingRight: theme.sizes.base * 1.5,
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: "transparent",
  },
  searchIcon: {
    position: "absolute",
    right: theme.sizes.base / 1.333,
    top: theme.sizes.base / 1.6,
  },
  explore: {
    marginHorizontal: theme.sizes.padding * 1.25,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    overflow: "visible",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height * 0.1,
    width: Dimensions.get("window").width,
    paddingBottom: theme.sizes.base * 3,
  },
  image: {
    minHeight: 100,
    maxHeight: 130,
    maxWidth: Dimensions.get("window").width - theme.sizes.padding * 2.5,
    marginBottom: theme.sizes.base,
    borderRadius: 4,
  },
  mainImage: {
    minWidth: Dimensions.get("window").width - theme.sizes.padding * 2.5,
    minHeight: Dimensions.get("window").width - theme.sizes.padding * 2.5,
  },
});

export default Explore;

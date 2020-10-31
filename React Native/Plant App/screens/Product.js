import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Entypo } from "react-native-vector-icons";
import { Block, Text, Input, Button, Divider } from "../components";
import { theme, mocks } from "../constants";

const { width, height } = Dimensions.get("window");

const Product = (props) => {
  const renderGallery = () => {
    return (
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled
        snapToAlignment="center"
        data={props.product.gallery}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <Image
            source={item}
            resizeMode="contain"
            style={{ width, height: height / 2.8 }}
          />
        )}
      />
    );
  };

  return (
    <Block color={"white"}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderGallery()}
        <Block style={styles.product}>
          <Text h2 bold>
            {props.product.name}
          </Text>
          <Block row flex={false} margin={[theme.sizes.base, 0]}>
            {props.product.tags.map((tag) => (
              <Text key={`tag-${tag}`} caption gray style={styles.tag}>
                {tag}
              </Text>
            ))}
          </Block>
          <Text gray light height={22}>
            {props.product.description}
          </Text>
          <Divider margin={[theme.sizes.padding * 0.9, 0]} />
          <Block>
            <Text semibold>Gallery</Text>
            <Block row margin={[theme.sizes.padding * 0.9, 0]}>
              {props.product.gallery.slice(1, 3).map((image, index) => (
                <Image
                  source={image}
                  style={styles.image}
                  key={`gallery-${index}`}
                />
              ))}
              <Block
                flex={false}
                card
                center
                middle
                color="rgba( 197,204,214,0.20)"
                style={styles.more}
              >
                <Text gray>+{props.product.gallery.slice(3).length}</Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

Product.navigationOptions = (navigationData) => {
  return {
    headerRight: () => (
      <Button onPress={() => {}}>
        <Entypo name="dots-three-horizontal" color={theme.colors.gray} />
      </Button>
    ),
  };
};

Product.defaultProps = {
  product: mocks.products[0],
};

const styles = StyleSheet.create({
  product: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.padding,
  },
  tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625,
  },
  image: {
    width: width / 3.26,
    height: width / 3.26,
    marginRight: theme.sizes.base,
  },
  more: {
    width: 55,
    height: 55,
  },
});

export default Product;

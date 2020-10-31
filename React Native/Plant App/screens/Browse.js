import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Block, Text, Card, Badge } from "../components";
import { theme, mocks } from "../constants";

const Browse = (props) => {
  const tabs = ["Products", "Inspirations", "Shop"];
  const profile = mocks.profile;
  const allCategories = mocks.categories;
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(allCategories);
  }, []);

  const renderTabs = (tab) => {
    const isActive = activeTab === tab;
    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleTab = (tab) => {
    const filtered = allCategories.filter((category) =>
      category.tags.includes(tab.toLowerCase())
    );
    setActiveTab(tab);
    setCategories(filtered);
  };

  return (
    <Block color={"white"}>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text h1 bold>
          Browse
        </Text>
        <Button onPress={() => props.navigation.navigate("Settings")}>
          <Image source={profile.avatar} style={styles.avatar} />
        </Button>
      </Block>
      <Block flex={false} row style={styles.tabs}>
        {tabs.map((tab) => renderTabs(tab))}
      </Block>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: theme.sizes.base * 2 }}
      >
        <Block flex={false} row space="between" style={styles.categories}>
          {categories.map((category) => (
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Explore", { category })}
              key={category.id}
            >
              <Card center middle shadow style={styles.category}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41, 216, 143, 0.20)"
                >
                  <Image source={category.image} />
                </Badge>
                <Text>{category.name}</Text>
                <Text gray caption>
                  {category.count} products
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </Block>
      </ScrollView>
    </Block>
  );
};

Browse.defaultProps = {
  categories: mocks.categories,
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: theme.sizes.base * 2,
    marginVertical: theme.sizes.base,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  active: {
    borderBottomWidth: 3,
    borderBottomColor: theme.colors.secondary,
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  category: {
    width: Dimensions.get("screen").width / 2.5,
    height: Dimensions.get("screen").height / 6,
  },
});

export default Browse;

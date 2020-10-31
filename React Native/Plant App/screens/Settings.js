import React, { useState, useEffect } from "react";
import { StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Slider from "react-native-slider";
import { Divider, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import { profile } from "../constants/mocks";

const Settings = (props) => {
  const [budget, setBudget] = useState(500);
  const [monthly, setMonthly] = useState(2500);
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [editing, setEditing] = useState();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile(mocks.profile);
  });

  const handleEdit = (name, text) => {
    profile[name] = text;
    setProfile(profile);
  };

  const toggleEdit = (name) => {
    setEditing(!editing ? name : null);
  };

  const renderEdit = (name) => {
    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile[name]}
          color={theme.colors.secondary}
          onChangeText={(text) => handleEdit([name], text)}
        />
      );
    }
    return <Text bold>{profile[name]}</Text>;
  };

  return (
    <Block color={"white"}>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text h1 bold>
          Settings
        </Text>
        <Button>
          <Image source={profile.avatar} style={styles.avatar} />
        </Button>
      </Block>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={styles.inputs}>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ marginBottom: 10 }}>
                Username
              </Text>
              {renderEdit("username")}
            </Block>
            <Text medium secondary onPress={() => toggleEdit("username")}>
              {editing === "username" ? "Save" : "Edit"}
            </Text>
          </Block>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ marginBottom: 10 }}>
                Location
              </Text>
              {renderEdit("location")}
            </Block>
            <Text medium secondary onPress={() => toggleEdit("location")}>
              {editing === "location" ? "Save" : "Edit"}
            </Text>
          </Block>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ marginBottom: 10 }}>
                Email
              </Text>
              {renderEdit("email")}
            </Block>
            <Text medium secondary onPress={() => toggleEdit("email")}>
              {editing === "email" ? "Save" : "Edit"}
            </Text>
          </Block>
        </Block>
        <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />
        <Block style={styles.sliders}>
          <Block margin={[10, 0]}>
            <Text gray2 style={{ marginBottom: 10 }}>
              Budget
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={1000}
              style={{ height: 19 }}
              thumbStyle={styles.thumb}
              trackStyle={{
                height: 6,
                borderRadius: 6,
              }}
              minimumTrackTintColor={theme.colors.secondary}
              maximumTrackTintColor="rgba(157, 163, 100, 0.10)"
              value={budget}
              onValueChange={(value) => setBudget(value)}
            />
            <Text caption gray2 right>
              ${budget.toFixed(0)}
            </Text>
          </Block>
          <Block margin={[10, 0]}>
            <Text gray2 style={{ marginBottom: 10 }}>
              Monthly Cap
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={5000}
              style={{ height: 19 }}
              thumbStyle={styles.thumb}
              trackStyle={{ height: 6, borderRadius: 6 }}
              minimumTrackTintColor={theme.colors.secondary}
              maximumTrackTintColor="rgba(157, 163, 100, 0.10)"
              value={monthly}
              onValueChange={(value) => setMonthly(value)}
            />
            <Text caption gray2 right>
              ${monthly.toFixed(0)}
            </Text>
          </Block>
        </Block>

        <Divider />

        <Block style={styles.toggles}>
          <Block
            row
            center
            space="between"
            style={{ marginBottom: theme.sizes.base * 2 }}
          >
            <Text size={16} gray2>
              Notifications
            </Text>
            <Switch
              value={notifications}
              onValueChange={(value) => setNotifications(value)}
            />
          </Block>
          <Block
            row
            center
            space="between"
            style={{ marginBottom: theme.sizes.base * 2 }}
          >
            <Text size={16} gray2>
              Newsletter
            </Text>
            <Switch
              value={newsletter}
              onValueChange={(value) => setNewsletter(value)}
            />
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

/* Settings.defaultProps = {
  profile: mocks.profile,
}; */

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: "flex-end",
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});

export default Settings;

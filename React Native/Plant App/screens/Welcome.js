import React, { useState } from "react";
import { Animated, Dimensions, StyleSheet, FlatList, Image, Modal, ScrollView } from "react-native";
import { Button, Block, Text } from "../components";
import { theme } from "../constants";

const Welcome = (props) => {

  const [showTerms, setShowTerms] = useState(false);

  const { width, height } = Dimensions.get("window");
  const scrollX = new Animated.Value(0);
  const illustrations = [
    { id: 1, source: require("../assets/images/illustration_1.png")},
    { id: 2, source: require("../assets/images/illustration_2.png")},
    { id: 3, source: require("../assets/images/illustration_3.png")},
  ];

  const renderIllustrations = () => {
    return (
      <FlatList 
      horizontal 
      pagingEnabled 
      scrollEnabled 
      showsHorizontalScrollIndicator={false} 
      scrollEventThrottle={16} 
      snapToAlignment="center" 
      data={illustrations}
      keyExtractor={(item, index) => `${item.id}`}
      renderItem={({item}) => (
        <Image source={item.source} 
        resizeMode="contain"
        style={{width, height: height / 2, overflow:"visible"}} />
      )}
      onScroll={Animated.event([
        {
          nativeEvent: { contentOffset: { x: scrollX } }
        }
      ])}
      />
    );
  };

  const renderSteps = () => {
    const stepPosition = Animated.divide(scrollX, width);
    
    return (
      <Block row center middle style={styles.setpsContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
          <Block 
            animated 
            flex={false} 
            key={`step-${index}`} 
            color="gray" 
            style={[styles.steps, {opacity}]} />);
        })}
      </Block>
    );
  };

  const renderTermsService = () => {
    return (
      <Modal animationType="slide" visible={showTerms} onRequestClose={() => setShowTerms(false)}>
        <Block space="between" padding={[theme.sizes.padding * 2, theme.sizes.padding]}>
          <Text h2 light>Terms of Service</Text>
          <ScrollView style={{marginVertical: theme.sizes.padding}}>
            <Text caption gray height={18} style={{ marginBottom: theme.sizes.base }}><Text bold gray>1.</Text> Your use of the Service is at your sole risk. The service is
                provided on an "as is" and "as available" basis.</Text>
            <Text caption gray height={18}><Text bold gray>2.</Text> Support for Expo services is only available in English, via
                e-mail.</Text>
            <Text caption gray height={18} style={{ marginBottom: theme.sizes.base }}><Text bold gray>3.</Text> You understand that Expo uses third-party vendors and hosting
                partners to provide the necessary hardware, software, networking, storage, and related technology required to run the Service.</Text>
            <Text caption gray height={18} style={{ marginBottom: theme.sizes.base }}><Text bold gray>4.</Text> You must not modify, adapt or hack the Service or modify
              another website so as to falsely imply that it is associated with the Service, Expo, or any other Expo service.</Text>
            <Text caption gray height={18} style={{ marginBottom: theme.sizes.base }}><Text bold gray>5.</Text> You may use the Expo Pages static hosting service solely as 
              permitted and intended to host your organization pages, personal pages, or project pages, and for no other purpose. You may not use
              Expo Pages in violation of Expo's trademark or other rights or in violation of applicable law. Expo reserves the right at all times
              to reclaim any Expo subdomain without liability to you.</Text>
            <Text caption gray height={18} style={{ marginBottom: theme.sizes.base }}><Text bold gray>6.</Text>You agree not to reproduce, duplicate, copy, sell, resell or
              exploit any portion of the Service, use of the Service, or access to the Service without the express written permission by Expo.</Text>
            <Text caption gray height={18} style={{ marginBottom: theme.sizes.base }}><Text bold gray>7.</Text>We may, but have no obligation to, remove Content and Accounts
              containing Content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory,
              pornographic, obscene or otherwise objectionable or violates any party's intellectual property or these Terms of Service.</Text>
            <Text caption gray height={18} style={{ marginBottom: theme.sizes.base }}><Text bold gray>8.</Text>Verbal, physical, written or other abuse (including threats of
              abuse or retribution) of any Expo customer, employee, member, or officer will result in immediate account termination.</Text>
            <Text caption gray height={18} style={{ marginBottom: theme.sizes.base }}><Text bold gray>9.</Text>You understand that the technical processing and transmission
              of the Service, including your Content, may be transferred unencrypted and involve (a) transmissions over various networks;
              and (b) changes to conform and adapt to technical requirements of connecting networks or devices.</Text>
            <Text caption gray height={18} style={{ marginBottom: theme.sizes.base }}><Text bold gray>10.</Text>You must not upload, post, host, or transmit unsolicited
              e-mail, SMSs, or "spam" messages.</Text>       
          </ScrollView>
          <Button gradient onPress={() => setShowTerms(false)}>
            <Text center white>I understand</Text>
          </Button>
        </Block>
      </Modal>
    )
  }

  return (
    <Block color="white">
      <Block center bottom flex={0.4}>
        <Text h1 center bold>
          Your Home.{" "}
          <Text h1 primary>
            Greener.
          </Text>
        </Text>

        <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
          Enjoy the experience.
        </Text>
      </Block>
      <Block center middle>
        {renderIllustrations()}
        {renderSteps()}
      </Block>
      <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
        <Button gradient shadow onPress={() => {props.navigation.navigate("Login");}}>
          <Text center semibold white>
            Login
          </Text>
        </Button>
        <Button shadow onPress={() => {props.navigation.navigate("Signup");}}>
          <Text center semibold>
            Sign Up
          </Text>
        </Button>
        <Button onPress={() => setShowTerms(true)}>
          <Text center caption gray>
            Terms of Services
          </Text>
        </Button>
      </Block>
      {renderTermsService()}
    </Block>
  );
};

Welcome.navigationOptions = (navigationData) => {
  return {
    header: null,
  };
};

const styles = StyleSheet.create({
  setpsContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3.5,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  }
});

export default Welcome;

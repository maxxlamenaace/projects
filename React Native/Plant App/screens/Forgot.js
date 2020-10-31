import React, { useState } from 'react'
import {
    Alert,
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet
  } from "react-native";
  
  import { Button, Block, Input, Text } from "../components";
  import { theme } from "../constants";

const Forgot = props => {
    const VALID_EMAIL = "contact@react-ui-kit.com";

    const [errors, setErrors] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [email, setEmail] = useState(VALID_EMAIL);

    const handleForgot = () => {
        const errors = [];
        Keyboard.dismiss();
        setIsLoading(true);
    
        // check with backend API or with some static data
        if (email !== VALID_EMAIL) {
          errors.push("email");
        }
    
        setErrors(errors);
        setIsLoading(false);
    
        if (!errors.length) {
          Alert.alert(
            "Password sent!",
            "Please check you email.",
            [
              {
                text: "OK",
                onPress: () => {
                  props.navigation.goBack();
                }
              }
            ],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            "Error",
            "Please check you Email address.",
            [{ text: "Try again" }],
            { cancelable: false }
          );
        }
    }

    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
        <KeyboardAvoidingView style={styles.forgot} behavior="padding">
            <Block color={"white"} padding={[0, theme.sizes.base * 2]}>
                <Text h1 bold style={{marginBottom: theme.sizes.padding * 0.2}}>Forgot</Text>
                <Text h2 primary>
                    Use your email to recover your password.
                </Text>
                <Block middle>
                <Input
                label="Email"
                error={hasErrors("email")}
                style={[styles.input, hasErrors("email")]}
                defaultValue={email}
                onChangeText={(text) => setEmail(text)}
                />
                <Button gradient onPress={() => handleForgot()}>
                {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text bold white center>
                    Send Email
                    </Text>
                )}
                </Button>

                <Button onPress={() => props.navigation.goBack()}>
                <Text
                    gray
                    caption
                    center
                    style={{ textDecorationLine: "underline" }}
                >
                    Back to Login
                </Text>
                </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
    );    
};

const styles = StyleSheet.create({
    forgot: {
        flex: 1,
        justifyContent: "center",
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
      },
      hasErrors: {
        borderBottomColor: theme.colors.accent
      }
})

export default Forgot;
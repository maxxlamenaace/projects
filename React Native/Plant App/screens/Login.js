import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Button, Block, Text, Input } from "../components";
import { theme } from "../constants";

const Login = (props) => {
  const VALID_EMAIL = "contact@react-ui-kit.com";
  const VALID_PASSWORD = "subscribe";

  const [email, setEmail] = useState(VALID_EMAIL);
  const [password, setPassword] = useState(VALID_PASSWORD);
  const [errors, setErrors] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    const errors = [];
    Keyboard.dismiss();

    if (email !== VALID_EMAIL) {
      errors.push("email");
    }

    if (password !== VALID_PASSWORD) {
      errors.push("password");
    }

    setIsLoading(false);
    setErrors(errors);

    if (!errors.length) {
      props.navigation.navigate("Browse");
    }
  };

  const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

  return (
    <KeyboardAvoidingView style={styles.login} behavior="padding">
      <Block color={"white"} padding={[0, theme.sizes.padding * 1.2]}>
        <Text h1 bold style={{ marginBottom: theme.sizes.padding * 0.2 }}>
          Login
        </Text>
        <Text h2 primary>
          Please enter your credentials.
        </Text>
        <Block middle>
          <Input
            label="Email"
            error={hasErrors("email")}
            style={[styles.input, hasErrors("email")]}
            defaultValue={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            secure
            label="Password"
            error={hasErrors("password")}
            style={[styles.input, hasErrors("password")]}
            defaultValue={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Button gradient onPress={() => handleLogin()}>
            {loading ? (
              <ActivityIndicator size="small" color={theme.colors.primary} />
            ) : (
              <Text bold white center>
                Login
              </Text>
            )}
          </Button>
          <Button onPress={() => props.navigation.navigate("Forgot")}>
            <Text
              gray
              caption
              center
              style={{ textDecorationLine: "underline" }}
            >
              Forgot your password?
            </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderColor: "transparent",
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});

export default Login;

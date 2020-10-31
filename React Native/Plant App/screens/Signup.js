import React, { useState } from 'react'
import { Alert, ActivityIndicator, Keyboard, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Button, Block, Text, Input } from "../components";
import { theme } from "../constants"

const Signup = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState([]);
    const [loading, setIsLoading] = useState(false);

    const handleSignup = () => {
        setIsLoading(true);
        const errors = [];
        Keyboard.dismiss();

        if (!email) {
            errors.push("email");
        }
        
        if (!password) {
            errors.push("password");
        }

        if (!username) {
            errors.push("username");
        }

        setIsLoading(false);
        setErrors(errors);

        if (!errors.length) {
            Alert.alert(
              "Success!",
              "Your account has been created",
              [
                {
                  text: "Continue",
                  onPress: () => {
                    props.navigation.navigate("Browse");
                  }
                }
              ],
              { cancelable: false }
            );
          }
    }

    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return <KeyboardAvoidingView style={styles.signup} behavior="padding">
            <Block color={"white"} padding={[0, theme.sizes.padding * 1.2]}>
                <Text h1 bold style={{marginBottom: theme.sizes.padding * 0.2}}>Sign Up</Text>
                <Text h2 primary>
                    Create your account to begin.
                </Text>
                <Block middle>
                    <Input 
                        label="Username" 
                        error={hasErrors("username")}
                        style={[styles.input, hasErrors("username")]} 
                        defaultValue={username} 
                        onChangeText={(text) => setUsername(text)}/>
                    <Input 
                        label="Email" 
                        error={hasErrors("email")}
                        style={[styles.input, hasErrors("email")]} 
                        defaultValue={email} 
                        onChangeText={(text) => setEmail(text)}/>
                    <Input 
                        secure 
                        label="Password" 
                        error={hasErrors("password")}
                        style={[styles.input, hasErrors("password")]}
                        defaultValue={password} 
                        onChangeText={(text) => setPassword(text)}/>
                    <Button gradient onPress={() => handleSignup()}>
                        {loading ? <ActivityIndicator size="small" color={theme.colors.primary}/> : <Text bold white center>Sign Up</Text> }
                    </Button>
                </Block>
            </Block>
        </KeyboardAvoidingView>
};

const styles = StyleSheet.create({
    signup: {
        flex: 1,
        justifyContent: "center"
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
    }
})

export default Signup;

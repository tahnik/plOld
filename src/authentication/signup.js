import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableHighlight, Alert } from 'react-native';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

var width = Dimensions.get('window').width;

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: ''
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.signIn}>
                    <TextInput
                        placeholder={"Username"}
                        marginBottom={10}
                        onChangeText={ (e) => { this.setState({ username: e }) } }
                    />
                    <TextInput
                        placeholder={"Password"}
                        marginBottom={10}
                        secureTextEntry={ true }
                        onChangeText={ (e) => { this.setState({ password: e }) } }
                    />
                    <TextInput
                        placeholder={"Confirm Password"}
                        marginBottom={30}
                        secureTextEntry={ true }
                        onChangeText={ (e) => { this.setState({ confirmPassword: e }) } }
                    />
                    <Button
                        text={'Sign up'}
                        onPress={ () => this.signUp() }
                    />
                </View>

                <View style={styles.goRegister}>
                    <TouchableHighlight style={styles.customButtonStyle} onPress={ () => this.goToSignin() } underlayColor={ 'rgba( 275, 275, 275, 0.9 )' }>
                        <Text style={{ fontSize: 15, color: 'white', textDecorationLine: 'underline' }}>
                            I already have an account
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
    goToSignin() {
        this.props.navigator.pop();
    }
    signUp() {
        var username = this.state.username;
        var password = '';
        if( this.state.password == this.state.confirmPassword ){
            password = this.state.password;
        }else{
            Alert.alert(
                'Password Doesn\'t Match',
                '',
                [
                    {text: 'Try Again' }
                ]
            )
            return;
        }

        if( this.state.password.length < 6 ){
            Alert.alert(
                'Password must be at least 6 characters long',
                '',
                [
                    {text: 'Try Again' }
                ]
            )
            return;
        }

        if( this.state.username.length < 4 ){
            Alert.alert(
                'Username must be at least 4 characters long',
                '',
                [
                    {text: 'Try Again' }
                ]
            )
            return;
        }

        var formBody = 'username=' + username + '&' + 'password=' + password;
        fetch('https://piracyleak.com/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody
        })
        .then((response) => response.json())
        .then((responseText) => {
            if (responseText.success){
                this.props.setToken(responseText.token, responseText.username);
            }else{
                Alert.alert(
                    'Username already exists',
                    '',
                    [
                        {text: 'Try Again'}
                    ]
                )
            }
        })
        .catch((error) => {
            Alert.alert(
                'Something went wrong. Please try again',
                '',
                [
                    {text: 'Try Again'}
                ]
            )
        });
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D4145A'
    },
    signIn: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goRegister: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Signup;

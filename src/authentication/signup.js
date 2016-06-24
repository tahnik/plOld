import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableHighlight } from 'react-native';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

var width = Dimensions.get('window').width;

class Signup extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.signIn}>
                    <TextInput
                        placeholder={"Username"}
                        marginBottom={10}
                    />
                    <TextInput
                        placeholder={"Password"}
                        marginBottom={10}
                        secureTextEntry={ true }
                    />
                    <TextInput
                        placeholder={"Confirm Password"}
                        marginBottom={30}
                        secureTextEntry={ true }
                    />
                    <Button
                        text={'Sign up'}
                        onPress={ () => this.signUp() }
                    />
                </View>

                <View style={styles.goRegister}>
                    <TouchableHighlight style={styles.customButtonStyle} onPress={ () => this.goToSignin() } underlayColor={ 'rgba( 275, 275, 275, 0.9 )' }>
                        <Text style={{ fontSize: 15, color: 'white', textDecorationLine: 'underline' }}>
                            I don't have an account
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
        console.log("Hey");
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

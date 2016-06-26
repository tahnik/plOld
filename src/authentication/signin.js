import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableHighlight } from 'react-native';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Firebase from 'firebase';

var width = Dimensions.get('window').width;

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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
                        marginBottom={30}
                        secureTextEntry={ true }
                        onChangeText={ (e) => { this.setState({ password: e }) } }
                    />
                    <Button
                        text={'Sign in'}
                        onPress={ () => this.signIn() }
                    />
                </View>

                <View style={styles.goRegister}>
                    <TouchableHighlight style={styles.customButtonStyle} onPress={ () => this.goToRegister()} underlayColor={ 'rgba( 275, 275, 275, 0.9 )' }>
                        <Text style={{ fontSize: 15, color: 'white', textDecorationLine: 'underline' }}>
                            I don't have an account
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
    signIn() {
        //
    }
    goToRegister() {
        this.props.navigator.push( { name: 'signup' } )
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

export default Signin;

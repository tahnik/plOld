import React, { Component } from 'react';
import { AppRegistry, TextInput, View, StyleSheet, Dimensions } from 'react-native';

var width = Dimensions.get('window').width;
var customMarginBottom = 10;
var customWidth = width * 0.7;
var customSecureTextEntry = false;

class customTextInput extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={[
                    styles.textInputContainer, {
                        marginBottom: ( typeof this.props.marginBottom === 'undefined' ?  customMarginBottom : this.props.marginBottom ),
                        width: ( typeof this.props.width === 'undefined' ?  customWidth : this.props.width )
                    }
                ]}>
                <TextInput
                    placeholder={this.props.placeholder}
                    style={styles.customTextInputStyle}
                    secureTextEntry={ ( typeof this.props.secureTextEntry === 'undefined' ?  customSecureTextEntry : this.props.secureTextEntry ) }
                />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    textInputContainer: {
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    customTextInputStyle: {
        height: 45,
        backgroundColor: 'white',
        paddingLeft: 5,
    }
})

export default customTextInput;

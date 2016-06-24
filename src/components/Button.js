import React, { Component } from 'react';
import { AppRegistry, TouchableHighlight, View, StyleSheet, Dimensions,Text } from 'react-native';

var width = Dimensions.get('window').width;
var customMarginBottom = 10;
var customWidth = width * 0.7;

class customButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableHighlight
                style={[
                    styles.customButtonStyle, {
                        marginBottom: (typeof this.props.marginBottom === 'undefined' ?  customMarginBottom : this.props.marginBottom),
                        width: (typeof this.props.width === 'undefined' ?  customWidth : this.props.width )
                    }
                ]}
                onPress={ () => this.props.onPress() }
                underlayColor={ 'rgba( 0, 113, 188, 0.8 )' }>
                <Text style={{ fontSize: 21, color: 'white' }}>
                    {this.props.text}
                </Text>
            </TouchableHighlight>
        )
    }
}

var styles = StyleSheet.create({
    customButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0071BC',
        height: 45
    }
})

export default customButton;

import React, { Component } from 'react';
import { AppRegistry, TouchableHighlight, TouchableNativeFeedback, View, StyleSheet, Dimensions,Text, Image, TouchableOpacity } from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


class TopNav extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={ styles.container }>
                <TouchableOpacity onPress={ () => this.props.onOpenDrawer() }  style={{ height: height * 0.09, width: height * 0.09 }}>
                    <Image source={{uri: 'http://i.stack.imgur.com/Fw96Z.png'}}
                        style={{ height: height * 0.09, width: height * 0.09 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.onCreateTap() }  style={{ height: height * 0.09, width: height * 0.09, position: 'absolute', top: 0, right: 0 }}>
                    <Image source={{uri: 'http://www.iconsdb.com/icons/preview/white/plus-xxl.png'}}
                        style={{ height: height * 0.09, width: height * 0.09 }} />
                </TouchableOpacity>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#D4145A',
        height: height * 0.09
    }
})

export default TopNav;

import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, AsyncStorage, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
var width = Dimensions.get('window').width;


class leak_item extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={{ alignItems: 'center', width: width }}>
                <View style={styles.container}>
                    <View style={ styles.image }>
                        <Image source={{uri: 'https://piracyleak.com/uploads/' + this.props.id + '.jpg'}}
                            style={{width: width * 0.3, height: width * 0.3}} />
                    </View>
                    <View style={ styles.info }>
                        <Text style={ styles.header}>
                            { this.props.movie }
                        </Text>
                        <Text style={ styles.description }>
                            { this.props.description }
                        </Text>
                        <Text style={ styles.location }>
                            { this.props.location }
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        height: width * 0.3,
        width: width * 0.95,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginBottom: 20
    },
    info: {
        position: 'relative',
        right: 0,
        top: 0,
        width: width * 0.64,
        paddingLeft: 5
    },
    header: {
        flex: 3,
        fontSize: 20
    },
    description: {
        flex: 5,
        fontSize: 12,
        textAlign: 'left'
    },
    location: {
        flex: 2,
        fontSize: 10
    }
})

export default leak_item;

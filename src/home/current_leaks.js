import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, AsyncStorage, ScrollView, StyleSheet, Image } from 'react-native';
import Leak_item from '../home/leak_item'


class Home_item extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <ScrollView style={ styles.container }>
                { this.props.leaks.map((e) => <Leak_item key={e.leakid} movie={e.movie} description={e.description} location={e.location} id={e.leakid} />) }
            </ScrollView>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 25
    },

})

export default Home_item;

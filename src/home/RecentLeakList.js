import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, AsyncStorage, ScrollView, StyleSheet, Image } from 'react-native';
import RecentLeakListItems from '../home/RecentLeakListItems'


class Home_item extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <ScrollView style={ styles.container }>
                { this.props.leaks.map((e) => <RecentLeakListItems key={e.leakid} movie={e.movie} description={e.description} location={e.location} id={e.leakid} />) }
            </ScrollView>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7E7E7',
        borderColor: 'green',
        borderWidth: 10
    },

})

export default Home_item;

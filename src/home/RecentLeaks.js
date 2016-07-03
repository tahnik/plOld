import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, AsyncStorage, ScrollView, StyleSheet } from 'react-native';
import RecentLeakList from './RecentLeakList';

class RecentLeaks extends Component {
    constructor(props){
        super(props);
        this.fetchTopLeak();
        this.state = {
            leakList: []
        }
    }
    fetchTopLeak () {
        var body = 'token=' + this.props.Token;
        fetch('https://piracyleak.com/leak', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body
        })
        .then((response) => response.json())
        .then((responseText) => {
            this.setState({
                leakList: responseText
            })
        })
        .catch((error) => {
            console.warn(error);
        });

    }
    render() {
        return (
            <RecentLeakList leaks={ this.state.leakList } />
        )
    }
}

export default RecentLeaks;

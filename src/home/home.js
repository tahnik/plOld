import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, AsyncStorage, ScrollView, StyleSheet } from 'react-native';
import CurrentLeaks from '../home/current_leaks'

class Home extends Component {
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
    //<Home_item leakid={ e.leadid } description={ e.description } location={ e.location } movie={ e.movie } />
    render() {
        return (
            <CurrentLeaks leaks={ this.state.leakList } />
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 20
    }
})

export default Home;

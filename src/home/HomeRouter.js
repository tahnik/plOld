import React, { Component } from 'react';
import { AppRegistry, Navigator, View, Text, StyleSheet, Dimensions, LayoutAnimation } from 'react-native';
import DrawerLayout from 'react-native-drawer-layout';

import CreateLeak from './CreateLeak';
import RecentLeaks from './RecentLeaks';

var width = Dimensions.get('window').width;

class Home extends Component {
    constructor(props) {
        super(props);
    }
    componentWillUpdate() {
        //LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    render() {
        if(this.props.currentRoute === 'CreateLeak') {
            return(
                <CreateLeak Token={this.props.Token} Username={this.props.Username} />
            )
        }
        return(
            <RecentLeaks Token={this.props.Token} Username={this.props.Username} />
        )
    }
}

export default Home;

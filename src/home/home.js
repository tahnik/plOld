import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, AsyncStorage } from 'react-native';


class Home extends Component {
    constructor(props){
        super(props);
    }
    render() {
        AsyncStorage.getItem('tokenStorage', (err, result) => {
            console.log(result);
        });
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <Text>
                    Welcome home, {this.props.Username}
                </Text>
            </View>
        )
    }
    fetchTopLeak(){
        //
    }
}

export default Home;

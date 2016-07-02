import React, { Component } from 'react';
import { AppRegistry, TouchableHighlight, View, StyleSheet, Dimensions,Text, Picker, Modal } from 'react-native';


var width = Dimensions.get('window').width;
var customMarginBottom = 10;
var customWidth = width * 0.7;


class customButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', marginTop: 5 }}>
                <Picker
                    style={{ height: 40 }}
                    selectedValue={ this.props.selectedMovie }
                    onValueChange={(movie) => this.props.selectMovie(movie) }>
                    { this.props.list.map((e) => ( <Picker.Item key={e.id} label={e.value} value={e.id - 1} /> ))}
                </Picker>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    customButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0071BC',
        height: 30
    }
})

export default customButton;

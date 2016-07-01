import React, { Component } from 'react';
import { AppRegistry, TouchableHighlight, View, StyleSheet, Dimensions,Text, Picker, Modal, Alert, Image } from 'react-native';

var width = Dimensions.get('window').width;
var customMarginBottom = 10;
var customWidth = width * 0.7;


class customButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            buttonText: ''
        }
    }
    render() {
        console.log(this.props.selectedMovie)
        return (
            <View>
                <Modal
                    animationType={ 'slide' }
                    transparent={ false }
                    visible={ this.state.modalVisible }
                    onRequestClose={() => { this.setModalVisible(false) }}
                    >
                    <Picker
                        selectedValue={ this.props.selectedMovie }
                        onValueChange={(movie) => this.props.selectMovie(movie) }>
                        { this.props.list.map((e) => ( <Picker.Item key={e.id} label={e.value} value={e.id - 1} /> ))}
                    </Picker>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableHighlight onPress={ () => this.setModalVisible(false) }  underlayColor={ 'rgba( 0, 0, 0, 0.5 )' }  style={{ marginTop: 5, width: width * 0.5, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center' }} >
                            <View style={{ alignItems: 'center' }}>
                                <Text>
                                    Done
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </Modal>
                <TouchableHighlight onPress={ () => this.setModalVisible(true) } underlayColor={ 'rgba( 0, 0, 0, 0.5 )' }  style={ styles.select } >
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ marginLeft: 10, fontSize: 18 }}>
                            { this.props.list.length > 1 ? this.props.list[this.props.selectedMovie].value : console.log() }
                        </Text>
                        <Image
                            style={ styles.camera }
                            source={require('../resources/arrow.png')}
                            />
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
}

var styles = StyleSheet.create({
    customButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0071BC',
        height: 45
    },
    select: {
        marginTop: 5,
        width: width * 0.9,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center'
    },
    camera: {
        position: 'absolute',
        top: 2,
        right: 10,
        height: 18,
        width: 25
    }
})

export default customButton;

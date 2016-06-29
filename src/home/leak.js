import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, AsyncStorage, StyleSheet, TouchableHighlight, Image, Dimensions, ScrollView, Picker, TextInput, Platform } from 'react-native';
import PickerAndroid from '../components/PickerAndroid';
import PickerIOS from '../components/PickerIOS';
import Button from '../components/Button';



var customArray = [
    {label: 'Kabaali', value:'Kabaali'},
    {label: 'Spectre', value:'Spectre'}
]

var district = [
    {label: 'Dhaka', value:'Dhaka'},
    {label: 'Khulna', value:'Khulna'}
]


var width = Dimensions.get('window').width;

class Leak extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: 'Kabaali',
            district: 'Dhaka',
            description: '',
            location: ''
        }
    }
    render() {
        return (
            <ScrollView style={ styles.container }>
                <View style={ styles.addPicture }>
                    <TouchableHighlight onPress={ console.log("") }>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                style={ styles.camera }
                                source={require('../resources/camera.png')}
                                />
                            <Text>
                                Add a picture
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={ styles.leakInfoContainer }>
                    <View style={ styles.leakInfo }>
                        <Text>
                            Select Movie
                        </Text>
                        {
                            Platform.OS === 'android' ?
                            <PickerAndroid
                                list={ customArray }
                                selectedMovie={ this.state.movie }
                                selectMovie={(movie) => this.setState({ movie: movie })}
                                buttonText={ this.state.movie }/>
                                :
                                <PickerIOS
                                    list={ customArray }
                                    selectedMovie={ this.state.movie }
                                    selectMovie={(movie) => this.setState({ movie: movie })}
                                    buttonText={ this.state.movie }/>
                        }
                        <Text style={{ marginTop: 5 }}>
                            Description
                        </Text>
                        <TextInput
                            placeholder={"Type a Description (Optional)"}
                            style={{height: 40, paddingLeft:5, backgroundColor: 'rgba(0, 0, 0, 0.3)', marginTop: 5 }}
                            onChangeText={(description) => this.setState({description})}
                            value={this.state.description}
                            />
                        <Text style={{ marginTop: 5 }}>
                            Location
                        </Text>
                        <TextInput
                            placeholder={'Address of Shop'}
                            underlayColor={ 'rgba( 0, 113, 188, 0.8 )' }
                            style={{height: 40, paddingLeft:5, backgroundColor: 'rgba(0, 0, 0, 0.3)', marginTop: 5  }}
                            onChangeText={(location) => this.setState({location})}
                            value={this.state.location}
                            />
                        <Text style={{ marginTop: 5 }}>
                            Select District
                        </Text>
                        {
                            Platform.OS === 'android' ?
                            <PickerAndroid
                                list={ district }
                                selectedMovie={ this.state.district }
                                selectMovie={(district) => this.setState({ district: district })}
                                buttonText={ this.state.district }/>
                                :
                                <PickerIOS
                                    list={ district }
                                    selectedMovie={ this.state.district }
                                    selectMovie={(district) => this.setState({ district: district })}
                                    buttonText={ this.state.district }/>
                        }
                        <View style={{ alignItems: 'center' }}>
                            <Button
                                backgroundColor={ '#D4145A' }
                                marginTop={ 20 }
                                text={"Submit"}
                                onPress={ () => this.signIn() }
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    addPicture: {
        height: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    camera: {
        width: 150,
        height: 150
    },
    leakInfoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    leakInfo: {
        flex: 1,
        width: width * 0.9,
        marginTop: 20,
        backgroundColor: 'white'
    }
})

export default Leak;

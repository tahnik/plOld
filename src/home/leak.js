import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, AsyncStorage, StyleSheet, TouchableHighlight, Image, Dimensions, ScrollView, Picker, TextInput, Platform, Alert } from 'react-native';
import PickerAndroid from '../components/PickerAndroid';
import PickerIOS from '../components/PickerIOS';
import Button from '../components/Button';
import Camera from '../components/CameraModal';


var width = Dimensions.get('window').width;

class Leak extends Component {
    constructor(props) {
        super(props);
        this.loadcity();
        this.loadMovie();
        this.state = {
            movie: 0,
            city: 0,
            description: '',
            location: '',
            imageSource: '',
            cityList: [],
            movieList: []
        }
    }
    loadcity () {
        fetch('https://piracyleak.com/city', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'data=city'
        })
        .then((response) => response.json())
        .then((responseText) => {
            this.setState({
                cityList: responseText
            })
        })
        .catch((error) => {
            console.warn(error);
        });
    }
    loadMovie () {
        fetch('https://piracyleak.com/movie', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'data=movie'
        })
        .then((response) => response.json())
        .then((responseText) => {
            this.setState({
                movieList: responseText
            })
        })
        .catch((error) => {
            console.warn(error);
        });
    }
    render() {
        return (
            <ScrollView style={ styles.container }>
                <View style={ styles.addPicture }>
                    <Camera Token={this.props.Token} setImageBody={(imageSource) => this.setState({ imageSource })} />
                </View>
                <View style={ styles.leakInfoContainer }>
                    <View style={ styles.leakInfo }>
                        <Text>
                            Select Movie
                        </Text>
                        {
                            Platform.OS === 'android' ?
                            <PickerAndroid
                                list={ this.state.movieList }
                                selectedMovie={ this.state.movie }
                                selectMovie={(movie) => this.setState({ movie })} />
                                :
                                <PickerIOS
                                    list={ this.state.movieList }
                                    selectedMovie={ this.state.movie }
                                    selectMovie={(movie) => this.setState({ movie })} />
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
                            Select city
                        </Text>
                        {
                            Platform.OS === 'android' ?
                            <PickerAndroid
                                list={ this.state.cityList }
                                selectedMovie={ this.state.city }
                                selectMovie={(city) => this.setState({ city })} />
                                :
                                <PickerIOS
                                    list={ this.state.cityList }
                                    selectedMovie={ this.state.city }
                                    selectMovie={(city) => this.setState({ city })} />
                        }
                        <View style={{ alignItems: 'center' }}>
                            <Button
                                backgroundColor={ '#D4145A' }
                                marginTop={ 20 }
                                text={"Submit"}
                                onPress={ () => this.submitLeak()}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
    submitPicture(imageID){
        var body = new FormData();
        body.append('image', {uri: this.state.imageSource , name: imageID.toString(), type: 'image/jpg'})
        body.append('token', this.props.Token);
        console.log(body);

        fetch('https://piracyleak.com/user/leak/image', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: body
        })
        .then((response) => response.text())
        .then((responseText) => {
            console.log(responseText);
        })
        .catch((error) => {
            console.warn(error);
        });
    }
    submitLeak() {
        if( this.state.imageSource === '' ) {
            Alert.alert(
                'Please attach a picture',
                '',
                [
                    {text: 'Go back'}
                ]
            )
            return;
        }
        if( this.state.location === '' ) {
            Alert.alert(
                'Please enter a location',
                '',
                [
                    {text: 'Go back'}
                ]
            )
            return;
        }
        var body =  'token=' + this.props.Token  + '&' +
                    'movie=' + ( this.state.movie + 1 ) + '&' +
                    'description=' + this.state.description + '&' +
                    'location=' + this.state.location + '&' +
                    'city=' + ( this.state.city + 1 ) ;
        fetch('https://piracyleak.com/user/leak', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body
        })
        .then((response) => response.json())
        .then((responseText) => {
            console.log(responseText);
            this.submitPicture(responseText.imageID);
        })
        .catch((error) => {
            console.warn(error);
        });
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
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
})

export default Leak;

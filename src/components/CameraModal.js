import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions,Text, Picker, Modal, Image, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

var width = Dimensions.get('window').width;
var customMarginBottom = 10;
var customWidth = width * 0.7;

var options = {
  title: 'Select Avatar',
  quality: 0.4,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


class customButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSource: ''
        }
    }

    takeTempPicture() {
        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either data:
                //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                // uri (on iOS)
                //const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                // uri (on android)
                //const source = {uri: response.uri, isStatic: true};

                const source = '';

                if(Platform.OS === 'android'){
                    source = {uri: response.uri, isStatic: true};
                }else{
                    source = {uri: response.uri.replace('file://', ''), isStatic: true};
                }
                this.setState({
                    imageSource: source
                })
                this.props.setImageBody(source.uri);
            }
        });
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={ () => this.takeTempPicture() }>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={ styles.camera }
                            source={ this.state.imageSource === '' ? require('../resources/camera.png') : this.state.imageSource }
                            />
                        <Text>
                            Add a picture
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    camera: {
        width: 150,
        height: 150
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
})

export default customButton;

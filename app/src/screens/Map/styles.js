import {StyleSheet, Dimensions} from 'react-native';

let {width, height} = Dimensions.get('window');


const buttonStyleTemplate = {
    width: 150,
    height: 50,
    borderRadius: 85,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.12,
    opacity: .85,
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        width: width,
        height: height,
        zIndex: -1,
    },
    buttons: {
        width: width,
        height: 50,
        zIndex: 10,
        position: 'absolute',
        top: '5%',
    },
    findMeButton: {
        ...buttonStyleTemplate,
        position: 'absolute',
        left: '5%',
    },
    followMeButton: {
        ...buttonStyleTemplate,
        position: 'absolute',
        right: '5%',
    },
    followMeButtonText: {
        color: 'black',
    },
    followMeButtonActive: {
        ...buttonStyleTemplate,
        position: 'absolute',
        right: '5%',
        backgroundColor: '#3F51B5',
    },
    followMeButtonTextActive: {
        color: 'white',
    },
});
export default styles;

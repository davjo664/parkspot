import {StyleSheet, Dimensions} from 'react-native';

let {width, height} = Dimensions.get('window');


const buttonStyleTemplate = {
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
        width: 50,
        height: 50,
        ...buttonStyleTemplate,
        position: 'absolute',
        left: '5%',
    },
});
export default styles;

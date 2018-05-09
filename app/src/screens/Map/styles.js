import { StyleSheet, Dimensions } from 'react-native';

let { width, height } = Dimensions.get('window');

const buttonStyleTemplate = {
  borderRadius: 85,
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  shadowOpacity: 0.12,
  opacity: 0.85,
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
  buttonsContainer: {
    zIndex: 10,
    position: 'absolute',
    bottom: 15,
    right: 15,
    height: 180,
    // width: 50,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    height: 50,
    width: 50,
    ...buttonStyleTemplate,
  },
  versionLabel: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
export default styles;

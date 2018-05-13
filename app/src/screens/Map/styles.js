import { StyleSheet, Dimensions } from 'react-native';

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
    ...StyleSheet.absoluteFillObject,
  },
  buttonsContainer: {
    zIndex: 3,
    position: 'absolute',
    right: 15,
    height: 180,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    width: 50,
    height: 50,
    ...buttonStyleTemplate,
  },
  versionLabel: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: 50,
    height: 20,
  },
});
export default styles;

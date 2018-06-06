import {Dimensions, StyleSheet} from 'react-native';


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
    alignSelf: 'center',
    width: 50,
    height: 20,
  },
  safeArea: {
    flex: 1,
  },
  cluster: {
    backgroundColor: 'deeppink',
    width: 40,
    height: 40,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clusterText: {
    color: 'white',
    fontWeight: '600',
  }
});
export default styles;

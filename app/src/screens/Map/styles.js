import {Dimensions, StyleSheet} from 'react-native';

import colors from './../../theme/parkspotColors';

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
    width: 32,
    height: 32,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightAquamarine,
    borderRadius: 20,
  },
  clusterText: {
    width: 14,
    height: 29,
    fontSize: 24,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.white,
  }
});
export default styles;

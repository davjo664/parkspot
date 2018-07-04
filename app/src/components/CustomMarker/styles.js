import {Dimensions, StyleSheet} from 'react-native';

import colors from '../../theme/parkspotColors';


const styles = StyleSheet.create({
  pin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinShadow: {
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 1
  },
  pinText: {
    fontSize: 24,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.white,
  },
});

export default styles;

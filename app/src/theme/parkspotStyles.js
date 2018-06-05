import {StyleSheet} from 'react-native';
import colors from './parkspotColors';


const textStyles = StyleSheet.create({
  textStyle: {
    fontFamily: 'System',
    fontSize: 77,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.white
  },
  textStyle2: {
    fontFamily: 'System',
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.41,
    color: colors.blackTwo
  },
  textStyle3: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.41,
    color: colors.steel
  },
  textStyle4: {
    fontFamily: 'System',
    fontSize: 19,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.46,
    color: colors.cement
  },
  paragraph16PtReg: {
    // fontFamily: "PNext",
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0.5,
    textAlign: 'center',
    color: colors.white
  },
  header18PtReg: {
    // fontFamily: "PNext",
    fontSize: 18,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0.5,
    textAlign: 'center',
    color: '#292a2e'
  }
});
export default textStyles;

import {StyleSheet} from 'react-native';
import colors from '../../theme/parkspotColors';

const additionalStyles = StyleSheet.create({
  title: {
    marginLeft: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 22,
    color: colors.blackTwo,
  },
  filterName: {
    marginLeft: 20,
    letterSpacing: -0.4,
    fontSize: 17,
    color: colors.blackTwo,
  },
  listItem: {
    borderColor: colors.lightGray,
    borderBottomWidth: 1,
  },
  noBorder: {
    borderWidth: 0,
    borderColor: 'transparent',
  },
  closeIcon: {
    height: 24,
    width: 24,
    marginTop: 28,
    marginLeft: 20,
  },
});

export default additionalStyles;

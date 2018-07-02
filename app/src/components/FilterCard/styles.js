import {StyleSheet} from 'react-native';
import colors from '../../theme/parkspotColors';

const additionalStyles = StyleSheet.create({
  title: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 22,
    color: colors.blackTwo,
  },
  filterName: {
    letterSpacing: -0.4,
    fontSize: 17,
    color: colors.blackTwo,
  },
  listItem: {
    borderColor: colors.lightGray,
    borderBottomWidth: 1,
    marginLeft: 0,
  },
  noBorder: {
    borderWidth: 0,
    borderColor: 'transparent',
  },
  closeIcon: {
    height: 24,
    width: 24,
  },
  sliderContainer: {
    marginTop: 20,
  }
});

export default additionalStyles;

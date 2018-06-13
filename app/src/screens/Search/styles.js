import {Dimensions, StyleSheet, Platform} from 'react-native';
import {isIphoneX} from '../../helper/iPhoneX';

let {width, height} = Dimensions.get('window');



const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? (isIphoneX() ? 40 : 30) : 20,
  },
  input: {
    backgroundColor: 'white',
  },
  listView: {},
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',

  },
  cancelButton: {
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
    justifyContent: 'center',
  },
  description: {},
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  }
});
export default defaultStyles;

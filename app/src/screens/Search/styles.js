import {Dimensions, StyleSheet} from 'react-native';

let {width, height} = Dimensions.get('window');

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 10,
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

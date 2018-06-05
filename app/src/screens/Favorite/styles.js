import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  subtext: {
    fontSize: 11,
    color: 'grey',
    marginTop: 5,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  trash: {
    alignSelf: 'flex-end',
    backgroundColor: '#8cb8ff'
  },
  contenContainer: {
    paddingRight: 20,
    paddingLeft: 20,
  },
});
export default styles;

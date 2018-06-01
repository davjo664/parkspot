import {Dimensions, StyleSheet} from 'react-native';

let {width, height} = Dimensions.get('window');

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
});
export default styles;

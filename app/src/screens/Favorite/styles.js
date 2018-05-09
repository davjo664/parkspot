import { StyleSheet, Dimensions } from 'react-native';

let { width, height } = Dimensions.get('window');

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
  },
  subtext: {
    fontSize: 11,
    color: 'grey',
    marginTop: 5,
  },
});
export default styles;

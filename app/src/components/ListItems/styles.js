import {StyleSheet} from 'react-native';


const paddingSide = 20;

const styles = StyleSheet.create({
  listContainer: {
    marginRight: paddingSide,
    marginLeft: paddingSide,
    flex: 1,
    alignItems: 'flex-end',
  },
  headingContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
    marginRight: -10,
  },
  itemsContainer: {
    flex: 1,
    flexDirection: 'column',
  }, truncatedText: {
    flex: 1,
    marginRight: 20,
  }
});

export default styles;

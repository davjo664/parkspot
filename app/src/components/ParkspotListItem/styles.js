import { Dimensions, StyleSheet } from 'react-native';


const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 75
};

const paddingSide = 20

const styles = StyleSheet.create({
    listContainer: {
        height: 91,
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
        marginRight: 2,
    }
});

export default styles;

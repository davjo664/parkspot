import {StyleSheet, Dimensions} from 'react-native';

let {width, height} = Dimensions.get('window');

const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {},
    listView: {},
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
    loader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 20,
        marginRight: 10
    },
});
export default defaultStyles;
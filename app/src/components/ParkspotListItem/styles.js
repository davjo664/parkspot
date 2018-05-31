import { Dimensions, StyleSheet } from 'react-native';

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 75
};

const paddingSide = 20

const styles = StyleSheet.create({
    listContainer: {
        height: 91,
    },
    line: {
        height: 2,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#d0d4d7",
    },
    heading: {},
    text: {

    }
});

export default styles;

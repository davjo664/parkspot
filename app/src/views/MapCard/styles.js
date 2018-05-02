import {StyleSheet} from 'react-native';


const iconTemplate = {
    width: 40,
    height: 40,
};

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        bottom: '0%',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
    },
    cardItem: {
        borderWidth: 1,
        borderTopRightRadius: 22,
        borderTopLeftRadius: 22,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 1,

        width: '100%',
        height: '95%',
        position: 'absolute',
        bottom: '0%',
        zIndex: 20,
    },
    title: {
        color: '#777',
        fontSize: 20,
        fontWeight: 'bold',
    },
    icons: {
        marginTop: 10,
        flexDirection: 'row',
    },
    iconEnabled: {
        ...iconTemplate,
        color: '#000',
    },
    iconDisabled: {
        ...iconTemplate,
        color: '#aaa',
    },
    content: {
        marginTop: 20,
    },
});
export default styles;

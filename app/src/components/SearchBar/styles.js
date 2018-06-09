import { Dimensions, StyleSheet } from 'react-native';
import parkspotColors from '../../theme/parkspotColors';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: parkspotColors.white,
        borderWidth: 1,
        height: 36,
        backgroundColor: parkspotColors.white,
    },
    input: {
        flex: 1,
        marginLeft: 5,
    },
    icon: {
        marginLeft: 5,
    }
});
export default styles;

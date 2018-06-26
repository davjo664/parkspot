import {StyleSheet} from 'react-native';

import colors from '../../theme/parkspotColors';

const styles = StyleSheet.create({
    panelTitle: {
        height: 20,
        fontSize: 17,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.41,
        color: colors.blackThree,
    },
    panelDistance: {
        height: 14,
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.41,
        color: colors.steel,
    },
    panelSubtitle: {
        marginTop: 3,
        height: 14,
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.41,
        color: colors.steel,
    },
});

export default styles;

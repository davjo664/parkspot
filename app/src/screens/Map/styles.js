import { StyleSheet, Dimensions } from 'react-native';

let { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		width: width * 0.999,
		height: height * 0.95,
		zIndex: -1,
	},
	mapButton: {
		width: 75,
		height: 75,
		borderRadius: 85/2,
		backgroundColor: 'rgba(252, 253, 253, 0.9)',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: 'black',
		shadowRadius: 8,
		shadowOpacity: 0.12,
		opacity: .6,
		zIndex: 10,
	},
});
export default styles;

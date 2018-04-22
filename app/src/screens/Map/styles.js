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
	},
});
export default styles;

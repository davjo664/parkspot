import { StyleSheet, Dimensions } from 'react-native';

let { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	title: {
		marginTop: 15,
	},
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: '#FBFAFA',
	},
	map: {
		flex: 1,
		width: width,
		height: height,
	},
});
export default styles;

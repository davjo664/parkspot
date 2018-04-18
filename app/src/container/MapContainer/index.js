// @flow
import * as React from 'react';
import {connect} from 'react-redux';
import Map from '../../screens/Map';
import {updateLocation} from './actions';

export interface Props {
	navigation: any;
	updateLocation: Function;
	position: any;
}

export interface State {
}

class MapContainer extends React.Component<Props, State> {
	render() {
		return (
			<Map
				navigation={this.props.navigation}
				updateLocation={this.props.updateLocation}
				position={this.props.position}
			/>
		);
	}
}

function bindAction(dispatch) {
	return {
		updateLocation: () => dispatch(updateLocation()),
	};
}

const mapStateToProps = state => ({
	position: state.mapReducer.position
});
export default connect(mapStateToProps, bindAction)(MapContainer);

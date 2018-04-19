// @flow
import * as React from 'react';
import {connect} from 'react-redux';
import Map from '../../screens/Map';
import {updateLocation, watchLocation} from './actions';

export interface Props {
	navigation: any;
	updateLocation: Function;
	watchLocation: Function;
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
				watchLocation={this.props.watchLocation}
				position={this.props.position}
			/>
		);
	}
}

function bindAction(dispatch) {
	return {
		updateLocation: () => dispatch(updateLocation()),
		watchLocation: () => dispatch(watchLocation()),
	};
}

const mapStateToProps = state => ({
	position: state.mapReducer.position
});
export default connect(mapStateToProps, bindAction)(MapContainer);

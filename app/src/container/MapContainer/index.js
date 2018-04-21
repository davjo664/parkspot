// @flow
import * as React from 'react';
import {connect} from 'react-redux';
import Map from '../../screens/Map';
import {updateLocation, watchLocation} from './actions';
import {fetchParkspots}  from "../HomeContainer/actions";

export interface Props {
	navigation: any;
	updateLocation: Function;
	watchLocation: Function;
	position: any;
	parkspots: any;
}

export interface State {
}

class MapContainer extends React.Component<Props, State> {
	componentDidMount() {
		updateLocation();
		fetchParkspots();
	}

	render() {
		return (
			<Map
				navigation={this.props.navigation}
				updateLocation={this.props.updateLocation}
				watchLocation={this.props.watchLocation}
				position={this.props.position}
				parkspots={this.props.parkspots}
			/>
		);
	}
}

function bindAction(dispatch) {
	return {
		updateLocation: () => dispatch(updateLocation()),
		watchLocation: () => dispatch(watchLocation()),
		fetchParkspots: () => dispatch(fetchParkspots()),
	};
}

const mapStateToProps = state => ({
	position: state.mapReducer.position,
	parkspots: state.homeReducer.parkspots,
});
export default connect(mapStateToProps, bindAction)(MapContainer);

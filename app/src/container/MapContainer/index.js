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
	fetchParkspots: Function;
	position: any;
	initialRegion: any;
	parkspots: any;
}

export interface State {
}

class MapContainer extends React.Component<Props, State> {
	componentDidMount() {
		fetchParkspots();
	}

	render() {
		return (
			<Map
				navigation={this.props.navigation}
				updateLocation={this.props.updateLocation}
				watchLocation={this.props.watchLocation}
				fetchParkspots={this.props.fetchParkspots}
				position={this.props.position}
				initialRegion={this.props.initialRegion}
				parkspots={this.props.parkspots}
			/>
		);
	}
}

function bindAction(dispatch) {
	return {
		fetchParkspots: () => dispatch(fetchParkspots()),
		updateLocation: () => dispatch(updateLocation()),
		watchLocation: () => dispatch(watchLocation()),
	};
}

const mapStateToProps = state => ({
	parkspots: state.mapReducer.parkspots,
	position: state.mapReducer.position,
	initialRegion: state.mapReducer.initialRegion,
});
export default connect(mapStateToProps, bindAction)(MapContainer);

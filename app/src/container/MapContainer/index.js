// @flow
import * as React from 'react';
import {connect} from 'react-redux';
import Map from '../../screens/Map';
import {updateLocation, fetchParkspots} from './actions';

export interface Props {
    navigation: any;
    updateLocation: Function;
    fetchParkspots: Function;
    parkspots: any;
    userPosition: any;
}

export interface State {
}

class MapContainer extends React.Component<Props, State> {
    render() {
        return (
            <Map
                navigation={this.props.navigation}
                updateLocation={this.props.updateLocation}
                fetchParkspots={this.props.fetchParkspots}
                parkspots={this.props.parkspots}
                userPosition={this.props.userPosition}
            />
        );
    }
}

function bindAction(dispatch) {
    return {
        fetchParkspots: (latitude: ?number, longitude: ?number, distance: ?number) => {
            dispatch(fetchParkspots(latitude, longitude, distance))
        },
        updateLocation: () => dispatch(updateLocation()),
    };
}

const mapStateToProps = state => ({
    parkspots: state.mapReducer.parkspots,
    userPosition: state.mapReducer.userPosition,
});
export default connect(mapStateToProps, bindAction)(MapContainer);

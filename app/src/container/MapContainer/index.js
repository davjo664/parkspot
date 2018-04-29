// @flow
import * as React from 'react';
import {connect} from 'react-redux';
import Map from '../../screens/Map';
import {updateLocation, watchLocation, stopWatchLocation} from './actions';
import {fetchParkspots} from "../HomeContainer/actions";

export interface Props {
    navigation: any;
    updateLocation: Function;
    watchLocation: Function;
    stopWatchLocation: Function;
    fetchParkspots: Function;
    parkspots: any;
    userPosition: any;
    watchID: Number;
}

export interface State {
}

class MapContainer extends React.Component<Props, State> {
    componentDidMount() {
        fetchParkspots();
    }

    componentWillUnmount() {
        stopWatchLocation(this.props.watchID);
    }

    render() {
        return (
            <Map
                navigation={this.props.navigation}
                updateLocation={this.props.updateLocation}
                watchLocation={this.props.watchLocation}
                stopWatchLocation={this.props.stopWatchLocation}
                fetchParkspots={this.props.fetchParkspots}
                parkspots={this.props.parkspots}
                userPosition={this.props.userPosition}
            />
        );
    }
}

function bindAction(dispatch) {
    return {
        fetchParkspots: () => dispatch(fetchParkspots()),
        updateLocation: () => dispatch(updateLocation()),
        watchLocation: () => dispatch(watchLocation()),
        stopWatchLocation: () => dispatch(stopWatchLocation()),
    };
}

const mapStateToProps = state => ({
    parkspots: state.mapReducer.parkspots,
    userPosition: state.mapReducer.userPosition,
    watchID: state.mapReducer.watchID,
});
export default connect(mapStateToProps, bindAction)(MapContainer);

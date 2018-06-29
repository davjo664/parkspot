import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {HumanizeHelper} from '../../helper/HumanizeHelper';
import styles from './styles';



export interface Props {
    parkspot: any;
    walkingDirections: any,
    drivingDirections: any,
    destinationName: String,
}

export interface State {

}


export class ParkspotItem extends Component {

    render() {
        const distance = HumanizeHelper.humanizeDistance(this.props.parkspot.dist);
        const walkingdistance = this.props.walkingDirections ? HumanizeHelper.humanizeDistance(this.props.walkingDirections.distance) : null;
        const duration = this.props.drivingDirections ? HumanizeHelper.humanizeDuration(this.props.drivingDirections.duration * 60) : null;
        // const distance = HumanizeHelper.humanizeDistance(this.props.parkspot.dist);
        return (
            <View style={styles.panel} >
                <View style={styles.panelTitelView}>

                    <Text style={styles.panelTitle} numberOfLines={1} ellipsizeMode={'tail'}>Parkspot{this.props.destinationName ? ' near ' + this.props.destinationName : ' near ' + this.props.parkspot.street}</Text>
                    <Text style={styles.panelDistance}> {distance} away</Text>
                </View>

                {duration &&
                    <Text style={styles.panelSubtitle}>
                        {duration}{walkingdistance && <Text> · {walkingdistance} from your destination</Text>}
                    </Text>
                }

                <Text style={styles.panelSubtitle}>
                    {this.props.parkspot.street} {this.props.parkspot.houseNumber}, {this.props.parkspot.city}, {this.props.parkspot.country}
                </Text>
            </View>
        );
    }
}

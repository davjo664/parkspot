import * as React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Container, Card, CardItem, Body, Text, Icon} from 'native-base';

import styles from './styles';

export interface Props {
    parkspot: any;
}

export interface State {

}

class MapCard extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            animationProgress: new Animated.Value(0),
            renderHeight: 0,
        };
    };

    onLayout = event => {
        const {height} = event.nativeEvent.layout;
        this.setState({renderHeight: height});
    };

    showCard = (ms = 1000) => {
        Animated.timing(
            this.state.animationProgress,
            {
                toValue: 1,
                duration: ms,
                useNativeDriver: true,
            }
        ).start();
    };

    hideCard = (ms = 1000) => {
        Animated.timing(
            this.state.animationProgress,
            {
                toValue: 0,
                duration: ms,
                useNativeDriver: true,
            }
        ).start();
    };


    cardWasPressed = () => {
        const currentState = this.state.expanded;
        this.setState({expanded: !currentState});

        if (currentState) {
            this.hideCard(300);
        } else {
            this.showCard(300);
        }
    };

    render() {

        // do not render anything if no parkspot is selected
        if (!this.props.parkspot) {
            return null;
        }

        const cardTransformY = this.state.animationProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.renderHeight * 0.75, 0],
        });
        
        const cardStyle = StyleSheet.flatten([styles.cardItem, {transform: [{translateY: cardTransformY}]}]);

        const description = "[id=" + this.props.parkspot.id + ", lat=" + this.props.parkspot.lat
            + ", lng=" + this.props.parkspot.lng + "]";

        return (
            <Card style={styles.card} onLayout={this.onLayout} pointerEvents={this.state.expanded ? "auto" : "box-none"}>
                <CardItem button onPress={() => {
                    this.cardWasPressed();
                }}
                          style={cardStyle}>
                    <Body>
                    <Text style={styles.title}>
                      Lorem Ipsum (placeholder)
                    </Text>
                    <Container style={styles.icons}>
                        <Icon type='MaterialCommunityIcons' name='parking'
                              style={this.props.parkspot.available ? styles.iconEnabled : styles.iconDisabled}/>
                        <Icon type='FontAwesome' name='wheelchair-alt'
                              style={this.props.parkspot.handicapped ? styles.iconEnabled : styles.iconDisabled}/>
                        <Icon type='MaterialCommunityIcons' name='battery-charging-60'
                              style={this.props.parkspot.electricCharger ? styles.iconEnabled : styles.iconDisabled}/>
                    </Container>
                    <Container style={styles.content}>
                        <Text>
                            {description}
                        </Text>
                    </Container>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}

export default MapCard;

import * as React from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import {Container, Card, CardItem, Body, Text, Icon} from 'native-base';

import styles from './styles';

export interface Props {
    title: string;
    available: boolean;
    handicapped: boolean;
    electricCharger: boolean;
}

export interface State {
    expanded: boolean;
    animationProgress: Number;
    renderHeight: Number;
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
                easing: Easing.inOut,
            }
        );
    };

    hideCard = (ms = 1000) => {
        Animated.timing(
            this.state.animationProgress,
            {
                toValue: 0,
                duration: ms,
                easing: Easing.inOut,
            }
        );
    };


    cardWasPressed = () => {
        const currentState = this.state.expanded;
        this.setState({expanded: !currentState});

        if (currentState) {
            this.hideCard();
        } else {
            this.showCard();
        }
    };

    render() {
        const cardTransformY = this.state.animationProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1000],
        });


        const cardStyle = StyleSheet.flatten([styles.cardItem, {transform: [{translateY: cardTransformY}]}]);


        return (
            <Card style={styles.card} onLayout={this.onLayout}>
                <CardItem button onPress={() => {
                    this.cardWasPressed();
                }}
                          style={cardStyle}>
                    <Body>
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                    <Container style={styles.icons}>
                        <Icon type='MaterialCommunityIcons' name='parking'
                              style={this.props.available ? styles.iconEnabled : styles.iconDisabled}/>
                        <Icon type='FontAwesome' name='wheelchair-alt'
                              style={this.props.handicapped ? styles.iconEnabled : styles.iconDisabled}/>
                        <Icon type='MaterialCommunityIcons' name='battery-charging-60'
                              style={this.props.electricCharger ? styles.iconEnabled : styles.iconDisabled}/>
                    </Container>
                    <Container style={styles.content}>
                        <Text>
                            // Content will live here...
                        </Text>
                    </Container>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}

export default MapCard;

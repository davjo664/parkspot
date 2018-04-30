import * as React from 'react';
import {Container, Card, CardItem, Body, Text, Icon} from 'native-base';

import styles from './styles';

export interface Props {
    title: string;
    available: boolean;
    handicapped: boolean;
    electricCharger: boolean;
}

export interface State {
    expanded: boolean,
}

class MapCard extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
        };
    }

    cardWasPressed = () => {
        const currentState = this.state.expanded;
        this.setState({expanded: !currentState});
    };

    render() {
        return (
            <Card style={styles.card}>
                <CardItem button onPress={() => {
                    this.cardWasPressed();
                }}
                          style={(this.state.expanded ? styles.cardItemShown : styles.cardItemHidden)}>
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
                    <Container>
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

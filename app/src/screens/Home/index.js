import * as React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem,
} from 'native-base';
import { Image } from 'react-native';

import styles from './styles';
export interface Props {
  navigation: any;
  spots: any;
  image: any;
  getSpots: any;
}
export interface State {}
class Home extends React.Component<Props, State> {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Title style={styles.title}>Parkspots</Title>
        </Header>
        <Content>
			<Image style={styles.image} source={this.props.image}/>
          <Button style={styles.button} onPress={() => this.props.getSpots()}>
            <Text>Get Free Spots</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Home;

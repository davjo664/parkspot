import * as React from 'react';
import {
  Container,
  Content,
  Left,
  Body,
  Right,
  Title,
  Header,
  Icon,
  Button,
  List,
  Text,
  Subtitle,
  Item,
  Input,
  SwipeRow,
} from 'native-base';
import Swipeable from 'react-native-swipeable';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';

import styles from './styles';

export interface Props {
  navigation: any;
  addFavourite: Function;
  remFavourite: Function;
  favourites: any;
}
import { ParkspotListItem } from '../../components/ListItems';


export interface State { }

class FavoriteScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  navigateToFavouriteWasPressed(id) {
    //TODO - navigation to selected spot via ID
    console.log(id);
  }

  /*
  addsimplefavourite(){
    //this.props.favourites.unshift(this.props.parkspots[1]);
    this.props.addFavourite(this.props.parkspots[0]);
  }

  remsimplefavourite(){
    this.props.remFavourite(this.props.parkspots[0]);
  }*/



  render() {

    const favourites = this.props.favourites.map(favourite => (

      <Swipeable key={favourite.id}
        rightButtons={[
          <TouchableOpacity
            onPress={() => { this.props.remFavourite(favourite) }}
            style={{ flex: 1, justifyContent: 'center', backgroundColor: 'red' }}>
            <Icon style={{ marginLeft: 30, color: "white" }} name='trash' />
          </TouchableOpacity>
        ]}>
        <ParkspotListItem parkspot={favourite} onPress={() => this.navigateToFavouriteWasPressed(favourite.id.toString())} />
      </Swipeable>
    ));

    return (
      <SafeAreaView style={styles.safeArea}>
        <Container style={styles.container}>
          <Header style={styles.header} searchBar>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" style={{ color: 'black' }} />
              </Button>
            </Left>
            <Body>
              <Button onPress={() => this.props.addFavourite(this.props.parkspots[Math.floor(Math.random() * Math.floor(10))])}>
                <Title style={styles.title}>Favorites </Title>
              </Button>
            </Body>
            <Right />
          </Header>
          <Content >
            <List>
              {favourites}
            </List>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

export default FavoriteScreen;

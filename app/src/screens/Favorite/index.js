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
} from 'native-base';

import { SafeAreaView } from 'react-native';

import styles from './styles';

export interface Props {
  navigation: any;
  addFavourite: Function;
  remFavourite: Function;
  favourites: any;
}
import { ParkspotListItem, Separator } from '../../components/ParkspotListItem'
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
      <ParkspotListItem key={favourite.id} parkspot={favourite} onPress={() => this.navigateToFavouriteWasPressed(favourite.id.toString())} />

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
          {/*<Item style={{ padding: 5 }}>
            <Icon name="search" />
            <Input placeholder="Favorites (not implemented)" />
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Item>*/}
          <Content padder>
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

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
  ListItem,
  Text,
  Subtitle,
  Item,
  Input,
} from 'native-base';

import {TouchableOpacity} from 'react-native';

import styles from './styles';

export interface Props {
  navigation: any;
  addFavourite: Function;
  remFavourite: Function;
  favourites: any;
}

export interface State {}

class FavoriteScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  navigateToFavouriteWasPressed(id){
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
        <ListItem key={favourite.id} onPress={() => this.navigateToFavouriteWasPressed(favourite.id.toString())}>
          <Content>
            <Text style={styles.title}>
              Parkspot {favourite.id.toString()}
            </Text>
            <Button onPress={() => this.props.remFavourite(favourite)} buttonStyle={{

            }}>
              <Icon name="trash"/>
            </Button>
          </Content>
        </ListItem>
    ));

    return (
      <Container style={styles.container}>
        <Header style={styles.header} searchBar>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{ color: 'black' }} />
            </Button>
          </Left>
          <Body>
            <Button onPress={() => this.props.addFavourite(this.props.parkspots[ Math.floor(Math.random() * Math.floor(10))])}>
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
    );
  }
}

export default FavoriteScreen;

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

import { SafeAreaView, FlatList, View } from 'react-native';

import styles from './styles';

import { ListItem, Separator } from '../../components/ListItem';

export interface Props {
  navigation: any;
  addFavourite: Function;
  remFavourite: Function;
  favourites: any;
}

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


  _onPressItem = ({ item }) => {
    this.navigateToFavouriteWasPressed(item);
  }
  _renderItem = ({ item }) => (
    <ListItem
      parkspot={item}
      onPressItem={this._onPressItem}
    // selected={!!this.state.selected.get(item.id)}
    />
  );
  renderSeparator = () => {
    return (
      <Separator />
    );
  };


  _keyExtractor = (item, index) => item.id.toString();
  render() {
    // const favourites = this.props.favourites.map(favourite => (

    //   /* <ListItem key={favourite.id} onPress={() => this.navigateToFavouriteWasPressed(favourite.id.toString())}>
    //     <Content>
    //       <Text style={styles.title}>
    //         Parkspot {favourite.id.toString()}
    //       </Text>
    //       <Button onPress={() => this.props.remFavourite(favourite)} style={styles.trash}>
    //         <Icon name="trash" />
    //       </Button>
    //     </Content>
    //   </ListItem> */
    // ));

    return (
      <SafeAreaView style={styles.safeArea} >
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
          <Content style={styles.contenContainer} >
            <FlatList
              data={this.props.favourites}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

export default FavoriteScreen;

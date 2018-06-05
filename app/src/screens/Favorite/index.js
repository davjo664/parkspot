import * as React from 'react';
import {Body, Button, Container, Content, Header, Icon, Left, List, Right, Title,} from 'native-base';

import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import Swipeable from 'react-native-swipeable';
import {ParkspotListItem} from '../../components/ListItems';

import styles from './styles';

export interface Props {
  navigation: any;
  addFavourite: Function;
  remFavourite: Function;
  favourites: any;
}

export interface State {
}

class FavoriteScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  navigateToFavouriteWasPressed(favoriteParkspot) {
    //navigation to selected spot via passed method from mapscreen then go back
    this.props.navigation.state.params.setSelectedParkspot(favoriteParkspot);
    this.props.navigation.goBack();
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
                     onPress={() => {
                       this.props.remFavourite(favourite);
                     }}
                     style={{flex: 1, justifyContent: 'center', backgroundColor: 'red'}}>
                     <Icon style={{marginLeft: 30, color: 'white'}} name='trash'/>
                   </TouchableOpacity>
                 ]}>
        <ParkspotListItem parkspot={favourite} onPress={() => this.navigateToFavouriteWasPressed(favourite)}/>
      </Swipeable>

    ));

    return (
      <SafeAreaView style={styles.safeArea}>
        <Container style={styles.container}>
          <Header style={styles.header} searchBar>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" style={{color: 'black'}}/>
              </Button>
            </Left>
            <Body>
            <Button
              onPress={() => this.props.addFavourite(this.props.parkspots[Math.floor(Math.random() * Math.floor(10))])}>
              <Title style={styles.title}>Favorites </Title>
            </Button>
            </Body>
            <Right/>
          </Header>
          <Content>
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

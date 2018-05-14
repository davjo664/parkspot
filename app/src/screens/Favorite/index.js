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

import {SafeAreaView} from 'react-native';

import styles from './styles';

export interface Props {
  navigation: any;
}

export interface State {}

class FavoriteScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
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
                <Title>Favorites</Title>
              </Body>
              <Right />
            </Header>
            <Item style={{ padding: 5 }}>
              <Icon name="search" />
              <Input placeholder="Favorites (not implemented)" />
              <Button transparent>
                <Text>Search</Text>
              </Button>
            </Item>

            <Content padder>
              <List>
                <ListItem>
                  <Content>
                    <Text style={styles.title}>
                      Parkspot near Hotel Placeholder
                    </Text>
                    <Text style={styles.title}>ABS Street 25</Text>
                    <Text style={styles.subtext}>
                      5 Spots approx. 10 m away from destination
                    </Text>
                  </Content>
                </ListItem>
                <ListItem>
                  <Content>
                    <Text style={styles.title}>
                      Parkspot near Hotel Placeholder
                    </Text>
                    <Text style={styles.title}>ABS Street 25</Text>
                    <Text style={styles.subtext}>
                      {' '}
                      5 Spots approx. 10 m away from destination
                    </Text>
                  </Content>
                </ListItem>
                <ListItem>
                  <Content>
                    <Text style={styles.title}>
                      Parkspot near Hotel Placeholder
                    </Text>
                    <Text style={styles.title}>ABS Street 25</Text>
                    <Text style={styles.subtext}>
                      {' '}
                      5 Spots approx. 10 m away from destination
                    </Text>
                  </Content>
                </ListItem>
              </List>
            </Content>
          </Container>
        </SafeAreaView>
    );
  }
}

export default FavoriteScreen;

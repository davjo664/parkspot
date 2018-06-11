import {Dimensions, StyleSheet} from 'react-native';

import colors from './../../theme/parkspotColors';


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomContainer: {
    zIndex: 3,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    height: '20%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    display: 'flex',
  },
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '5%',
  },
  buttonsRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: 30,
  },
  searchButtonView: {
    height: 36,
    width: '90%',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
  },
  searchButton: {
    height: 36,
    width: '80%',
    justifyContent: 'center'
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchIcon: {
    width: 14,
    height: 14,
    marginLeft: 5,
    marginRight: 5,
  },
  searchBar: {
    width: 100,
    height: 50,
  },
  versionLabel: {
    alignSelf: 'center',
    width: 50,
    height: 20,
  },
  safeArea: {
    flex: 1,
  },
  cluster: {
    width: 32,
    height: 32,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  clusterText: {
    width: 28,
    height: 28,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.white,
  },
  destinationMarker: {
    width: 22.4,
    height: 29.3,
  },
  destinationCallout: {
    flex: 1,
    width: 150,
  },
  destinationCalloutText: {
    fontSize: 15,
    textAlignVertical: "center",
    textAlign: "center",
  }
});
export default styles;

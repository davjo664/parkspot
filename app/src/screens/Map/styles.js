import {Dimensions, StyleSheet} from 'react-native';

import colors from './../../theme/parkspotColors';


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
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
    height: 150,
    flexDirection: 'column',
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
    marginTop: 10,
  },
  searchButtonView: {
    height: 36,
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
  },
  searchButton: {
    flex: 1
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  textContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 12,
    marginRight: 25,
  },
  deleteButton: {
    width: 14,
    height: 14,
    alignSelf: 'center'
  },
  deleteButtonView: {
    flex: 2,

  },
  deleteButtonTouchable: {
    height: 36,
    justifyContent: 'center'
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
  pin: {
    width: 32,
    height: 32,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinShadow: {
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 1
  },
  pinText: {
    fontSize: 24,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.white,
  },
  destinationPin: {
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
  },
  closestItemCard: {
    width: '100%',
    height: 75,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginBottom: 11,
    paddingLeft: 9
  },
  closesItemContainer: {
    position: 'absolute',
    right: 16,
    left: 16,
    bottom: 150,
    zIndex: 2,
    marginBottom: -11,

  }
});
export default styles;

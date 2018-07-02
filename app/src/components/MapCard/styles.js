import {Dimensions, StyleSheet} from 'react-native';

import colors from '../../theme/parkspotColors';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75
};

const cardPadding = 20;
const cardWidth = Screen.width - 2 * cardPadding;

const streetViewHeight = 103;

const styles = StyleSheet.create({
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
  },
  interactable: {
    zIndex: 10,
  },
  panel: {
    height: Screen.height + 300,
    paddingTop: 10,
    paddingHorizontal: cardPadding,
    backgroundColor: 'white',
    borderRadius: 14,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    // calculating width according to zeplin specification
    width: ((30 / (30 + 174 + 171)) * cardWidth) - 2,
    height: 1,
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.gray,
    borderRadius: 1,
    marginBottom: 10,
  },
  panelTitle: {
    height: 20,
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.41,
    color: colors.blackThree,
  },
  panelDistance: {
    height: 14,
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.41,
    color: colors.steel,
  },
  panelSubtitle: {
    marginTop: 3,
    height: 14,
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.41,
    color: colors.steel,
  },
  iconsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  iconContainer: {
    height: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  icon: {
    padding: 2,
  },
  iconText: {
    marginTop: 5,
    paddingLeft: 10,
    height: 14,
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.41,
    color: colors.steel,
  },
  streetViewContainer: {
    height: streetViewHeight,
  },
  streetView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: streetViewHeight,
  },
  navigationButton: {
    // calculating width according to zeplin specification
    width: ((221 / (105 + 221)) * cardWidth),
    position: 'absolute',
    right: 0,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  navigationButtonFullWidth: {
    width: (cardWidth),
  },
  favoriteButton: {
    // calculating width according to zeplin specification
    width: ((105 / (105 + 221)) * cardWidth) - 15,
    position: 'absolute',
    left: 0,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  buttonShadow: {
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  buttonImage: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 44,
  },
  panelButtonTitle: {
    width: 88,
    height: 25,
    fontSize: 21,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.51,
    textAlign: 'right',
    color: colors.white,
  },
});

export default styles;

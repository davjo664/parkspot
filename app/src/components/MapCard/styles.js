import {Dimensions, StyleSheet} from 'react-native';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75
};

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
    zIndex: 10
  },
  panel: {
    height: Screen.height + 300,
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    color: 'black',
    fontWeight: '300',
    fontSize: 22,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '300',
    height: 30,
    marginBottom: 10,
  },
  panelDistance: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '300',
  },
  panelGradient: {},
  panelButton: {
    flex: 1,
    width: 221,
    position:'absolute',
    right: 0,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  buttonShadow: {
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  panelImage: {
    flexGrow:1,
    alignItems: 'center',
    justifyContent:'center',
    width: '100%',
    height: 44,
  },
  panelButtonTitle: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'normal',
    color: 'white',
    letterSpacing: -0.51,
  },
  moreContent: {
    marginTop: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  iconContainer: {
    marginTop: 52,
    height: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    padding: 2,
    fontSize: 26,
    color: '#3762d2',
  },
  iconText: {
    padding: 2,
    fontSize: 16,
    color: '#333333',
  },
  streetViewContainer: {
    marginTop: 10,
    flex: 1
  },
  streetView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
  },
});

export default styles;

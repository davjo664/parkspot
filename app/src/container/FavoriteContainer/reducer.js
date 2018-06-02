import {ADD_FAVOURITE, REM_FAVOURITE} from './actions';

const initialState = {
  favourites: [],
};

export default function (state: any = initialState, action: Function) {
  switch (action.type) {
    //checks if newFav is element of favourites - if not yet, includes it
    case ADD_FAVOURITE:
      if (state.favourites.includes(action.newFav)) {
        return {
          ...state,
        };
      }
      else {
        return {
          ...state,
          favourites: [...state.favourites, action.newFav]
        };
      }
      ;

    //checks if remFav is element of favourites - if so, removes it
    case REM_FAVOURITE:
      if (state.favourites.includes(action.remFav)) {

        const newFavourites = state.favourites.filter(item => item.id !== action.remFav.id);
        return {
          ...state,
          favourites: [...newFavourites]
        };
      }
      else {
        return {
          ...state,
        };
      }

    default:
      return state;
  }
}


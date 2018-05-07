import { Map } from 'immutable';

import {
  GET_GAME_START,
  GET_GAME_ERROR,
  GET_GAME_SUCCESS,
} from 'actions/game';

const initialState = Map({
  loading: false,
  error: null,
  people: null,
});

const actionsMap = {
  // Async action
  [GET_GAME_START]: (state) => {
    return state.merge(Map({
      loading: true,
      error: null,
      game: null,
    }));
  },
  [GET_GAME_ERROR]: (state, action) => {
    return state.merge(Map({
      loading: false,
      error: action.error.message,
    }));
  },
  [GET_GAME_SUCCESS]: (state, action) => {
    return state.merge(Map({
      loading: false,
      people: action.data,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}

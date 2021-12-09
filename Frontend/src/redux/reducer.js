import * as types from "./actionType";

const intialState = {
  books: [],
  book: {},
  laoding: false,
};

const bookReducers = (state = intialState, action) => {
  switch (action.type) {
    case types.GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false,
      };
    case types.DELETE_BOOK:
    case types.ADD_BOOK:
    case types.UPDATE_BOOK:
      return {
        ...state,
        loading: false,
      };

    case types.GET_SINGLE_BOOK:
      return {
        ...state,
        book: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default bookReducers;

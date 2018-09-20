/*
 src/reducers/simpleReducer.js
*/
export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_BEGIN':
      return {
        ...state,
        getting: true,
        error: null
    }
    case 'GET_SUCCESS':
      return {
        ...state,
        data: action.data,
        getting: false    }
    case 'GET_FAIL':
      return {
        ...state,
        getting: false,
        error: true
    }
    default:
      return state
    }
   }
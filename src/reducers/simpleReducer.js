/*
 src/reducers/simpleReducer.js
*/
export default (state = {}, action) => {
  //console.log('this is action', action)
  switch (action.type) {
    case 'GET_BEGIN':
      return {
        ...state,
        getting: true,
        error: null
    }
    case 'GET_SUCCESS_FIRST':
      return {
        ...state,
        data: [action.data],
        getting: false    
      }
    case 'GET_SUCCESS':
      return {
        ...state,
        data: action.ownProps.concat([action.data]),
        getting: false    
      }
    case 'GET_FAIL':
      return {
        ...state,
        getting: false,
        error: true
    }
    /*case 'GET_PHOTO_BEGIN':
      return {
        ...state,
        getting: true,
        error: null
    }
    case 'GET_PHOTO_SUCCESS':
      return {
        ...state,
        data: action.data,
        getting: false    
      }
    case 'GET_PHOTO_FAIL':
      return {
        ...state,
        getting: false,
        error: true
    }*/
    default:
      return state
    }
   }
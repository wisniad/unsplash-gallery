/*
 src/actions/simpleAction.js
*/
import Unsplash from 'unsplash-js';


const unsplash = new Unsplash({
    applicationId: "79038ad200f81f5b6a2a4260250a29abac6366ceef89ffe4aa17f58ac08a5f5f",
    secret: "dbacbb16ae7c54c81fb959c533d091a89817a0dce0ca7fdecbc8b71aedc5af3a", //e5d5fdcb6731b2d006d12cad61ed1531c19b64d0d6d0e492a6f8747cf066c286
    callbackUrl: "{CALLBACK_URL}"
  });

export const simpleAction = (search) => dispatch => {
  console.log('this is search', search)
    dispatch({
        type: 'GET_BEGIN'
    });
    unsplash.search.photos(search, 1, 20)
      .then(response => response.json())
      .then(
        data => dispatch({type: 'GET_SUCCESS', data})
      ).catch(
        error => dispatch({type: 'GET_FAIL', error})
      )
    
    

};
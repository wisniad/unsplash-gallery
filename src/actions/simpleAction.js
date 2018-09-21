/*
 src/actions/simpleAction.js
*/
import Unsplash from 'unsplash-js';


const unsplash = new Unsplash({
    applicationId: "79038ad200f81f5b6a2a4260250a29abac6366ceef89ffe4aa17f58ac08a5f5f",
    secret: "dbacbb16ae7c54c81fb959c533d091a89817a0dce0ca7fdecbc8b71aedc5af3a" //e5d5fdcb6731b2d006d12cad61ed1531c19b64d0d6d0e492a6f8747cf066c286
  });

export const simpleAction = (search, ownProps) => dispatch => {
  //console.log('this is search', search)
  if(ownProps !== undefined){
    dispatch({
        type: 'GET_BEGIN'
    });
    unsplash.search.photos(search, 1, 20)
      .then(response => response.json())
      .then(
        data => dispatch({type: 'GET_SUCCESS', data, ownProps})
      ).catch(
        error => dispatch({type: 'GET_FAIL', error})
      )
    }
    else{
      dispatch({
        type: 'GET_BEGIN'
    });
    unsplash.search.photos(search, 1, 20)
      .then(response => response.json())
      .then(
        data => dispatch({type: 'GET_SUCCESS_FIRST', data})
      ).catch(
        error => dispatch({type: 'GET_FAIL', error})
      )
    }
};
/*
export const getDownloadData = (ownProps, showData) => dispatch => {
  
  //console.log('own props',ownProps)
  //console.log('show data', showData)
  let data = ownProps[showData].results

  let slicedData = []
  for( let x = 0; x < 3; x++){
    slicedData.push(data[x])
  }
  
  let downloadsInfo = []
  /*slicedData.map( (record) => {
    unsplash.photos.getPhoto(record.id)
      .then(response => response.json())
      .then( (res) =>
        downloadsInfo.push(res.downloads)
      )
  })*/
  /*setTimeout( () => {
    for( let y = 0 ; y < slicedData.length; y++ ){ 
        slicedData[y].downloads = downloadsInfo[y]
      }
      console.log('this iis sliced with download info',slicedData)  
  }, 2000);

  dispatch({
    type: 'GET_PHOTO_BEGIN'
})
slicedData.map( (record) => {
  unsplash.photos.getPhoto(record.id)
    .then(response => response.json())
    .then( (res) =>
      downloadsInfo.push(res.downloads)
    )})
  .then( () => {
    for( let y = 0 ; y < slicedData.length; y++ ){ 
      slicedData[y].downloads = downloadsInfo[y]
    }
    return slicedData;
  })
  .then(
    data => dispatch({type: 'GET_PHOTO_SUCCESS', data})
  ).catch(
    error => dispatch({type: 'GET_PHOTO_FAIL', error})
  )
   
   

};*/
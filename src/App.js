import React, { Component } from 'react';
import './App.css';
import { simpleAction } from './actions/simpleAction'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Modal from 'react-modal';
import {ToastContainer, ToastStore} from 'react-toasts';

Moment.globalFormat = 'DD-MM-YYYY';
Modal.setAppElement('#root')


class App extends Component {

  constructor(props) {
    super(props);
    this.state = 
    {
      search: 'flowers',
      searchHistory: [],
      showData: 0,
      currentSort: 'created_at',
      currentSortDir: 'desc',
      modalIsOpen: false,
      favorites: []
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  };

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }  

  handleChange(event) {
    this.setState({search: event.target.value})
  }

  handleSubmitSearch(event) {

    event.preventDefault();
    let checkArray = isInArray(this.state.searchHistory, this.state.search)

    if(checkArray !== -1) {
      this.setState({showData: checkArray})
    }
    else {
      let getPictures = () => {
        return new Promise( (resolve) => {
          setTimeout( () => {
            resolve('first promise')
            this.props.simpleAction(
              this.state.search, this.props.rootReducer.simpleReducer.data !== null 
              ? this.props.rootReducer.simpleReducer.data 
              : 0);
              this.state.searchHistory.push(this.state.search)  
          }, 100);
        });
      }
      let setView = () => {
        return new Promise( (resolve) => {
          setTimeout( () => {
            let checkArray = isInArray(this.state.searchHistory, this.state.search)
            resolve('second promise')
            if(checkArray !== -1) {
              this.setState({showData: checkArray})
            }
          }, 900);
        });
      }

      (async () => {
        await getPictures()
        await setView()
      })();
   };
  }

  handleClick = (e) => {
    this.setState({showData: e})
  }


  sortAll = (data) => {
    return data.sort((a, b) => {
      let modifier = 1;
      if (this.state.currentSortDir === 'desc') modifier = -1;
      if (a[this.state.currentSort] < b[this.state.currentSort]) return -1 * modifier;
      if (a[this.state.currentSort] > b[this.state.currentSort]) return 1 * modifier;
      return 0;
    })
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.openModal}>Favorite pictures</button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >

          <h2>Favorite pictures</h2>
          <button onClick={this.closeModal}>close</button>
          <div className="cards">

         {
          this.state.favorites.length > 0 
          ? this.state.favorites.map(
                (object, i) =>
                  <div key={i}> 
                    <img src={object.urls.thumb} alt={object.description}/>
                    <p>Created at:
                      {' '}
                      <Moment>
                        {object.created_at}
                      </Moment>
                    </p>
                    {/*<p>Downloads: {object.downloads}</p>*/}
                    <p>Likes: {object.likes}</p>
                  </div> 
                  )
                  : <p>No favorite pictures</p>
                }
          </div>
        </Modal>

        <h1>Unsplash search</h1>
        <h2>Search:</h2>
        <div>
          <form onSubmit={this.handleSubmitSearch}>   
            <input type="text" value={this.state.search} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>

            <select defaultValue="created_at" onChange={(e) => this.setState({ currentSort: e.target.value })}>
              <option value="created_at">Created at</option>
              {/*<option value="download">Downloads count</option>*/}
              <option value="likes">Likes count</option>
            </select>

            <select defaultValue="desc" onChange={(e) => this.setState({ currentSortDir: e.target.value })}>>
              <option value="asc">ASC</option>
              <option value="desc">DESC</option>
            </select>
            {/*<p>App can make 50 requests for pictures</p>
            <button onClick={getDownloadData(this.props.rootReducer.simpleReducer.data, this.state.showData)}>
              Get download data about collection below ( -20 requests)
              </button>*/}
        </div>
        <h2>Search history:</h2>
        <div className="flex-container">
        {
          this.state.searchHistory != null ?
            this.state.searchHistory.map(
              (oldSearch, i) =>
                <button 
                key={i}     
                value={i}
                onClick={(e) => this.handleClick(i)}
                className="flex-item">
                  {oldSearch}
                </button>
              )
              : <p>No data</p>
        } 
        </div>
        
        {
          this.props.rootReducer.simpleReducer.getting === true &&
          <div>Getting data</div>
        }

        {
          this.props.rootReducer.simpleReducer.error === true &&
          <div>Error occured</div>
        }

        <main className="cards">
         { this.props.rootReducer.simpleReducer.data   !== undefined ?
            this.props.rootReducer.simpleReducer.data.length !== null ?
             this.sortAll(this.props.rootReducer.simpleReducer.data[this.state.showData].results)
              .map(
                (object, i) =>
                  <div key={i} > 
                    <img src={object.urls.thumb} alt={object.description}/>
                    <br></br>
                    <button onClick={(e) => {
                      e.preventDefault()
                      this.state.favorites.push(object)
                      ToastStore.success('Picture added to favorites!')
                    }} >
                     Add to favorites</button>
                    
                    <ToastContainer store={ToastStore}/>

                    <div>
                  </div>
                    <p>Created at:
                      {' '}
                      <Moment>
                        {object.created_at}
                      </Moment>
                    </p>
                    <p>Downloads: {object.downloads}</p>
                    <p>Likes: {object.likes}</p>
                  </div>
                  )
              : <p className="flex-item ">What would you like to find?</p>
            : <p className="flex-item">What would you like to find?</p>
          }
        </main>
      </div>
    );
  }
}



const mapStateToProps = (state) => ({
 ...state
})
const mapDispatchToProps = dispatch => ({
  simpleAction: (search, ownProps) => dispatch(simpleAction(search, ownProps))
})

function isInArray(oldSearch, newSearch) {
  return oldSearch.indexOf(newSearch.toLowerCase());
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);
  
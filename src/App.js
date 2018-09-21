import React, { Component } from 'react';
import './App.css';
import { simpleAction } from './actions/simpleAction'
import { connect } from 'react-redux';
import Moment from 'react-moment';

Moment.globalFormat = 'DD-MM-YYYY';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = 
    {
      search: 'home',
      searchHistory: [],
      dataFromApi: [],
      showData: 0,
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  };

  //state = { searchHistory: [] }
  
  handleChange(event) {
    this.setState({search: event.target.value})
  };

  

  handleSubmit(event) {
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
          }, 10);
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
          }, 400);
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

  render() {
    return (
      <div className="App">
        <h1>Unsplash search</h1>
        <h2>Search:</h2>
        <form onSubmit={this.handleSubmit}>   
          <input type="text" value={this.state.search} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
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
              : <p>No daee</p>
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
              this.props.rootReducer.simpleReducer.data[this.state.showData].results.map(
                (object, i) =>
                  <div key={i}> 
                    <img src={object.urls.thumb} alt={object.description}/>
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
              : <p className="center">What would you like to find?</p>
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
  simpleAction: (search, ownProps) => dispatch(simpleAction(search, ownProps)),
  
})

function isInArray(oldSearch, newSearch) {
  return oldSearch.indexOf(newSearch.toLowerCase());
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);
  
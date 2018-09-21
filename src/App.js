import React, { Component } from 'react';
import './App.css';
import { simpleAction } from './actions/simpleAction'
import { connect } from 'react-redux';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = 
    {
      search: '',
      searchHistory: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = { searchHistory: [] }
  handleChange(event) {
    this.setState({search: event.target.value});
  }

  handleSubmit(event) {
    this.props.simpleAction(this.state.search);
    this.state.searchHistory.push(this.state.search)
    event.preventDefault();
  }

  componentDidMount() {
    //this.props.simpleAction(this.state.pageNumber);
  }
  render() {
    return (
      <div className="App">
        {
          this.state.searchHistory != null ?
            this.state.searchHistory.map(
              (oldSearch, i) =>
                <p key={i}> 
                  {oldSearch}
                </p>
                )
            : <p>No data</p>
        }        <form onSubmit={this.handleSubmit}>
          <label>
            Name:         
            <input type="text" value={this.state.search} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {
          console.log('this is props',this.props)
        }
        {
          this.props.rootReducer.simpleReducer.getting === true &&
          <div>Getting data</div>
        }

        {
          this.props.rootReducer.simpleReducer.error === true &&
          <div>Error occured</div>
        }
        
        <main className="cards">
        {
          this.props.rootReducer.simpleReducer.data != null ?
            this.props.rootReducer.simpleReducer.data.results.map(
              (object, i) =>
                <div key={i}> 
                  <img src={object.urls.thumb} alt={object.description}/>
                  <p>Created at: {object.created_at}</p>
                </div>
                )
            : <p>No data</p>
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
  simpleAction: (search) => dispatch(simpleAction(search)),
  
})
export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);
  
import React, { Component } from 'react';
import './App.css';
import { simpleAction } from './actions/simpleAction'
import { connect } from 'react-redux';

class App extends Component {

  state = {
    search: 'dogs'
  }

  componentDidMount() {
    this.props.simpleAction();
  }
  componentWillUpdate() {
  } 
  render() {
    return (
      <div className="App">
        {
          console.log('STATE',this.props)
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
                <img src={object.urls.thumb} key={i} alt={object.description}/>
                )
            : <p>No data</p>
        }
        </main>
      </div>
    );
  }
}

const showState = () => {
  console.log(this.state)
}
const mapStateToProps = (state) => ({
  ...state
})
const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction()),
  
})
export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);

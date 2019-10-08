import React from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import './App.css';
import About from './components/pages/About';
import Header from './components/layout/Header';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      visible: false,
      inputData: '',
    };
  }

  //Input change logic
  handleInputChange = (event) => {
    this.setState({
      inputData: event.target.value
    })
  }
  
  //Form submission logic
  handleSubmit = (event) => {
    event.preventDefault();
    this.componentDidMount();
  }

  //fetching Json data from URL
  componentDidMount() {
    if (this.state.visible){
    var {inputData} = this.state
    var apiURL = "https://vat.erply.com/numbers?vatNumber=";
    fetch(apiURL + inputData)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        })
      });
    } else {
      this.setState({
        isLoaded: true,
      });
    }
  }

  //show results in a list
  showItem() {
    var {items} = this.state;
    if (this.state.visible) { 
      return (
        <div>
          <ul>
          { /* <li>CountryCode: {items.CountryCode}</li>
          <li>VATNumber: {items.VATNumber}</li> */}
          {Object.keys(items).map(key => 
            <li>
              {key}: {items[key]}           
            </li>)} 
          </ul>
        </div>)
    } else {
      return <h4>Click the "Search" button to Fetch Data</h4>
    }  
  }

  render() {
    var {isLoaded} = this.state;
    if(!isLoaded) {
      return <div>Loading data...</div>;
    } else {
      return (
        <Router>
          <div className="results">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <div>
                  <form style={formStyle} onSubmit={this.handleSubmit}>
                      <input type="text" placeholder="Search by ID" pattern=".{3,11}" required title="ID must be between 3 and 11 characters" onChange={this.handleInputChange}>
                      </input>
                      <button style={btnStyle} onClick={() => this.setState({visible: true})}>Search</button>
                  </form>
                  {this.showItem()}
                </div>
              </React.Fragment>
            )}/>
            <Route path="/about" component={About} />
            
          </div>
        </Router>
      );
    }
  }
}

const btnStyle = {
  border: 'none',
  padding: '5px 10px',
  borderRadius: '80%',
  cursor: 'pointer',
  color: '#282c34',
}

const formStyle = {
  textAlign: 'center'
}


export default App;

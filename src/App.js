import React from 'react';
import './App.css';

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
    var {isLoaded, inputData} = this.state;
    if(!isLoaded) {
      return <div>Loading data...</div>;
    } else {
      return (
        <div className="results">
          <h2>VAT number lookup</h2>
          
          <div>
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Search by ID" pattern=".{11}" required title="Please enter a valid ID(11 characters)" onChange={this.handleInputChange}>
                </input>
                <button onClick={() => this.setState({visible: true})}>Search</button>
            </form>
            {this.showItem()}
          </div>
        </div>
      );
    }
  }
}

export default App;

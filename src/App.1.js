import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

// higher order function used for search (function that returns a function)
// function takes in searchTerm and returns another function
function isSearched(searchTerm) {
  return function(item) {
    // condition that returns true or false
    // match the title property from the 'list' to the searchTerm passed into the function
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
}

class App extends Component {
  // state uses short-hand since key and value are the same
  state = {
    list,
    searchTerm: ''
  };

  onDismiss = id => {
    // filter out captured item id and create a new list
    const newList = this.state.list.filter(item => {
      return item.objectID !== id;
    });

    // set new list in state
    // setState will trigger page render and new list will provide page data
    this.setState({
      list: newList
    });

    // end onDismiss
  };

  /*
     form input change function
     components are static and must be re-rendered to allow and display input
     function takes in event.  this function runs on every keystroke.
  */
  onSearchChange = event => {
    // set state based on inpute which re-renders form and transforms the characters to uppercase just for fun
    this.setState({
      searchTerm: event.target.value.toUpperCase()
    });
  };

  render() {
    // destructure state for readability in code functions
    const { searchTerm, list } = this.state;

    return (
      <div className="App">
        {/* search input form */}
        <form>
          {/* onChange synthetic event that allows for form to accept input */}
          <input
            type="text"
            /*
              setting 'value' creates a controlled component and sets React's state as the single source of truth, overriding
              the html form's inherent internal state.  Note that state was destructured so I may simply use 'searchTerm'
              instead of this.state...
            */
            value={searchTerm}
            onChange={this.onSearchChange}
          />
        </form>
        {/* 
          map over current list filtering the item entered in the input;
          calls the isSearched HOF and passes in the searchTerm from state;
          when the pattern matches, the item will stay in the list.  All items
          not matching the pattern will be removed from the list (if present);
          recall that 'filter' creates a new array with items that 'pass' the test, if no
          elements pass the test, an empty array is passed back
        */}
        {list.filter(isSearched(searchTerm)).map(item => (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span> {item.author} </span>
            <span> {item.comments} </span>
            <span> {item.points} </span>
            <span>
              <button
                // arrow function prevents onDismiss from executing immediately.
                // arrow wrapper allows the function to be passed to the event handler.
                onClick={() => this.onDismiss(item.objectID)}
                type="button"
              >
                Dissmiss
              </button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

// array of objects
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

//
// ─── #1 START APP COMPONENT ────────────────────────────────────────────────────────
//

class App extends Component {
  // local state uses short-hand since key and value are the same
  state = {
    list,
    searchTerm: ''
  };

  // local function that takes an 'id' as input and removes it from state
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

    // end onDismiss function
  };

  /*
     form input change function
     components are static and must be re-rendered to allow and display input
     function takes in keystroke event.  this function runs on every keystroke.
  */
  onSearchChange = event => {
    // set state based on inpute which re-renders form and transforms the characters to uppercase just for fun
    this.setState({
      // update the textbox as user types in search critera
      searchTerm: event.target.value.toUpperCase()
    });

    // end onSearchChange function
  };

  // class render function
  render() {
    // destructure local state for readability in function calls
    const { searchTerm, list } = this.state;

    // create UI
    return (
      <div className="page">
        {/* pass props to both Search and Table */}
        <div className="interactions">
          <Search
            /*
              setting the 'value' property of the Search component creates a controlled component and sets React's state as the 
              single source of truth, overriding the html form's inherent internal state.  Note that state was 
              destructured so I may simply use 'searchTerm' instead of this.state...

              Note: the text 'Search' is passed to the component (wrapped in the Search tags) and is handled by this.props.children
              in the Search component
            */
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
          </Search>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

//
// ──────────────────────────────────────────────────────── END APP COMPONENT ─────
//

//
// ─── #2 START SEARCH COMPONENT ───────────────────────────────────────────────────────────
//

function Search(props) {
  // functional components do not manipulate state
  // functional components take in props and return jsx
  // functional components do not have access to 'this' object
  // functional components do not have any lifecycle methods aside from render() which is implied
  // 'children' prop is used pass elements from above that are unknown to the component itself

  const { value, onChange, children } = props;
  return (
    <form>
      {/* same as using 'this.props.children' but was destructured above */}
      {children}
      <input
        type="text"
        value={value}
        onChange={onChange}
        style={{ marginLeft: '10px' }}
      />
    </form>
  );
}

//
// ───────────────────────────────────────────────────── END SEARCH COMPONENT ─────
//

//
// ─── #3 START TABLE COMPONENT ──────────────────────────────────────────────────────
//

/*
  OPTIONAL REFACTORING OF FUNCTIONAL COMPONENTS

  can optionally destructure props directly in function call vs passing 'props' and destructuring in the function body
  further, we can make the functional component more concise by removing the key word 'function' and adding an arrow function.
  arrow functions have an implicit return thus the 'return ( )' can be omitted from the code
  this too is optional :)
*/
const Table = ({ list, pattern, onDismiss }) => (
  <div className="table">
    {list.filter(isSearched(pattern)).map(item => (
      <div key={item.objectID} className="table-row">
        {console.log('item is', item.title)}
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}> Author: {item.author}: </span>
        <span style={{ width: '10%' }}> comments: {item.num_comments} </span>
        <span style={{ width: '10%' }}> points: {item.points}: </span>
        <span style={{ width: '10%' }}>
          {/* using reusable Button component, triggers onDismiss function */}
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>
);

//
// ────────────────────────────────────────────────────────────── END TABLE COMPONENT ─────
//

//
// ─── #4 START BUTTON COMPONENT ─────────────────────────────────────────────────────
//
// Reusable Button Component with optional refactoring for concise code
const Button = ({ onClick, className = '', children }) => (
  /* 
      destructure props passed from parent
      'children' allows for a placeholder to account for anything passed as props that cannot be anticipated
      thus the component is reusable
      note: className has a default value of 'nothing' in-case no classname is passed in with props
    */
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);
//
// ───────────────────────────────────────────────────── END BUTTON COMPONENT ─────
//

export default App;

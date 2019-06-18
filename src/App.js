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

//
// ─── START APP COMPONENT ────────────────────────────────────────────────────────
//

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
        {/* pass props to both Search and Table */}
        <Search
          /*
            setting 'value' creates a controlled component and sets React's state as the single source of truth, overriding
            the html form's inherent internal state.  Note that state was destructured so I may simply use 'searchTerm'
            instead of this.state...

            Note: the text 'Search' is passed to the component (wrapped in the Search tags) and is handled by this.props.children
            in the Search component

          */
          value={searchTerm}
          onChange={this.onSearchChange}
        >
          Search
        </Search>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

//
// ──────────────────────────────────────────────────────── END APP COMPONENT ─────
//

//
// ─── START SEARCH COMPONENT ───────────────────────────────────────────────────────────
//

class Search extends Component {
  // 'children' prop is used pass elements from above that are unknown to the component itself
  render() {
    const { value, onChange, children } = this.props;
    return (
      <form>
        {/* same as using 'this.props.children' but was destructured above */}
        {children}
        <input type="text" value={value} onChange={onChange} />
      </form>
    );
  }
}

//
// ───────────────────────────────────────────────────── END SEARCH COMPONENT ─────
//

//
// ─── START TABLE COMPONENT ──────────────────────────────────────────────────────
//

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    console.log(list);
    return (
      <div>
        {list.filter(isSearched(pattern)).map(item => (
          <div key={item.objectID}>
            {console.log('item is', item.title)}
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span> Author: {item.author}: </span>
            <span> comments: {item.num_comments} </span>
            <span> points: {item.points}: </span>
            <span>
              <button onClick={() => onDismiss(item.objectID)} type="button">
                Dismiss
              </button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}
//
// ────────────────────────────────────────────────────────────── END TABLE COMPONENT ─────
//

//
// ─── START BUTTON COMPONENT ─────────────────────────────────────────────────────
//
// Reusable button
class Button extends Component {
  render() {
    const { onClick, className, children } = this.props;
    return (
      <button onClick={onClick} className={className} type="button">
        {children}
      </button>
    );
  }
}

//
// ───────────────────────────────────────────────────── END BUTTON COMPONENT ─────
//

export default App;

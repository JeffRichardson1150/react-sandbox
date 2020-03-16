/*
Figure out how to retrieve Events from the eventful API.  So I can list them and users can select some for their personal list (jar)
*/

import React, { useState, useEffect } from "react";
import NytResults from "./NytResults";
​
const baseURL = "http://eventful.com/json";
// http://eventful.com/json/events?q=music&l=92103&within=10&units=miles
const key = "tQrWMD6FT4Thf7D4";

const testURL = `http://eventful.com/json/events?app_key=${key}&`
const eventCategories = "http://api.eventful.com/json/categories/list?app_key=tQrWMD6FT4Thf7D4"

​
const NytApp = () => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    useEffect(() => {
      if (search) {
        fetchResults();
      }
    }, [pageNumber]);
  //   if (results.length) {
  //     fetchResults()
  //   }
  // }, [pageNumber]
​
  const fetchResults = () => {
    // Builds a url based on your query, and saves the result in a state variable
    let url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${search}`;

    url = startDate ? url + `&begin_date=${startDate}` : url;

    url = endDate ? url + `&end_date=${endDate}` : url;

    console.log(url);
​
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setResults(data.response.docs);
        console.log(data);
      })
      .catch(err => console.log(err));
  };
​
  const handleSubmit = event => {
    // Used on the form submission (which is triggered by the submit button) to call the fetchResults function
    event.preventDefault();
    setPageNumber(0);
    // fetchResults();
  };
​
  const changePageNumber = (event, direction) => {
    // Changes the page number from a form that controls pagination
    // Note: pagination happens in the NytResults component
    event.preventDefault();  // prevent the default form from reloading (behind the scenes, form change will refresh the page - defeats the purpose of REACT)
    if (direction === "down") {
      if (pageNumber > 0) {
        setPageNumber(pageNumber - 1);
        // fetchResults();
      }
    }
    if (direction === "up") {
      setPageNumber(pageNumber + 1);
      // fetchResults();
    }
  };
​
  return (
    <div className="main">
      <div className="mainDiv">
        <form onSubmit={e => handleSubmit(e)}>
          {/* This form handles inputs that decide what Documents are displayed */}
          <span>Enter a single search term (required):</span>
          <input
            type="text"
            name="search"
            onChange={e => {
              setSearch(e.target.value);
              console.log(e.target);
            }}
            required
          />
          <br />
          <span>Enter a start date:</span>
          <input
            type="date"
            name="startDate"
            pattern="[0-9]{8}"
            onChange={e => setStartDate(e.target.value)}
          />
          <br />
          <span>Enter an end date:</span>
          <input
            type="date"
            name="endDate"
            pattern="[0-9]{8}"
            onChange={e => setEndDate(e.target.value)}
          />
          <br />
          <button className="submit">Submit Search</button>
        </form>
        {
          results.length > 0 
            ? (<NytResults results={results} changePageNumber={changePageNumber} />)
            : null
        }
      </div>
    </div>
  );
};
​
export default NytApp;




// *********************** ORIGINAL BASE CODE ************************************
// import React, { useEffect, useState } from "react";
// import "./App.css";

/* 
  - before useEffect was created, React had built in functions known as 'lifecycle' methods
    - React components all have what is known as a 'lifecycle', and the different points during the lifecycle of the component are accessible using these 'lifecycle methods'. 
      - each of these lifecycle methods are called automatically at each point of the components life, and those methods give you control over what happens at the point of invocation of those methods. 

        - the basic lifecycle of a component is: 
          1. creation
          2. mounted
          3. unmounted
          4. destroyed
      
      - with the new version of React, all of the above mentioned lifecycle methods were replaced by useEffect, and useEffect now controls the following lifecycle methods:
        1. componentDidMount()
        2. componentDidUpdate()
        3. componentWillUnmount()

    - upon loading this sandbox, you should see the console.log of 'component mounted'. Once you click the button to update the state and trigger the re-render of the component, you should see the console.log 'unmounting...', followed by another console.log telling you the component has mounted again.
*/

// export default function App() {
//   // set up a state, just so we have a way to re-render the component. Remember that when our state changes the component remounts
//   const [click, setClick] = useState(0);

//   useEffect(() => {
//     // useEffect's get called after every render by default
//     console.log("component mounted");

//     // if you want to implement componentWillUnmount(), return a function from the useEffect and React will call it when unmounting
//     return () => console.log("unmounting...");
//   });

//   return (
//     <div className="App">
//       <button onClick={() => setClick(click + 1)}>Click Me</button>
//       <br />
//       {click}
//     </div>
//   );
// }

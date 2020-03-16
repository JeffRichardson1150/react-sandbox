import React, { useState, useEffect } from "react";


let _oArgs = {
  app_key:"tQrWMD6FT4Thf7D4",
  category: "music",
  q: "Music",
  where: "New York City Metro Area",
  page_size: 25,
  image_sizes: "large,medium",
  sort_order: "popularity",
  within: 5
};

const App = () => {

const [results, setResults] = useState([]);
const [EVDB, setEVDB] = useState(undefined);

useEffect(() => {
  setEVDB(window.EVDB)

  fetchResults()

  // const script = document.createElement("script");

  // script.src = "http://api.eventful.com/js/api"
  // script.async = true;

  // document.body.appendChild(script);
  // console.log(EVDB)

  // fetchResults()
  // return () => {
  //   document.body.removeChild(script);
  // }
})


const fetchResults = () => {
  // Builds a url based on your query, and saves the result in a state variable
  // let url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${search}`;
  // url = startDate ? url + `&begin_date=${startDate}` : url;
  // url = endDate ? url + `&end_date=${endDate}` : url;

  // let url = "https://cors-anywhere.herokuapp.com/http://eventful.com/json/events/search?app_key=tQrWMD6FT4Thf7D4&location=Indianapolis&date=2020-03-11&category=music";


  // fetch(url)
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data)
  //     setResults(data)
  //   })
  //   .catch(err => console.log(err));

  if(EVDB) {
    EVDB.API.call("/events/search", _oArgs, function(oData) {
      console.log(oData)
    })
  } else {
    console.log("no api")
  }
}


    return(
      <div>
    {/* <script src="http://api.eventful.com/js/api" type="javascript"></script> */}
    {console.log(EVDB)}
        Return
      </div>
    )};


  //   function conductSearch() {
  //   console.log("conductSearch")
  //   _oArgs.where = $eventLocation.val() ? $eventLocation.val() : "New York City Metro Area";
  //   _oArgs.q = $eventKeyword.val() ? $eventKeyword.val() : "Music";

  //   let resultJSON="http://api.eventful.com/json/events/search?app_key=tQrWMD6FT4Thf7D4&location=Indianapolis&date=2020-03-11&category=music";
  //   console.log(resultJSON)
  //   EVDB.API.call("/events/search", _oArgs, function(oData) {
  //     console.log(oData);
  //     // $content.html("");
  //     if (oData.events) {
  //       receiveEvents(oData.events.event);
  //       console.log(oData.events.event)
  //     } else {
  //       // $('<h2> No ' + _oArgs.q + ' Events in/near ' + _oArgs.where +'</h2>').appendTo($content);
  //       console.log("no events")
  //     }
  //   });
  // }

// conductSearch();



export default App;
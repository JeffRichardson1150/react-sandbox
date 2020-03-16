import React, { useState, useEffect } from "react";

// Need to put the following line in index.html.  We put it in the head after the <meta>s
//     <script type="text/javascript" src="http://api.eventful.com/js/api"></script>


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
  
})


const fetchResults = () => {
  if(EVDB) {
    EVDB.API.call("/events/search", _oArgs, function(oData) {
    })
  } else {
  }
}

    return(
      <div>
        Return
      </div>
    )};

export default App;

<script type="text/javascript" src="http://api.eventful.com/js/api"></script>

let oArgs = {
    app_key: "tQrWMD6FT4Thf7D4" ,
    id: "20218701",
    page_size: 25 ,
};

EVDB.API.call("/events/get", oArgs, function(oData) {
alert("your myObject is " + JSON.stringify(oData) );
});


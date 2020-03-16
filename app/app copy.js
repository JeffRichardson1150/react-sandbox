 function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
var $eventLocation = $("#event-location");
var $eventKeyword = $("#event-keyword");
var $content = $("#content");
var _player;

var _oArgs = {
  app_key:"tQrWMD6FT4Thf7D4",
  category: "music",
  q: "Music",
  where: "New York City Metro Area",
  page_size: 25,
  image_sizes: "large,medium",
  sort_order: "popularity",
  within: 5
};

var _eventLocation;

$("#event-search").submit(function(e) {
  e.preventDefault();

  conductSearch();
});

function conductSearch() {
  _oArgs.where = $eventLocation.val() ? $eventLocation.val() : "New York City Metro Area";
  _oArgs.q = $eventKeyword.val() ? $eventKeyword.val() : "Music";

  EVDB.API.call("/events/search", _oArgs, function(oData) {
    $content.html("");
    if (oData.events) {
      receiveEvents(oData.events.event);
    } else {
      $('<h2> No ' + _oArgs.q + ' Events in/near ' + _oArgs.where +'</h2>').appendTo($content);
    }
  });
}

function receiveEvents(events) {
  $content.html("");
  $('<h2>' + _oArgs.q + ' Events in/near ' + _oArgs.where +'</h2>').appendTo($content);
  var $ul = $('<ul/>').appendTo($content);

  events.forEach(function(event){
    var $li = $('<li class="event-item"/>').appendTo($ul);
    var event_img = event.image ? event.image.medium.url : "http://s1.evcdn.com/images/block250/fallback/event/categories/music/music_default_1.jpg";
    var eventDate = new Date(event.start_time);

    $.get("tpl/item.html", function(data) {
      $li.prepend(tplawesome(data, [{
        event_url: event.url,
        image_url: event_img,
        title: event.title,
        date: formatDate(eventDate),
        day: formatDay(eventDate),
        time: formatAMPM(eventDate),
        venue_name: event.venue_name,
        address: event.venue_address,
        city: event.city_name,
        state: event.region_abbr,
        zip: event.postal_code || "",
      }]));
    });

    var $videoDiv = $('<div class="video-div"/>').appendTo($li);
    $('<div/>', {
      class: 'list-hider',
      click: function(e) {
        $list = $(this).next();
        var height;
        var buttonText;
        if ($list.css("maxHeight") === '225px') {
          height = 0;
          buttonText = '[+] Videos';
        } else {
          height = '225px';
          buttonText = '[−] Videos';
        }
        $list.css("maxHeight", height);
        $(this).html(buttonText);
      },
      text: '[+] Videos'
    }).appendTo($videoDiv);

    var $videoList = $('<ul class="video-list"/>').appendTo($videoDiv);

    if (event.performers) {
      if (event.performers.performer.name) {
        findVideos(event.performers.performer.name, $videoList);
      } else {
        event.performers.performer.forEach(function(performer) {
          findVideos(performer.name, $videoList);
        });
      }
    } else {
      findVideos(event.title + ' performance ny', $videoList);
    }
  });
}

function formatDate(date) {
  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[date.getMonth()] + " " +
         date.getDate() + ", " +
         date.getFullYear();
}

function formatDay(date) {
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][date.getDay()];
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function findVideos(artist, dom) {
  var youtubeParameters = {
		part: 'snippet',
    type: 'video',
		q: artist + ' music',
    order: 'relevance',
    videoEmbeddable: 'true',
		key: 'AIzaSyAv6LPQ7MCn_T83TIN7YcDA1wd9l9I4baU',
		maxResults: '5'
	};

	$.ajax({
		type: "GET",
		url: 'https://www.googleapis.com/youtube/v3/search/',
		cache: false,
		data: youtubeParameters,
    success: function (data) {
      data.items.forEach(function(item) {
        videoPreview(item, dom);
      });
    }
	});
}

function videoPreview(item, dom) {
  var handleVideo = function () {
    if (_player) {
      _player.loadVideoById(item.id.videoId);
    } else {
      _player = new YT.Player('ytplayer', {
        height: 220,
        width: 350,
        videoId: item.id.videoId,
        playerVars: {
          autoplay: 1
        }
      });
    }
  };

  var $videoItem = $('<li/>', {
    class: 'video-item',
    click: handleVideo
  }).appendTo(dom);

  $('<img/>', {
    src: item.snippet.thumbnails.default.url
  }).prependTo($videoItem);

  $('<span>' + item.snippet.title +'</span>').appendTo($videoItem);
  $('<div class="play-button">Play</div>').appendTo($videoItem);
}

conductSearch();
}); // end document loaded
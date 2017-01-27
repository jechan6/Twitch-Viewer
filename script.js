function channelInfo() {
  var streamers = ["syndicate", "riotgames", "esl_csgo", "nightblue3", "summit1g", "imaqtpie", "lirik", "sodapoppin", "captainsparklez", "tsm_bjergsen"];

  function getStreams(name) {
    $.ajax({
      url: "https://wind-bow.gomix.me/twitch-api/streams/" + name,
      dataType: 'jsonp',
      success: function(data) {
        if (data.stream !== null) {
          var online = "";
          var streamName = data.stream.channel.name;
          var viewers = data.stream.viewers;
          var game = data.stream.game;
          var status = data.stream.channel.status;

          online = "<br><a href=" + data.stream.channel.url + " target='_blank' style=\"text-decoration:none\">" +"<div id='name'>" + streamName + "</a>" + "    " + viewers + " viewers";

          online += "<br><p>" + game + ": " + status + "</p></div>";

          $("#online").append(online);
        } else {
          var offline = "";
          offline += "<a href='https://www.twitch.tv/" + name + "'target='blank' style = \"text-decoration:none\">" +"<br><div id='name'>" + name + "</a>";
          offline += "<p><br>Offline" + "</p>";
          $("#offline").append(offline);
        }
      }
    });
  }
  for (var i = 0; i < streamers.length; i++) {
    getStreams(streamers[i]);
  }

}

$(document).ready(function() {
  channelInfo();

  $("#subSearch").submit(function(e) {
    var value2 = document.getElementById('search').value;
    e.preventDefault();
  $('#subSearch').find('input').val('');
    $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + value2 + "?callback=?", function(data) {
      if (data.stream !== null) {
        var streamName = data.stream.channel.name;
        var viewers = data.stream.viewers;
        var game = data.stream.game;
        var status = data.stream.channel.status;
        var html = "<br><a href=" + data.stream.channel.url + " target='_blank' style=\"text-decoration:none\">" + streamName + "</a>" + "    " + viewers + " viewers";

        html += "<br><p>" + game + ": " + status + "</p>";
        $("#results").html(html);
      } else {
        var text = "<br><a href='https://www.twitch.tv/" + "'target='_blank' style=\"text-decoration:none\">" + value2 +
          "</a>";
        text += "<br><p> Offline </p>";

        $("#results").html(text);
      }
    });

  });

});

$(".nav button").click(function() {
  var $this = $(this);
  var atr = $this.attr('rel');
  if (atr == "all") {
    $("#online").addClass('active').show();
    $("#offline").addClass('active').show();
  } else {
    var $id = $('#' + atr);
    $id.addClass('active').show();
    $id.siblings(".selected").removeClass('active').hide();
  }
});
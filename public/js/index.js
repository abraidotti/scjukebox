(function(ENV) {
  const client_id = ENV.client_id;

  // info bits
  const SCartist = document.querySelector('#sc-artist');
  const SCartistURL = document.querySelector('#sc-artist-url');
  const SCsongTitle = document.querySelector('#sc-song-title');
  const SCsongURL = document.querySelector('#sc-song-url');
  const SCdescription = document.querySelector('#sc-description');
  const SCgenre = document.querySelector('#sc-genre');
  const SCcreated = document.querySelector('#sc-created');
  const SCartwork = document.querySelector('#sc-artwork');

  // controls
  const SCplay = document.querySelector('#sc-play');
  const SCpause = document.querySelector('#sc-pause');
  const SCseekBack = document.querySelector('#sc-seek-back');
  const SCseekForward = document.querySelector('#sc-seek-forward');
  const SCvolDown = document.querySelector('#sc-vol-down');
  const SCvolUp = document.querySelector('#sc-vol-up');
  const SCreload = document.querySelector('#sc-reload');

  // initialize client
  SC.initialize({
    client_id: client_id
  });

  // query for random artist and grab song
  const randomNum = Math.ceil(Math.random() * 10000);
  SC.get('/tracks/', {
    q: randomNum
  }).then(function(tracks) {

    // grab first song
    const SCsong = tracks[0];
    console.log("Artist: " + SCsong.user.username);
    console.log("Song: " + SCsong.title);

    //stream the song
    SC.stream('/tracks/' + SCsong.id).then(function(player) {

      // grab and set the track's art and information
      SCartist.innerHTML = 'Artist: ' + SCsong.user.username;
      SCartistURL.setAttribute('href', ('http://soundcloud.com/' + SCsong.user.permalink));
      SCartistURL.innerHTML = 'Artist URL: http://soundcloud.com/' + SCsong.user.permalink;
      SCsongTitle.innerHTML = 'Song Title: ' + SCsong.title;
      SCsongURL.setAttribute('href', SCsong.permalink_url);
      SCsongURL.innerHTML = 'Song URL: ' + SCsong.permalink_url;
      SCdescription.innerHTML = 'Description: ' + SCsong.description;
      SCgenre.innerHTML = 'Genre: ' + SCsong.genre;
      SCcreated.innerHTML = 'Released: ' + SCsong.created_at;
      SCartwork.setAttribute('src', SCsong.artwork_url.replace('large', 't250x250'));

      // add button functionality
      SCplay.addEventListener('click', function() {
        player.play();
        console.log("play");
      });

      SCpause.addEventListener('click', function() {
        player.pause();
        console.log("pause");
      });

      SCseekBack.addEventListener('click', function() {
        let currentTime = player.currentTime();
        let seekBack = currentTime - 15000;
        player.seek(seekBack);
        console.log("seek back: " + seekBack);
      });

      SCseekForward.addEventListener('click', function() {
        let currentTime = player.currentTime();
        let seekForward = currentTime + 15000;
        player.seek(seekForward);
        console.log("seek forward: " + seekForward);
      });

      SCreload.addEventListener('click', function() {
        window.location.reload(true);
      });

      SCvolUp.addEventListener('click', function() {
        console.log("vol up")
        let volUp = player.getVolume() + 0.10;;
        if (player.getVolume() <= 0.99) {
          player.setVolume(volUp);
        } else {
          player.setVolume(1);
        }
      });

      SCvolDown.addEventListener('click', function() {
        console.log("vol down")
        let volDown = player.getVolume() - 0.10;
        if (player.getVolume() >= 0.01) {
          player.setVolume(volDown);
        } else {
          player.setVolume(0);
        }

      });

    }); // end tracks function

  }).catch();


})(ENV)

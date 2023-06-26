
function hideVideos() {
  // get all the rows of videos
  let videoRows = document.getElementsByTagName('ytd-browse');

  // hide each row
  for (let row of videoRows) {
    row.style.display = 'none';
  }
}

fetch(chrome.runtime.getURL('times.json'))
  .then(response => response.json())
  .then(times => {
    let now = new Date();
    let day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
  
    // Calculate the current time as minutes past midnight
    let currentTime = now.getHours() * 60 + now.getMinutes();
  
    if (currentTime >= times[day].from && currentTime <= times[day].to) {
      // call hideVideos now and every 5 seconds
      hideVideos();
      setInterval(hideVideos, 5000);
    }
  });


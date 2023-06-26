// popup.js

window.onload = function() {
    // When the popup is loaded, get the saved settings and populate the fields
    chrome.storage.local.get('times', function(data) {
      let times = data.times;
      
      ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].forEach(function(day) {
        let dayFrom = document.getElementById(day + 'From');
        let dayTo = document.getElementById(day + 'To');
        
        if (times && times[day]) {
          // If there are saved times for this day, convert them back to HH:MM format
          let fromHours = Math.floor(times[day].from / 60);
          let fromMinutes = times[day].from % 60;
          let toHours = Math.floor(times[day].to / 60);
          let toMinutes = times[day].to % 60;
  
          dayFrom.value = (fromHours < 10 ? '0' : '') + fromHours + ':' + (fromMinutes < 10 ? '0' : '') + fromMinutes;
          dayTo.value = (toHours < 10 ? '0' : '') + toHours + ':' + (toMinutes < 10 ? '0' : '') + toMinutes;
        } else {
          // If there are no saved times for this day, set the fields to default values
          dayFrom.value = '09:00';
          dayTo.value = '17:00';
        }
      });
    });
  };
  
  document.getElementById('timeForm').addEventListener('submit', function(e) {
    // Prevent the form from submitting normally
    e.preventDefault();
  
    let times = {};
  
    // Get the times for each day of the week
    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].forEach(function(day) {
      let from = document.getElementById(day + 'From').value;
      let to = document.getElementById(day + 'To').value;
  
      // Convert the time from HH:MM to minutes past midnight
      let fromMinutes = parseInt(from.split(':')[0]) * 60 + parseInt(from.split(':')[1]);
      let toMinutes = parseInt(to.split(':')[0]) * 60 + parseInt(to.split(':')[1]);
  
      times[day] = {from: fromMinutes, to: toMinutes};
    });
  
    // Save the times to storage
    chrome.storage.local.set({times});
  });
  
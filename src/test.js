import google from 'googleapis';

import { loadJSON } from './utils/fileUtil';

import { authorize } from './utils/authUtil';

var config = loadJSON('./config/config.json');

var calendar = google.calendar('v3');

const test = (token, client) => {
  calendar.events.list({
    key: config.apiKey,
    auth: client,
    calendarId: 'bucknell.edu_96oaoev8471pg45nd6urbt3ogk@group.calendar.google.com',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, (err, response) => {
    if (err) {
      console.log(`${err.code}: ${err.message}`);
      return;
    }
    var events = response.items;
    if (events.length === 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 10 events:');
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
      }
    }
  });
};

authorize(test);

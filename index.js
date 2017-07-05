import { readFile } from 'fs';

import google from 'googleapis';

import Batchelor from 'batchelor';

import { loadJSON } from './utils/fileUtil';

import { authorize, getToken } from './utils/authUtil';

import { buildEvents } from './utils/eventUtil';

import ProgressBar from 'progress';

var config = loadJSON('./config/config.json');

var calendar = google.calendar('v3');

// Load client secrets from a local file.
readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }

  authorize(JSON.parse(content), setupShifts);
});

/*
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function setupShifts (auth) {
  console.log('Generating events');
  var events = buildEvents(config);
  // console.log(events);
  console.log('Done');

  var total = 0;

  var batch = new Batchelor({
    'uri':'https://www.googleapis.com/batch',
    'method':'POST',
    'auth': {
      'bearer': [auth.credentials]
    },
    'headers': {
      'Content-Type': 'multipart/mixed'
    }
  });

  var bar = new ProgressBar(':bar :percent', { total: events.length });

  // events.forEach((event) => {
  //   calendar.events.insert({
  //     auth: auth,
  //     calendarId: 'primary',
  //     resource: event,
  //   }, function(err, event) {
  //     if (err) {
  //       bar.interrupt(err);
  //       return;
  //     }
  //     bar.tick();
  //   });
  // });

  events.forEach((event) => {
    batch.add({
      'method': 'POST',
      'path': `/calendar/v3/calendars/${config.calendarId}/events`,
      'parameters': {
        'Content-Type': 'application/json;',
        'body': event
      },
      'callback': (response) =>{
        bar.tick();
        if (bar.complete) {
          console.log('\ncomplete\n');
        }
      }
    });
    total += 1;
  });
  batch.run((err, res) => {
    if (err) {
      console.log(`\n${err}`);
    } else {
    }
  });
}

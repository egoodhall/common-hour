import { readFile } from 'fs';

import { loadJSON } from './utils/fileUtil';
import { authorize, getToken } from './utils/authUtil';
import { buildEvents } from './utils/eventUtil';

import google from 'googleapis';
import Batchelor from 'batchelor';
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
  const events = buildEvents(config);
  // console.log(events);
  console.log('Done');

  var total = 0;

  const batch = new Batchelor({
    'uri':'https://www.googleapis.com/batch',
    'method':'POST',
    'auth': {
      'bearer': [auth.credentials.access_token]
    },
    'headers': {
      'Content-Type': 'multipart/mixed'
    }
  });

  const bar = new ProgressBar(':bar :percent', { total: events.length });

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
          console.log('Done');
        }
      }
    });
    total += 1;
  });
  console.log('Sending request');
  batch.run((err, res) => {
    if (err) {
      console.log(`\n${err}`);
    } else {
    }
  });
}

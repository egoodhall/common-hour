import Batchelor from 'batchelor';

import { authorize } from './utils/authUtil';
import { buildEvents } from './utils/eventUtil';

import config from './config/config.json';

const setupShifts = (token) => {
  const events = buildEvents(config);
  const requests = events.map((event) => {
    return {
      'method': 'POST',
      'path': `/calendar/v3/calendars/${config.calendarId}/events`,
      'parameters': {
        'Content-Type': 'application/json;',
        'body': event
      }
    };
  });
  console.log('Done');

  const batch = new Batchelor({
    'uri': 'https://www.googleapis.com/batch',
    'method': 'POST',
    'auth': {
      'bearer': [token.access_token]
    },
    'headers': {
      'Content-Type': 'multipart/mixed'
    }
  });

  batch.add(requests);

  batch.run((err) => {
    if (err) {
      console.log(`STATUS ${err.code}: ${err.message}`);
    }
  });
};

authorize(setupShifts);

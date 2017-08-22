## A script for setting up and editing the hours calendar for the Bucknell MacDonald Commons

To install and execute the script, make sure you follow the Google Calendar API Quickstart instructions for gaining the required permissions for your calendar, then cd to the root of the repository and run:
```bash
npm install
npm run script
```

### config.json should be formatted as follows:
```json
{
  "calendarId": "bucknell.edu_atcquho3ihu86j5i8v7kvm8668@group.calendar.google.com",
  "defaultTitle": "(Student Name)",
  "descriptionKey": "Default Description - Don't modify",
  "timeZone": "US/Eastern",
  "startDate": "2017-07-15",
  "endDate": "2017-07-17",
  "days": [
    { 
      "name": "monday", 
      "firstShift": 7, 
      "defaultShiftDuration": 1,
      "lastShift": 21,
      "lastShiftDuration": 5 
    },
    {
      "name": "tuesday",
      "firstShift": 7, 
      "defaultShiftDuration": 1,
      "lastShift": 21,
      "lastShiftDuration": 5
    },
    {
      "name": "wednesday",
      "firstShift": 7, 
      "defaultShiftDuration": 1,
      "lastShift": 21,
      "lastShiftDuration": 5
    },
    {
      "name": "thursday",
      "firstShift": 7, 
      "defaultShiftDuration": 1,
      "lastShift": 21,
      "lastShiftDuration": 5
    },
    {
      "name": "friday",
      "firstShift": 7, 
      "defaultShiftDuration": 1,
      "lastShift": 21,
      "lastShiftDuration": 3
    },
    {
      "name": "saturday",
      "firstShift": 9, 
      "defaultShiftDuration": 1,
      "lastShift": 21,
      "lastShiftDuration": 3,
      "lastWorker": "Eric"
    },
    {
      "name": "sunday",
      "firstShift": 9, 
      "defaultShiftDuration": 1,
      "lastShift": 21,
      "lastShiftDuration": 5,
      "lastWorker": "Eric"
    }
  ]
}
```
### Useful Links
- Finding your [calendar's id](https://docs.simplecalendar.io/find-google-calendar-id/)
- Follow part 1 of the [Calendar API Quickstart](https://developers.google.com/google-apps/calendar/quickstart/python) to get a client secret (save it as `client_secret.json` in the root of the repository)
- Time zone must be formatted as an [IANA Time Zone Database name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), e.g. "Europe/Zurich"
- `instant_events` will be edited into the calendar on the create run, while `delayed_events` will be put in only when signup is run

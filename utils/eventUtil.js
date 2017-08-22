var moment = require('moment-timezone');

var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

module.exports = {
    buildEvents
};



function buildEvents(config) {
  moment.tz.setDefault("America/New_York");
  var events = [];
  let currentDate;
  let finalDate;
  if (config.startDate && config.endDate) {
    currentDate = moment.tz(config.startDate, config.timeZone);
    finalDate   = moment.tz(config.endDate, config.timeZone).add(1, 'day');
  } else if (config.offsetDate && config.period) {
    const start = moment().add(config.offsetDate, 'day').format('YYYY-MM-DD');
    currentDate = moment.tz(start, config.timeZone);
    finalDate   = moment.tz(start, config.timeZone).add(config.period, 'day');
  } else {
    const start = moment().format('YYYY-MM-DD');
    currentDate = moment.tz(start, config.timeZone);
    finalDate   = moment.tz(start, config.timeZone).add(8, 'day');
  }
  
  while (currentDate < finalDate) {
  
    var dayInfo = config.days.find((day) => day.name === days[currentDate.day()]);
    currentDate.hour(dayInfo.firstShift);
  
    while(currentDate.hour() <= dayInfo.lastShift) {
      const event = buildEvent(currentDate, dayInfo, config);
      if (event.start.dateTime !== event.end.dateTime) {
        events.push(event);
      }
      currentDate.add(1, 'hour');
    }
    currentDate.add(1, 'day');
  }
  return events;
}



function buildEvent(minDate, dayInfo, config) {
  var maxDate = null;

  if (minDate.hour() === dayInfo.lastShift) {
    maxDate = minDate.clone().add(dayInfo.lastShiftDuration, 'hour');
  } else {
    maxDate = minDate.clone().add(dayInfo.defaultShiftDuration, 'hour');
  }
  var event = {
      start: {
        dateTime: minDate.format(),
        timeZone: config.timeZone
      },
      end: {
        dateTime: maxDate.format(),
        timeZone: config.timeZone
      },
      summary: config.defaultTitle,
      description: config.descriptionKey
  };
  if (dayInfo.lastWorker && minDate.hour() === dayInfo.lastShift) {
    event.colorId = 7;
    event.summary = dayInfo.lastWorker;
  }
  
  return event;
};

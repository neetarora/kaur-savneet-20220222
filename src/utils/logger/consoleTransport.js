const Transport = require('winston-transport');

class ConsoleTransport extends Transport {
  static COLORS = {
    RED: 1,
    GREEN: 2,
    YELLOW: 3,
    BLUE: 4,
    PURPLE: 5
  }

  constructor(opts = {}) {
    if (Object.prototype.toString.call(opts) != {}.toString())
      throw new Error('Error in initialising console transport. Was expecting an object.');

    super(opts);

    this.logLevelColors = {
      error: ConsoleTransport.COLORS.RED,
      info: ConsoleTransport.COLORS.GREEN,
      warn: ConsoleTransport.COLORS.YELLOW,
      ...opts.logLevelColors
    };
    this.getTime = (() => {
      let options = {
        timeZone: opts.timezone,
        hour: 'numeric', minute: 'numeric', second: 'numeric',
      };
      let formatter = new Intl.DateTimeFormat([], options);
      return () => formatter.format(new Date());
    })();
  }

  static getColorCodeText(text, color) {
    return `\u001B[3${color};1m${text}\u001B[0m`;
  }

  log(info, callback) {
    setImmediate(() => { this.emit('logged', info); });

    let time = this.getTime();
    let { level, message, error, ...metaData } = info;

    delete metaData.timestamp;

    level = ConsoleTransport.getColorCodeText(`[${level.toUpperCase()}]`, this.logLevelColors[level]);
    message = ConsoleTransport.getColorCodeText(message, ConsoleTransport.COLORS.BLUE);
    time = ConsoleTransport.getColorCodeText(time, ConsoleTransport.COLORS.PURPLE);

    let stringifiedMetaData = Object.keys(metaData).length ? JSON.stringify(metaData, null, 2) : '';

    let params = [time, level, message, stringifiedMetaData];
    if (error) params.push(error);

    console.log(...params);
    callback();
  }
}

module.exports = ConsoleTransport;

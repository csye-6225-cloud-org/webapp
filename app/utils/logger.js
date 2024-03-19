const pino = require('pino');

const fileTransport = pino.transport({
  target: 'pino/file',
  options: { 
    // destination: '/Users/anuraag/Documents/work/sem2/cloud/A06/webapp/webapp.log' 
    destination: '/var/log/webapp.log'
},
});

module.exports = pino(
  {
    level: process.env.PINO_LOG_LEVEL || 'debug',
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      }
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  fileTransport
);

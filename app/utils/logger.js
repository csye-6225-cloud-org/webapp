const pino = require('pino');

const fileTransport = pino.transport({
  target: 'pino/file',
  options: { 
    // destination: '/Users/anuraag/Documents/work/sem2/cloud/A06/webapp/webapp.log' 
    // destination: '/var/log/webapp.log'
    destination: process.env.LOG_PATH == undefined ? '/var/log/webapp.log' : process.env.LOG_PATH
},
});

module.exports = pino(
  {
    level: process.env.PINO_LOG_LEVEL || 'debug',
    formatters: {
      level: (label) => {
        if(label == 'warn'){
          label = 'WARNING';
        }else{
          label = label.toUpperCase();
        }
        return { level: label }
      }
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  fileTransport
);

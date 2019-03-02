var zlib = require('zlib');
var winston = require('winston');
var papertrailTransport = require('winston-papertrail').Papertrail;
var config = require('./env.json');

const logger = new winston.Logger({
  transports: []
});

exports.logger = logger;

logger.add(papertrailTransport, {
  host: config.host,
  port: config.port,
  program: config.program,
  hostname: config.appname,
  flushOnClose: true,
  logFormat: function (level, message) {
    return message;
  }
});

exports.handler = function(input, context) {
    var payload = new Buffer(input.awslogs.data, 'base64');
    zlib.gunzip(payload, function(e, result) {
        if (e) {
            context.fail(e);
        } else {
            result = JSON.parse(result.toString('ascii'));
            var eventLength = result.logEvents.length;
            //logger.info("got event");
            for (var i = 0; i < eventLength; i++) {
                //logger.info("loop:" + i);
                logger.info(result.logEvents[i].message);
            }
            context.succeed();
        }
    });
};
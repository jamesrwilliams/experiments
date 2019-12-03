const helper = function() {
    logger('foo');
};

const logger = function(message) {
    console.log(`Logger: ${message}, thank you.`);
};

module.exports.logger = logger;
module.exports.helper = helper;

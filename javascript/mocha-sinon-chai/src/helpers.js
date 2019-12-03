const helper = function(message) {
    logger(message);
};

const logger = function(message) {
    console.log(`Logger: ${message}, thank you.`);
};

module.exports.logger = logger;
module.exports.helper = helper;

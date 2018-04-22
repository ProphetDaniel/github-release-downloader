var core = require('./core');

/**
 * ghReleaseInfo.js factory function. Creates a new instance of ghReleaseInfo.js
 *
 */
function create (config) {
  // create a new ghReleaseInfo.js instance
  var ghReleaseInfo = core.create(config);
  ghReleaseInfo.create = create;

  // import data types, functions, constants, expression parser, etc.
  ghReleaseInfo['import'](require('./lib'));

  return ghReleaseInfo;
}

// return a new instance of ghReleaseInfo.js
module.exports = create();
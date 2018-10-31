'use strict';
const view = require('../../../views/json');

const action = (actionPayload) => {

  let reply = actionPayload.reply;
  view.single({},reply);
};

module.exports = {
  action: action
};




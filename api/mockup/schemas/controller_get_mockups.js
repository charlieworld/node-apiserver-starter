'use strict';
const error = require('../../../tools/error');
const entry = require('../../../entry/mock/mock');
const view = require('../../../views/json');

const action = async (actionPayload) => {
  const reply = actionPayload.reply
  
  try {
    const results = await entry.get(
      {
        whereStr: ''
      });
    console.log(results);
    view.list(results,reply);
  } catch (err) {
    error.handle(err,reply);
  }
};

module.exports = {
  action: action
};




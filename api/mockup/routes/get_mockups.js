'use strict';
const validator = require('../schemas/validator_mockup');
const controller = require('../schemas/controller_get_mockups');

module.exports = {
  method: 'GET',
  path: '/mockups',
  config: {
    description: 'mockup listing api',
    response: {
      schema: validator.response
    },
    auth:false
  },
  handler: (request, reply) => {
    controller.action({request: request,reply: reply});
  }
};

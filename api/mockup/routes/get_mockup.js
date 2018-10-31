'use strict';
const validator = require('../schemas/validator_mockup');
const controller = require('../schemas/controller_get_mockup');

module.exports = {
  method: 'GET',
  path: '/mockups/{id}',
  config: {
    description: ' get a mockup object',
    tags: ['mockup'],
    validate: {
      params: {
        id: validator.parameters
      }
    },
    response: {
      schema: validator.response
    },
    auth:false
  },
  handler: (request, reply) => {
    controller.action({request: request,reply: reply});
  }
};

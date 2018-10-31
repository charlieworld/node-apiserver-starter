'use strict';

const Joi = require('joi');

const parameters = Joi.alternatives().try(
  Joi.number().integer()
);

const response = Joi.alternatives().try(
  Joi.object().allow(null)
);

const payload = Joi.alternatives().try(
  Joi.object({  
    title: Joi.string().allow(null).optional(),
    name: Joi.string().allow(null).optional(),
    avatar: Joi.object().allow(null).optional(),
    concerned_topics: Joi.array().items(Joi.number().integer()).optional().notes('[1, 2, 3]'),
    status_update: Joi.string().allow(null).optional(),
  })
);

module.exports = {
  parameters:parameters,
  payload:payload,
  response: response
};

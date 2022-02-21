
const BaseJoi = require('@hapi/joi');
const ObjectId = require('mongoose').Types.ObjectId;

let mongoDBObjectID = (joi) => {
  return {
    type: 'string',
    base: joi.string(),
    messages: {
      'string.mongoDBObjectID': '{{#label}} must be a valid ID',
    },
    rules: {
      mongoDBObjectID: {
        validate(value, helpers, args, options) {
          try {
            ObjectId(value);
            return value;
          }
          catch (error) {
            return helpers.error('string.mongoDBObjectID');
          }
        }
      },
    }
  };
};

let date = (joi) => {
  return {
    type: 'string',
    base: joi.string(),
    messages: {
      'string.date': '{{#label}} must be a valid date in the format YYYY-MM-DD'
    },
    rules: {
      date: {
        validate(value, helpers, args, options) {
          // Check whether the given value is of the format YYYY-MM-DD
          if (!/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value))
            return helpers.error('string.date');

          // Check whether a given value is a valid date. 2019-02-30 is not a valid date
          if (new Date(value).getDate() != Number(value.substring(8, 10)))
            return helpers.error('string.date');

          return value;
        }
      },
    }
  };
};

let Joi = BaseJoi.extend(mongoDBObjectID).extend(date);

const docSchema = Joi.object().keys({
  mediaUrl: Joi.string().required(),
  mediaType: Joi.string().required()
});

module.exports = {
  docSchema,
  Joi
};

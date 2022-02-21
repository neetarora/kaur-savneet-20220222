
let schemaTranslator = {
  getters: true,
  transform: function (doc, ret) {
    if (ret._id)
      ret.id = ret._id;
    delete ret.password;
    delete ret.tokens;
    delete ret.emailVerificationCode;
    delete ret.resetPasswordCode;
  }
};

let schemaHelpers = function (schema, options) {
  schema.set('toObject', schemaTranslator);
  schema.set('toString', schemaTranslator);
  schema.set('toJSON', schemaTranslator);

  schema.statics.createObj = function (data) {
    let obj = new this(data);
    return obj.save();
  };

  schema.statics.getById = function (_id) {
    return this.findOne({ _id });
  };
};

module.exports = schemaHelpers;

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const _ = require('underscore');

let FoxModel = {};

// mongoose.Types.ObjectID converts string id to real mongo id
const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim();

const FoxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  age: {
    type: Number,
    min: 0,
    required: true,
  },

  favPhrase: {
    type: String,
    required: true,
    trim: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

FoxSchema.statics.toAPI = doc => ({
  name: doc.name,
  age: doc.age,
  favPhrase: doc.favPhrase,
});

FoxSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return FoxModel.find(search).select('name age favPhrase').exec(callback);
};

FoxModel = mongoose.model('Fox', FoxSchema);

module.exports.FoxModel = FoxModel;
module.exports.FoxSchema = FoxSchema;

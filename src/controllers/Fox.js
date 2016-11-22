const models = require('../models');

const Fox = models.Fox;

const makerPage = (req, res) => {
  Fox.FoxModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), foxes: docs });
  });
};

const makeFox = (req, res) => {
  if (!req.body.name || !req.body.favPhrase) {
    return res.status(400).json({ error: 'Both name and favorite phrase are required' });
  }

  const foxData = {
    name: req.body.name,
    favPhrase: req.body.favPhrase,
    owner: req.session.account._id,
  };

  const newFox = new Fox.FoxModel(foxData);

  return newFox.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ redirect: '/maker' });
  });
};

module.exports.makerPage = makerPage;
module.exports.make = makeFox;

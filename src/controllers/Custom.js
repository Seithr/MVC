const models = require('../models');

const Fox = models.Fox;

const customPage = (req, res) => {
  Fox.FoxModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), foxes: docs });
  });
};

module.exports.custom = customPage;

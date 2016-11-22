const models = require('../models');

const Fox = models.Fox;

const speachFunPage = (req, res) => {
  Fox.FoxModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('speachFun', { csrfToken: req.csrfToken(), foxes: docs });
  });
};

module.exports.speachFun = speachFunPage;

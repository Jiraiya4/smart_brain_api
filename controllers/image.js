const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'd4182f77bcf646ca8e4a37f4115b05ec'
   });

const handleApiCall = (req, res) => {
    app.models.predict('f76196b43bbd45c99b4f3cd8e8b40a8a', req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('unable working api'))
}

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}
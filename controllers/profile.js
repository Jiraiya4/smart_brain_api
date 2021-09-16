const handleProfileGet = (req, res, db) => {
    const {id} = req.params;
    
    db.select('*').from('users').where({id})
        .then(user => {
            if (user.length){
                res.json(user[0]);
            } else {
                res.status(400).send('not found')
            }
        })
        .catch(err => res.status(400).send('errrorrr'))
}

const handleProfileDelete = (req, res, db) => {
    const {email} = req.body;
    db('users').where('email', '=', email)
        .then(user => db('users').where('email', '=', user[0].email).del())
    db('login').where('email', '=', email)
        .then(user => db('login').where('email', '=', user[0].email).del())
}

module.exports = {
    handleProfileGet: handleProfileGet,
    handleProfileDelete: handleProfileDelete
}
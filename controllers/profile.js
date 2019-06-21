const handleProfileGet = (req, res, db) => {
    const {id} = req.params;

    db.select('*').from('users').where({id}) // ES6 Syntax : the same as {id : id} because the key & value has the same name !
    .then(user => {
        if(user.length){
            res.json(user[0]);
        }else{
            res.status(400).json('not found !');
        }
    })
    .catch(err => res.status(400).json('error getting user !'));
};


module.exports = {
    handleProfileGet : handleProfileGet
}
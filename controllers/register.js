const handleRegister = (req, res, db, bcrypt)=>{
    const {name, email, password} = req.body;

    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission !');
    }

    bcrypt.hash(password, 0, function(err, hash) {
        // Store hash in your password DB.
        db.transaction(trx => {
            trx.insert({email, hash})
            .into('login')
            .returning('email')
            .then( loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    name : name,
                    email : loginEmail[0],
                    joined : new Date()
                })
                .then(user => {
                    if(user){
                        res.json(user[0]);
                    }
                })
                .catch(err => res.status(400).json('unable to register'));
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })        
    });        
};


module.exports = {
    handleRegister : handleRegister
}
const handleSignIn =  (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json('incorrect form submission !');
    }

    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        if(data.length){
            bcrypt.compare(password, data[0].hash, 
            (err, response) => {
                if(response){
                    return db.select('*').from('users').where('email', '=', data[0].email)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json('err 1'));
                }else{
                    res.status(400).json('Wrong Credentials !');
                }
            })
            
        }else{
            res.status(400).json('Wrong Credentials !');
        }
    })
    .catch(err => res.status(400).json('err 2'));
};


module.exports = {
    handleSignIn : handleSignIn
}
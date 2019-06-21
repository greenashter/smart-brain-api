const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: '4ed2ea3ede22411b8d192ee68af05fd1'
   });
  

const handleClarifaiCall = (req, res) => {
    // https://samples.clarifai.com/metro-north.jpg
    // app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        if(data){
            res.json(data);
        }
    })
    .catch(err => res.status(400).json('unable to detect face !'));         
}

const handleImage = (req, res, db) => {
    const {id} = req.body;

    db('users').where('id','=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        if(entries.length){
            res.json(entries[0]);
        }else{
            res.status(400).json('not found !');
        }
    })
    .catch(err => res.status(400).json('unable to get entries !'));    
};


module.exports = {
    handleClarifaiCall,
    handleImage
}
const express = require('express')
const MongoCLient = require('mongodb').MongoClient;
const assert = require('assert')
const router = express.Router();
const dbUrl = `mongodb+srv://Johnny:S7iH4qYLIkkBBMxt@cluster0.8oz5m.mongodb.net/locations?retryWrites=true&w=majority`;
const client = new MongoCLient(dbUrl)

const locationsStorage = {
    location: []
}

router.post('/add-location', (req, res, next)=> {
    // const locationId = Math.random();
    client.connect(function(err, client){
        const db = client.db('locations');
        db.collection('user-locations').insertOne({
            address: req.body.address,
            coords: {
                lat: req.body.lat,
                lng: req.body.lng
            }

        }, function(err, r){
            if(err){
                console.log('err',err)
            }else{

                console.log('r',r)
            }
            // assert.equal(null, err)
            // assert.equal(1, r.insertCount)
    
            // db.collection 
            res.json({message:'Added successully', locationId: r.insertId})

        })
    })
    // locationsStorage.location.push({
    //     id : locationId,
    //     address: req.body.address,
    //     coords: {
    //         lat: req.body.lat,
    //         lng: req.body.lng
    //     }
    // })
})


router.get('/location', (req, res, next)=> {

})
router.get('/location/:lid', (req, res, next)=> {
    const locationId = +req.params.lid;
    const location = locationsStorage.location.find(location => location.id === locationId);
    if(!location){
        res.status(400).json({
            message : 'Not found'
        })
    }
    res.json({
        message: "success",
        data: {
            address: location.address , coordinates: location.coords
        } 
    })
})
module.exports = router;
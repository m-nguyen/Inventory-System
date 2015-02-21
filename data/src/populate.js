/////////////////////////////////////////////////////////////
////////////// Populate mongoDB with data ///////////////////
/////////////////////////////////////////////////////////////
var mongoose    = require('mongoose'),
    PartType    = mongoose.model('PartType'),
    Inventory   = mongoose.model('Inventory'),
    data        = require('../partType.json');

var err, el;
function errorHandler(err, el){
    if (err) console.log(err);
    //else console.log(el + ' added to database');
}

/*Remove Inventories collection from mongo*/
/*This is temporarily here to remove inventories from your local machine*/
/*Also changes PartType amount attribute*/
Inventory.count({}, function(err, count) {
    if(count){
        Inventory.remove({}, function(err){
            console.log('Inventory collection removed...');
        });
        PartType.remove({}, function(err) {
            console.log('Changing PartType attribute from amount to quantity...');
        });
    }
});

/*Check if PartType is already populated */
PartType.count({}, function(err, count){
    if (err) return console.log(err);
    if(!count){
        /* For each partType */
        for(var i = 0; i < data.length; i++ ){
            /* Save partType */
            var partType = new PartType(data[i]);
            partType.save(errorHandler(err, partType));
        }
        console.log('MongoDB has been populated...');
    } else {
        console.log('MongoDB is already populated...');
    }
});
/////////////////////////////////////////////////////////////

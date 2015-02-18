/////////////////////////////////////////////////////////////
////////////// Populate mongoDB with data ///////////////////
/////////////////////////////////////////////////////////////
var mongoose    = require('mongoose'),
    PartType    = mongoose.model('PartType'),
    Inventory   = mongoose.model('Inventory'),
    data        = require('../partType.json');

/*Check if PartType is already populated */
var partType_exists = PartType.count({}, function(err, count){
    if (err) console.log(err);
    return count;
});


if(!partType_exists){
    var err, el;

    function errorHandler(err, el){
        if (err) console.log(err);
        //else console.log(el + ' added to database');
    }

    /* For each partType */
    for(var i = 0; i < data.length; i++ ){
        /* Save partType */
        var partType = new PartType(data[i]);
        partType.save(errorHandler(err, partType));
        /* Save partType to inventory */
        var inventory = new Inventory({ Type: partType._id, quantity: 0});
        inventory.save(errorHandler(err, inventory));
    }
    console.log('MongoDB has been populated...');
} else {
    console.log('MongoDB is already populated...');
}
/////////////////////////////////////////////////////////////

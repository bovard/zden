var argv = require('minimist')(process.argv.slice(2));
//console.dir(argv);

var Map = require('./map');

(function() {
    var map = new Map(40, 40, Math.round(Math.random() * 3.5), Math.random() >.5);
    //var map = new Map(40, 80, 0, false);
    var archonLocs = map.placeArchons(4, Math.random() > .5);
    map.placeDens(2, archonLocs);
    map.layBlocks(10, 25.0);
    console.log(map.dumpToXML());
}).call(this);
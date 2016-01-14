var argv = require('minimist')(process.argv.slice(2));

var Map = require('./map');
var random = require('random-name');

function createRandomMap(dir) {
    var i, num, weight, length;
    var width = Math.floor(Math.random() * 50 + 30); // 30 to 80
    var height = Math.floor(Math.random() * 50 + 30); // 30 to 80
    if (Math.random() < .5) {
        width = height;
    }
    var symmetry = Math.floor(Math.random() * 4);
    var mirrored = Math.random() > .5;
    var map = new Map(width, height, symmetry, mirrored);

    var numArchons = Math.ceil(Math.random() * 4); // 1 to 4
    var groupArchons = Math.random() > .5;
    var archLocs = map.placeArchons(numArchons, groupArchons);

    var numDens = Math.ceil(Math.random() * 4); // 2 to 8
    var denLocs = map.placeDens(numDens, archLocs);
    map.decorateDens(denLocs);

    var solid = Math.random() < .5;
    var patchy = Math.random() < .3;
    var checkerboard = Math.random < .3;
    if (Math.random() < .7) {
        var typesOfBlocks = Math.ceil(Math.random() * Math.sqrt(height * width));
        for (i = 0; i < typesOfBlocks; i++) {
            weight = Math.random() * 200;
            if (Math.random() < .1) {
                weight *= 100;
            }
            if (Math.random() < .01) {
                weight = 600000;
            }
            num = Math.ceil(Math.random() * 2);
            map.layBlocks(num, weight, solid, patchy, checkerboard);
        }
    }

    if (Math.random() < .7) {
        var typesOfWalls = Math.ceil(Math.random() * Math.sqrt(height * width));
        for (i = 0; i < typesOfWalls; i++) {
            weight = Math.random() * 200;
            if (Math.random() < .1) {
                weight *= 100;
            }
            if (Math.random() < .01) {
                weight = 600000;
            }
            num = Math.ceil(Math.random() * 2);
            length = Math.ceil(Math.random() * Math.sqrt(height * width) - 5);
            map.layWalls(num, weight, length, solid);
        }

    }

    map.cleanArchonSpawn(archLocs.A);

    for (i = 0; i < archLocs.A; i++) {
        if (Math.random() < .25) {
            map.addPartsToArea(archLocs.A[i].x, archLocs.A[i].y, 10, false);
        }
    }

    var numPartsCache = Math.round(Math.random() * 10);
    for (i = 0; i < numPartsCache; i++) {
        map.addPartsToArea(null, null, Math.round(Math.random() * 20), Math.random() < .3)
    }

    var name = random.first() + random.middle() + random.last();
    map.save(name, dir);
}


(function() {
    console.log("Thanks for using zden!");
    if (!argv.n || argv.h) {
        console.log("Usage: zden -n <num maps> -o <output dir (defaults to .)>")
        return;
    }
    for (var i = 0; i < parseInt(argv.n); i++) {
        createRandomMap(argv.d || '.');
    }
    console.log("Created " + parseInt(argv.n) + " test map(s)!");
}).call(this);
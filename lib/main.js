var argv = require('minimist')(process.argv.slice(2));

var Map = require('./map');
var random = require('random-name');
var constants = require('./constants');

function createRandomMap(dir, zombieLevel, numArchons, numDens) {

    var i, num, weight, length;
    var width = Math.floor(Math.random() * 50 + 30); // 30 to 80
    var height = Math.floor(Math.random() * 50 + 30); // 30 to 80
    if (Math.random() < .5) {
        width = height;
    }
    var symmetry = Math.floor(Math.random() * 4);
    var mirrored = Math.random() > .5;
    var map = new Map(width, height, symmetry, mirrored);

    var groupArchons = Math.random() > .5;
    var archLocs = map.placeArchons(numArchons, groupArchons);

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

    // place some parts
    var numPartsCache = Math.round(Math.random() * 10);
    for (i = 0; i < numPartsCache; i++) {
        map.addPartsToArea(null, null, Math.round(Math.random() * 20), Math.random() < .3)
    }

    // place some neutrals
    // very low probability of archons
    if (Math.random() < .05) {
        map.placeNeutral(null, null, constants.units.ARCHON);
    }
    if (Math.random() < .01) {
        map.placeNeutral(null, null, constants.units.ARCHON);
    }

    var numNeutral = Math.random() * 10;
    for (i = 0; i < numNeutral; i++) {
        var type = constants.units.GUARD;
        if (Math.random() < .5) {
            type = constants.units.SOLDIER;
        } else if (Math.random() < .3) {
            type = constants.units.SCOUT;
        } else if (Math.random() < .3) {
            type = constants.units.TURRET;
        }
        map.placeNeutral(null, null, type);
    }


    var rubbleLevel = map.getRubbleLevel();

    var name =  "Z" + zombieLevel + "_R" + rubbleLevel + "_A" + numArchons + "_D" + (2 * numDens) +  "_" +  random.first();
    map.save(name, dir, zombieLevel);
}


function validateOptions() {
    var valid = true;
    if (argv.z && (argv.z !== parseInt(argv.z) || argv.z < 0 || argv.z > 3) ) {
        console.log('z (zombie level) must be one of [0, 1, 2, 3] (0 light spawn, 3 max) eg: -z 0');
        valid = false;
    }
    if (argv.a && (argv.a !== parseInt(argv.a) || argv.a < 1 || argv.a > 4) ) {
        console.log('a (num archons per team) must be one of [1, 2, 3, 4] eg: -a 1');
        valid = false;
    }
    if (argv.d && (argv.d !== parseInt(argv.d) || argv.d % 2 !== 0 || argv.d < 2 || argv.a > 8) ) {
        console.log('d (num total dens) must be one of [2, 4, 6, 8] eg: -d 2');
        if (argv.d === 0) {
            console.log("Unsure if there can be zero dens on a map, but if you know there can be, let me know!");
        }
        valid = false;
    }
    return valid;
}


(function() {
    if (!argv.n || argv.h || argv.help || !validateOptions()) {
        console.log("Usage: zden -n <num maps>");
        console.log("Optional params:");
        console.log("   - z <zombie strength [0, 1, 2, 3]>");
        console.log("   - a <num team archons [1, 2, 3, 4]>");
        console.log("   - d <num total dens [2, 4, 6, 8]>");
        console.log("   - o <output dir, defaults to '.'>");
        return;
    }
    console.log("Thanks for using zden!");

    var zombieLevel, numArchons, numDens;
    for (var i = 0; i < parseInt(argv.n); i++) {
        zombieLevel = argv.z === undefined ? Math.floor(Math.random() * 4) : argv.z;
        numArchons = argv.a === undefined ? Math.ceil(Math.random() * 4): argv.a;
        numDens = argv.d === undefined ? Math.ceil(Math.random() * 4): argv.d / 2;
        createRandomMap(argv.o || '.', zombieLevel, numArchons, numDens);
    }
    console.log("Created " + parseInt(argv.n) + " test map(s)!");
}).call(this);
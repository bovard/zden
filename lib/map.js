var constants = require('./constants');
var xml = require('xml');
var fs = require('fs');
var path = require('path');

function isValid(x, y, height, width) {
    return x >= 0 && y >= 0 && x < width && y < height;
}


function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function validDenLoc(x, y, aArchonsLoc, bArchonLocs) {
    // Each zombie den will be at least 30% closer (in terms of radiusSquared)
    // to one team's closest archon than to the other team's closest archon.
    var i;
    var dist;
    var closestA = 10000000;
    var closestB = 10000000;
    for (i = 0; i < aArchonsLoc.length; i++) {
        dist = getDistance(x, y, aArchonsLoc[i].x, aArchonsLoc[i].y);
        if (dist < closestA) {
            closestA = dist
        }
        dist = getDistance(x, y, bArchonLocs[i].x, bArchonLocs[i].y);
        if (dist < closestB) {
            closestB = dist
        }
    }
    // must be at least 5 units different between archons
    if (Math.abs(closestA - closestB) < 5) {
        return false;
    }

    // only have dens very close to archon spawns 10% of the time
    if (Math.min(closestA, closestB) < 6 && Math.random() < .9) {
        return false;
    }
    if (closestA < closestB) {
        if (1.3 * closestA <= closestB) {
            return true;
        }
    } else if (closestB < closestA) {
        if (1.3 * closestB <= closestA) {
            return true;
        }
    }
    return false;
}

function yAxis(x, y, height, width) {
    return !(y < (height / 2));
}

function yAxisMirrorCell(x, y, height, width, mirrored) {
    if (y < height / 2) {
        y = height - y - 1;
    }
    if (mirrored) {
        x = width - x - 1;
    }
    return [[x, y]];
}

function xAxis(x, y, height, width) {
    return !(x < (width / 2));
}

function xAxisMirrorCell(x, y, height, width, mirrored) {
    if (x < width / 2) {
        x = width - x - 1;
    }
    if (mirrored) {
        y = height - y - 1;
    }
    return [[x, y]];
}


function diag(x, y, height, width) {
    return (y > x);
}

function diagMirrorCell(x, y, height, width, mirrored) {
    if (mirrored) {
        return reverseDiagMirrorCell(y, x, height, width, false);
    }
    return [[y, x]];
}

function reverseDiag(x, y, height, width) {
    return !(x + y < height);
}

function reverseDiagMirrorCell(x, y, height, width, mirrored) {
    if (mirrored) {
        return diagMirrorCell(height - y - 1, width - x - 1, height, width, false);
    }
    return [[height - y - 1, width - x - 1]];
}



function Map(width, height, symmetry, mirrored) {
    this.map = [];

    for (var i = 0; i < width; i++) {
        this.map.push([]);
        for (var j = 0; j < height; j++) {
            this.map[i].push({
                "rubble": 0,
                "parts": 0,
                "unit": null,
                "team": null
            });
        }
    }
    this.xMin = Math.floor(500 * Math.random());
    this.yMin = Math.floor(500 * Math.random());
    this.width = width;
    this.height = height;


    this.isMirror = xAxis;
    this.mirrorCellLoc = xAxisMirrorCell;
    this.mirrored = mirrored;

    if (symmetry === 1) {
        this.isMirror = yAxis;
        this.mirrorCellLoc = yAxisMirrorCell;
    } else if (symmetry === 2 && width === height) {
        this.isMirror = diag;
        this.mirrorCellLoc = diagMirrorCell;
    } else if (symmetry === 3 && width === height) {
        this.isMirror = reverseDiag;
        this.mirrorCellLoc = reverseDiagMirrorCell;
    }
}


Map.prototype.validLoc = function(x, y) {
    return isValid(x, y, this.height, this.width) && !this.isMirror(x, y, this.height, this.width, this.mirrored);
};

Map.prototype.pack = function(prop) {
    var packed = [];
    for (var i = 0; i < this.height; i++) {
        var list = [];
        for (var j = 0; j < this.width; j++) {
            list.push(Math.min(Math.round(this.map[j][i][prop]), 1000000)); // max of 1000000 parts/rubble
        }
        packed.push({
            "double-array": list.join(',')
        });
    }
    return packed;
};

Map.prototype.placeNeutral = function(x, y, unit) {
    if (x === null || y === null) {
        var loc = this.getValidXY();
        x = loc.x;
        y = loc.y;
    }
    if (this.map[x][y].unit !== null) {
        return;
    }
    this.placeUnitAtLoc(x, y, unit, constants.team.NEUTRAL, constants.team.NEUTRAL);
};


Map.prototype.placeUnitAtLoc = function(x, y, unit, team1, team2) {
    this.map[x][y].unit = unit;
    this.map[x][y].team = team1;

    var mirror = this.mirrorCellLoc(x, y, this.height, this.width, this.mirrored);
    mirror = mirror[0];
    this.map[mirror[0]][mirror[1]].unit = unit;
    this.map[mirror[0]][mirror[1]].team = team2;
    return {
        "x": mirror[0],
        "y": mirror[1]
    }
};


Map.prototype.addPartsToArea = function(x, y, val, solid) {
    var dx = Math.floor(Math.random() * 3);
    if (x === null || y == null) {
        var loc = this.getValidXY();
        x = loc.x;
        y = loc.y;
    }
    for (var i = -dx; i <= dx; i++) {
        for (var j = -dx; j <= dx; j++) {
            if (!solid && Math.random() < .3) {
                continue;
            }
            if (this.validLoc(x + i, y + j)) {
                this.placeAtLoc(x + i, y + j, 'parts', val, true)
            }
        }
    }


};

Map.prototype.placeAtLoc = function(x, y, type, val, replace) {
    if (replace) {
        this.map[x][y][type] = val;
    } else {
        this.map[x][y][type] += val;
    }

    var mirror = this.mirrorCellLoc(x, y, this.height, this.width, this.mirrored);
    mirror = mirror[0];
    if (replace) {
        this.map[mirror[0]][mirror[1]][type] = val;
    } else {
        this.map[mirror[0]][mirror[1]][type] += val;
    }
    return [{
        "x": mirror[0],
        "y": mirror[1]
    }]
};

Map.prototype.placeDens = function(n, archonLocs) {
    var x, y, done;
    var mirror;
    var denLocs = [];
    for (var i = 0; i < n; i++) {
        done = false;
        while(!done) {
            var point = this.getValidXY();
            x = point.x;
            y = point.y;
            if (!this.isMirror(x, y, this.height, this.width, this.mirrored)) {
                if (!this.map[x][y].unit) {
                    if (validDenLoc(x, y, archonLocs.A, archonLocs.B)) {
                        done = true;
                    }
                }
            }
        }
        mirror = this.placeUnitAtLoc(x, y, constants.ZOMBIEDEN, constants.team.ZOMBIE, constants.team.ZOMBIE);
        denLocs.push({"x": x, "y": y});
        denLocs.push(mirror);
    }
    return denLocs;
};

Map.prototype.placeArchons = function(n, grouped) {
    var aArchons = [];
    var bArchons = [];
    var mirror;
    // if we aren't grouping archons, 25% of the time mix in blue with red
    var mixed = !grouped && Math.random() < .25;
    for (var i = 0; i < n; i++) {
        var done = false;
        var x, y;
        while (!done) {
            var point = this.getValidXY();
            x = point.x;
            y = point.y;
            if (!this.isMirror(x, y, this.height, this.width, this.mirrored)) {
                mirror = this.mirrorCellLoc(x, y, this.height, this.width, this.mirrored);
                mirror = mirror[0];
                if (x != mirror[0] || y != mirror[1]) {
                    done = true;
                }
            }
        }
        if (mixed && Math.random() < .5) {
            mirror = this.placeUnitAtLoc(x, y, constants.units.ARCHON, constants.team.B, constants.team.A);
        } else {
            mirror = this.placeUnitAtLoc(x, y, constants.units.ARCHON, constants.team.A, constants.team.B);
        }
        aArchons.push({"x": x, "y": y});
        bArchons.push(mirror);

        var placed = 1;
        while (grouped && placed < n) {
            var dx = Math.round((Math.random() -.5) * 10);
            var dy = Math.round((Math.random() -.5) * 10);
            if (isValid(x + dx, y + dy, this.height, this.width)) {
                mirror = this.mirrorCellLoc(x, y, this.height, this.width, this.mirrored);
                mirror = mirror[0];
                if (x != mirror[0] || y != mirror[1]) {
                    mirror = this.placeUnitAtLoc(x + dx, y + dy, constants.units.ARCHON, constants.team.A, constants.team.B);
                    aArchons.push({"x": x + dx, "y": y + dy});
                    bArchons.push(mirror);
                    placed +=1;
                }
            }
        }
        if (grouped) {
            break;
        }
    }
    return {
        'A': aArchons,
        'B': bArchons
    }

};

Map.prototype.getValidXY = function() {
    var x,y;
    var done = false;
    while (!done) {
        x = Math.floor(Math.random() * this.width);
        y = Math.floor(Math.random() * this.height);
        if (this.validLoc(x, y)) {
            done = true;
        }
    }
    return {
        "x": x,
        "y": y
    }
};


Map.prototype.cleanArchonSpawn = function(archonLocs) {
    for (var idx = 0; idx < archonLocs.length; idx++) {
        var loc = archonLocs[idx];
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (this.validLoc(loc.x + i, loc.y + j)) {
                    this.placeAtLoc(loc.x + i, loc.y + j, 'rubble', 0, true);
                }

            }
        }

    }

};

Map.prototype.layBlocks = function(n, weight, splotch, patchy, checkboard) {
    for (var idx = 0; idx < n; idx++) {
        var done = false;
        while(!done) {
            var point = this.getValidXY();
            var dx = Math.floor(Math.random() * 10) + 2;
            var dy = Math.floor(Math.random() * 10) + 2;
            if (this.validLoc(point.x + dx, point.y + dy)) {
                done = true;
            }
        }
        for (var i = point.x; i <= point.x + dx; i++) {
            for (var j = point.y; j <= point.y + dy; j++) {
                if (checkboard && (i + j) % 2 == 0 ) {
                    continue;
                }
                if (patchy && Math.random() < .3) {
                    continue;
                }
                if (splotch) {
                    this.placeAtLoc(i, j, 'rubble', weight * (Math.random() + .5));
                } else {
                    this.placeAtLoc(i, j, 'rubble', weight);
                }
            }
        }
    }
};


Map.prototype.decorateDens = function(dens) {
    for (var idx = 0; idx < dens.length; idx ++) {
        var den = dens[idx];
        if (this.isMirror(den.x, den.y, this.height, this.width, this.mirrored)) {
            continue;
        }
        for (var i = -3; i <= 3; i++) {
            for (var j = -3; j <= 3; j++) {
                if (Math.random() < .7 && this.validLoc(den.x + i, den.y + j)) {
                    this.placeAtLoc(den.x + i, den.y + j, 'rubble', Math.floor(Math.random() * 50));
                }
            }
        }
    }

};

Map.prototype.layWalls = function(n, weight, maxLength, splotch) {
    var dx, dy;
    for (var idx = 0; idx < n; idx++) {
        var done = false;
        var horiz = Math.random() > .5;
        while(!done) {
            var point = this.getValidXY();
            var d = Math.floor(Math.random() * 8) + 2;
            if (horiz) {
                dx = d;
                dy = 0;
            } else {
                dx = 0;
                dy = d;
            }
            if (this.validLoc(point.x + dx, point.y + dy)) {
                done = true;
            }
        }
        for (var i = point.x; i <= point.x + dx; i++) {
            for (var j = point.y; j <= point.y + dy; j++) {
                if (splotch) {
                    this.placeAtLoc(i, j, 'rubble', weight * (Math.random() + .5));
                } else {
                    this.placeAtLoc(i, j, 'rubble', weight * (Math.random() + .5));
                }
            }
        }
    }
};

Map.prototype.getZombieSchedule = function(zombieLevel) {
    var schedule = constants.zombieSpawn[zombieLevel];

    var sch = [];
    var rounds = Object.keys(schedule);
    for (var i = 0; i < rounds.length; i++) {
        var r = schedule[rounds[i]];
        var spawns = Object.keys(r);
        var spws = [{"_attr": {number: rounds[i]}}];
        for (var j = 0; j < spawns.length; j++) {
            spws.push({
                "zombie-count": [{
                    "_attr": {
                        type: spawns[j],
                        count: r[spawns[j]]
                    }
                }]
            })
        }
        sch.push({
            "round": spws
        })
    }
    return sch;
};

Map.prototype.getInitialRobots = function() {
    var bots = [];
    for (var i = 0; i < this.width; i++) {
        for (var j = 0; j < this.height; j++) {
            if (this.map[i][j].unit) {
                bots.push({
                    "initial-robot": [{
                        "_attr": {
                            "originOffsetY": j,
                            "originOffsetX": i,
                            "type": this.map[i][j].unit,
                            "team": this.map[i][j].team
                        }
                    }]
                })
            }

        }
    }
    return bots;
};


Map.prototype.getRubbleLevel = function() {
    var rubbleTotal = 0;
    for (var i = 0; i < this.width; i++) {
        for (var j = 0; j < this.height; j++) {
            rubbleTotal += this.map[i][j].rubble;
        }
    }
    var averageRubble = rubbleTotal / (this.width * this.height);
    return Math.max(0, Math.floor(10 * Math.log(averageRubble) / Math.log(constants.MAX_RUBBLE +.001)))

};

Map.prototype.toJSON = function(name, zombieLevel) {
    return {
        "object-stream": [
            {
                "game-map": [
                    {
                        "_attr": {
                            "width": this.width,
                            "height": this.height,
                            "origin": this.xMin + "," + this.yMin,
                            "seed": Math.round(Math.random() * 1000),
                            "rounds": 3000,
                            "mapName": name
                        }
                    },
                    {
                        "initialRubble": this.pack('rubble')
                    },
                    {
                        "initialParts": this.pack('parts')
                    },
                    {
                        "zombieSpawnSchedule": this.getZombieSchedule(zombieLevel)
                    },
                    {
                        "initialRobots": this.getInitialRobots()
                    }
                ]
            },
        ]
    };
};

Map.prototype.save = function(name, dir, zombieLevel) {
    var mapString = xml(this.toJSON(name, zombieLevel), true);
    fs.writeFileSync(path.join(dir, name + '.xml'), mapString);
};


module.exports = Map;
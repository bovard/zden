MAX = {
    0: {
        STANDARDZOMBIE: 6
    },
    50: {
        STANDARDZOMBIE: 8
    },
    100: {
        STANDARDZOMBIE: 10,
        BIGZOMBIE: 2
    },
    200: {
        STANDARDZOMBIE: 10
    },
    300: {
        STANDARDZOMBIE: 14,
        BIGZOMBIE: 2
    },
    500: {
        STANDARDZOMBIE: 14,
        RANGEDZOMBIE: 2,
        BIGZOMBIE: 2
    },
    700: {
        STANDARDZOMBIE: 14,
        RANGEDZOMBIE: 4,
        BIGZOMBIE: 2
    },
    900: {
        STANDARDZOMBIE: 14,
        RANGEDZOMBIE: 4,
        BIGZOMBIE: 2
    },
    1100: {
        STANDARDZOMBIE: 14,
        RANGEDZOMBIE: 8,
        FASTZOMBIE: 6,
        BIGZOMBIE: 2
    },
    1500: {
        STANDARDZOMBIE: 14,
        RANGEDZOMBIE: 8,
        FASTZOMBIE: 6,
        BIGZOMBIE: 4
    },
    1700: {
        STANDARDZOMBIE: 14,
        RANGEDZOMBIE: 10,
        FASTZOMBIE: 8,
        BIGZOMBIE: 4
    },
    1900: {
        STANDARDZOMBIE: 14,
        RANGEDZOMBIE: 10,
        FASTZOMBIE: 8,
        BIGZOMBIE: 4
    },
    2100: {
        STANDARDZOMBIE: 18,
        RANGEDZOMBIE: 12,
        FASTZOMBIE: 10,
        BIGZOMBIE: 4
    },
    2300: {
        STANDARDZOMBIE: 18,
        RANGEDZOMBIE: 12,
        FASTZOMBIE: 10,
        BIGZOMBIE: 4
    },
    2500: {
        STANDARDZOMBIE: 24,
        RANGEDZOMBIE: 16,
        FASTZOMBIE: 14,
        BIGZOMBIE: 4
    },
    2700: {
        STANDARDZOMBIE: 24,
        RANGEDZOMBIE: 16,
        FASTZOMBIE: 14,
        BIGZOMBIE: 4
    },
    2900: {
        STANDARDZOMBIE: 24,
        RANGEDZOMBIE: 16,
        FASTZOMBIE: 14,
        BIGZOMBIE: 4
    }
};

HEAVY = {
    50: {
        STANDARDZOMBIE: 6
    },
    100: {
        STANDARDZOMBIE: 8,
        RANGEDZOMBIE: 4
    },
    200: {
        STANDARDZOMBIE: 12,
        RANGEDZOMBIE: 4
    },
    300: {
        STANDARDZOMBIE: 12,
        RANGEDZOMBIE: 4,
        FASTZOMBIE: 6
    },
    600: {
        STANDARDZOMBIE: 12,
        RANGEDZOMBIE: 4,
        FASTZOMBIE: 6
    },
    900: {
        STANDARDZOMBIE: 14,
        RANGEDZOMBIE: 8,
        FASTZOMBIE: 10 ,
        BIGZOMBIE: 2
    },
    1200: {
        STANDARDZOMBIE: 14,
        RANGEDZOMBIE: 8,
        FASTZOMBIE: 10 ,
        BIGZOMBIE: 2
    },
    1500: {
        STANDARDZOMBIE: 18,
        RANGEDZOMBIE: 12,
        FASTZOMBIE: 16,
        BIGZOMBIE: 4
    },
    1800: {
        STANDARDZOMBIE: 18,
        RANGEDZOMBIE: 12,
        FASTZOMBIE: 16,
        BIGZOMBIE: 4
    },
    2100: {
        STANDARDZOMBIE: 18,
        RANGEDZOMBIE: 12,
        FASTZOMBIE: 16,
        BIGZOMBIE: 6
    },
    2400: {
        STANDARDZOMBIE: 18,
        RANGEDZOMBIE: 12,
        FASTZOMBIE: 16,
        BIGZOMBIE: 6
    },
    2700: {
        STANDARDZOMBIE: 18,
        RANGEDZOMBIE: 12,
        FASTZOMBIE: 16,
        BIGZOMBIE: 6
    }
};


MEDIUM = {
    100: {
        STANDARDZOMBIE: 6,
        RANGEDZOMBIE: 2
    },
    200: {
        STANDARDZOMBIE: 6,
        RANGEDZOMBIE: 2
    },
    300: {
        STANDARDZOMBIE: 8,
        RANGEDZOMBIE: 4
    },
    600: {
        STANDARDZOMBIE: 12,
        RANGEDZOMBIE: 4
    },
    900: {
        STANDARDZOMBIE: 14,
        RANGEDZOMBIE: 8,
        FASTZOMBIE: 8
    },
    1200: {
        STANDARDZOMBIE: 14,
        RANGEDZOMBIE: 8,
        FASTZOMBIE: 10
    },
    1500: {
        STANDARDZOMBIE: 18,
        RANGEDZOMBIE: 12,
        FASTZOMBIE: 16,
        BIGZOMBIE: 4
    },
    1800: {
        STANDARDZOMBIE: 18,
        RANGEDZOMBIE: 12,
        FASTZOMBIE: 16,
        BIGZOMBIE: 4
    },
    2100: {
        STANDARDZOMBIE: 18,
        RANGEDZOMBIE: 12,
        FASTZOMBIE: 16,
        BIGZOMBIE: 6
    },
    2400: {
        STANDARDZOMBIE: 18,
        RANGEDZOMBIE: 12,
        FASTZOMBIE: 16,
        BIGZOMBIE: 6
    },
    2700: {
        STANDARDZOMBIE: 18,
        RANGEDZOMBIE: 12,
        FASTZOMBIE: 16,
        BIGZOMBIE: 6
    }
}

LIGHT = {
    300: {
        STANDARDZOMBIE: 6
    },
    600: {
        STANDARDZOMBIE: 6,
        RANGEDZOMBIE: 2
    },
    900: {
        STANDARDZOMBIE: 8,
        RANGEDZOMBIE: 4
    },
    1200: {
        STANDARDZOMBIE: 12,
        RANGEDZOMBIE: 4
    },
    1500: {
        STANDARDZOMBIE: 12,
        RANGEDZOMBIE: 8
    },
    1800: {
        STANDARDZOMBIE: 12,
        RANGEDZOMBIE: 8
    },
    2100: {
        STANDARDZOMBIE: 20,
        RANGEDZOMBIE: 8,
        BIGZOMBIE: 4
    },
    2400: {
        STANDARDZOMBIE: 24,
        RANGEDZOMBIE: 12,
        BIGZOMBIE: 4
    },
    2700: {
        STANDARDZOMBIE: 24,
        RANGEDZOMBIE: 16,
        BIGZOMBIE: 4
    }

};


module.exports = {
    symmetryModes: ['x-axis', 'y-axis', 'y=-x (square only)', 'y=x (square only)'],
    terrainWeight: ['heavy', 'medium', 'light'],
    parts: ['many', 'few', 'none'],
    zombie: ['light', 'medium', 'heavy'],
    terrain: ['blocks', 'litter', 'maze'],
    zombies: {
        STANDARDZOMBIE: "STANDARDZOMBIE",
        RANGEDZOMBIE: "RANGEDZOMBIE",
        BIGZOMBIE: "BIGZOMBIE",
        FASTZOMBIE: "FASTZOMBIE"
    },
    zombieSpawn: {
        3: MAX,
        2: HEAVY,
        1: MEDIUM,
        0: LIGHT
    },
    MAX_RUBBLE: 1000000,
    ZOMBIEDEN: "ZOMBIEDEN",
    units: {
        ARCHON: "ARCHON",
        SOLDIER: "SOLDIER",
        GUARD: "GUARD",
        TURRET: "TURRET",
        SCOUT: "SCOUT"
    },
    team: {
        A: "A",
        B: "B",
        ZOMBIE: "ZOMBIE",
        NEUTRAL: "NEUTRAL"
    }
};
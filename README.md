# zden
npm package for generating random maps for 2016 [battlecode](http://www.battlecode.org/)

zden *(zombie den? zombie eden? no one knows)* creates a bunch of maps for you to test your bot on! You can easily create 100s of random maps (so you should probably be using [archon](https://www.npmjs.com/package/archon) to test). 

Installation:

```
npm install -g zden
```


Sample Usage:

```
zden -n 100 
```

Will create 100 maps in the current directory!

```
zden -n 100 -d maps/
```
Will create 100 maps in the maps/ directory!


Maps include:

1. between 30x30 and 80x80
2. rubble <= 1,000,000
3. zombie den placement [1-8 dens] follows the spec (30% closer to one player)
4. zombie spawn schedule from light to max
5. random terrain
6. random parts
7. random neutrals (including up to 4 archons)
8. starting archons [1, 4]
9. archons start together, or seperate
10. all the rotations, symmetry!
11. descriptive names!

#### Map Names
Z[z]_R[r]_A[a]_D[d]_<random_name>.xml
```
z in [0, 3] represents the number of zombie spawns on the map (0 light schedule, 3 max schedule)
r in [0, 9] represents the amount of rubble on the map the higher the number the more rubble
   *note: this is a log scale on average rubble per square
a in [1, 4] represents the number of starting team archons
d in [2, 4, 6, 8] represents the total number of starting dens
```

The `z`, `a`, and `d` params can be explicity assigned.

For example: 

  * if you wanted to create 10 maps with a light zombie schedule: `zden -z 0 -n 10`
  * if you wanted to create 10 maps with 4 team archons: `zden -a 4 -n 10`
  * if you wanted to create 10 maps with 8 starting dens: `zden -d 8 -n 10`
  * if you wanted to create 10 maps with light Z, 4 archons and 2 dens: `zden -z 0 -a 4 -d 2 -n 10`


If you'd like to see something please open an [issue](https://github.com/bovard/zden/issues) or submit a PR!

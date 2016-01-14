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
11. really weird names!

This is a very early release so look for more features coming soon! If you'd like to see something please open an [issue](https://github.com/bovard/zden/issues) or submit a PR!

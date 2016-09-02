//function nextGeneration(grid) {
//
//    var deltas       = [[-1,-1], [-1,0], [-1,1],
//                        [0 ,-1],         [0 ,1],
//                        [1 ,-1], [1 ,0], [1 ,1]],//environment
//        m            = grid.length,
//        n            = grid[0].length,
//        validIndex   = (i,j) => i >= 0 && j >= 0 && i < m && j < n,
//        numNeighbors = (i,j) => deltas.map(d => [d[0]+i, d[1]+j])
//                                      .filter(ij => validIndex.apply(null, ij))
//                                      .reduce((m,ij) => m + grid[ij[0]][ij[1]], 0),
//        nextLive     = n      => n == 2 || n == 3,//rulez
//        nextDead     = n      => n == 3,          //
//        show         = isLive => isLive ? 1 : 0;//the actual return
//
//    return grid.map( (row, i) => row.map( (isLive, j) => {
//        var n = numNeighbors(i, j);
//        return isLive ? show(nextLive(n)) : show(nextDead(n));
//    }));
//}

//add event listener for space bar
//requestAnimationFrame


function drawGrid(currGrid) {
  let canvasGrid = document.getElementById('grid');
  let ctx = canvasGrid.getContext("2d");

  // grid.rows = Math.floor(gol.height / (gol.cellSize + gol.cellSpace));
  // grid.cols = Math.floor(gol.width / (gol.cellSize + gol.cellSpace)); 
  // let size = 20;
  let cellSize = 30;
  let cellSpace = 1;
  canvasGrid.width = 10*(cellSpace+cellSize);
  canvasGrid.height = 10*(cellSpace+cellSize);
  let colors = ['#d5f9cf', '#028436']
  for(let row = 0; row < currGrid.length; row++) {
    for(let col = 0; col < currGrid.length; col++) {
      let rowOffset = cellSpace + row * (cellSize + cellSpace);
      let colOffset = cellSpace + col * (cellSize + cellSpace);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#d6caf7';
      ctx.fillStyle = colors[currGrid[row][col]];
      ctx.fillRect(colOffset, rowOffset, cellSize, cellSize);
      ctx.strokeRect(colOffset, rowOffset, cellSize, cellSize);
    }
  }
  ctx.stroke();
}

function createGrid(){
  let grid = new Array(100).fill().map(() => Math.floor(Math.random() * 2));
  return grid
}

var grid = createGrid()

function checkLiveNeighbors(prevGrid, i) {
  // let totalLiveNeighbors = 0
  let column = checkColumn(i)
  let row = checkRow(i)
  let diagonal = checkDiagonals(i)
  let all = [...column, ...row, ...diagonal];
  let aliveNeighbors = all.reduce((a, b) => {
    b = b === null ? 0 :  prevGrid[b];
    // console.log('a: ', a, 'b: ', b)
    return a + b;
  }, 0)
  return aliveNeighbors
}

// let answer = checkLiveNeighbors(30)

function checkColumn(i) {
  if (i === null) return [null, null]
  let above = (i - 10 < 0) ? null : i - 10;
  let below = (i + 10 > 99) ? null : i + 10;
  return [above, below]
}

function checkRow(i) {
  if (i === null) return [null, null]
  let left = ((i - 1) % 10 === 9 || (i - 1) < 0) ? null : i - 1;
  let right = ((i + 1) % 10 === 0 || (i + 1) > 100) ? null : i + 1 ;
  return [left, right]
}

function checkDiagonals(i) {
  let [above, below] = checkColumn(i)
  let [upperLeft, upperRight] = checkRow(above)
  let [lowerLeft, lowerRight] = checkRow(below)
  return [upperLeft, upperRight, lowerLeft, lowerRight]
}

function changeState(prevGrid, i) {
  numLiveNeighbors = checkLiveNeighbors(prevGrid, i)
  let new_state_i
  if(prevGrid[i] === 1 && numLiveNeighbors>3){
    new_state_i = 0
  } else if(prevGrid[i] === 0 && numLiveNeighbors === 3){
    new_state_i = 1
  } else if(prevGrid[i] === 1 && numLiveNeighbors < 2){
    new_state_i = 0
  } else if(prevGrid[i] === 1 && (numLiveNeighbors === 2 && numLiveNeighbors === 3)){
    new_state_i = 1
  } else {new_state_i = prevGrid[i]}
  // console.log(i, 'was previously:', prevGrid[i],'with ', numLiveNeighbors, 'neighbors, now:', new_state_i)
  return new_state_i
}

function updateGrid(prevGrid) {
  newGrid = []
  for(let i = 0; i < prevGrid.length; i++) {
    new_state_i = changeState(prevGrid, i);
    newGrid.push(new_state_i)
  }
  // console.log('new grid', nestGrid(newGrid));
  let nestedNewGrid = nestGrid(newGrid)
  drawGrid(nestedNewGrid);
  grid = newGrid;
}

function nestGrid(flatGrid) {
  let nestArr = [];
  for(let i = 0; i < Math.sqrt(flatGrid.length); i++) {
    nestArr.push(flatGrid.slice((i * 10), (i + 1) * 10));
  }
  return nestArr;
}

drawGrid(nestGrid(grid));

function handleClick() {
  updateGrid(grid);
  console.log('new grid!', nestGrid(grid));
}

function reset() {
  grid = new Array(100).fill().map(() => Math.floor(Math.random() * 2));
  console.log('resetting...', nestGrid(grid))
  drawGrid(nestGrid(grid));
}


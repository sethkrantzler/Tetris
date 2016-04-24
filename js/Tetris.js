require([src='BulkImageLoader.js',src="Tetramino.js"])


var ROWS = 20;
var COLS = 10;
var SIZE = 24;

var canvas;
var ctx;
var blockImg;
var bgImg;
var gameOverImg;
var curPiece;
var gameData;
var imgLoader;
var prevTime;
var curTime;
var isGameOver;
var lineSpan;
var curLines;

window.onload = onReady;

function onReady() {
  imgLoader = new BulkImageLoader();
  imgLoader.addImage("blocks.png", "blocks");
  imgLoader.addImage("bg.png", "bg");
  imgLoader.addImage("gameover.png", "gameover");
  imgLoader.onReadyCallback = onImagesLoaded;
  imgLoader.loadImages();

  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  lineSpan = document.getElementById('lines');

  prevTime = curTime = 0;

  document.onkeydown = getInput;
}

function onImagesLoaded(e) {
  blockImg = imgLoader.getImageAtIndex(0);
  bgImg = imgLoader.getImageAtIndex(1);
  gameOverImg = imgLoader.getImageAtIndex(2);
  initGame();
}

function initGame() {
  var r, c;
  curLines = 0;
  isGameOver = false;

  if(gameData == undefined) {
    gameData = new Array();

    for(r = 0; r < ROWS; r++) {
      gameData[r] = new Array();
      for(c = 0; c < COLS; c++) {
        gameData[r].push(0);
      }
    }

  }

  else {
    for(r = 0; r < ROWS; r++) {
      for(c = 0; c < COLS; c++) {
        gameData[r][c] = 0;
      }
    }
  }

  curPiece=GetRandomPiece();

  lineSpan.innerHTML = curLines.toString();

  var requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  window.requestAnimationFrame = requestAnimFrame;

  requestAnimationFrame(update);
}

function update() {
  curTime = new Date().getTime();

  if(curTime-prevTime > 500) {
    // update the game piece
    //  update time
    if(checkMove(curPiece.gridx, curPiece.gridy +1, curPiece.currentState)) {
      curPiece.gridy +=1;
    }
    else {
      copyData(curPiece);
      curPiece = GetRandomPiece();
    }
    prevTime = curTime;
  }

  ctx.clearRect(0, 0, 320, 640);
  drawBoard();
  drawPiece(curPiece);

  if(isGameOver == false) {
    requestAnimationFrame(update);
  }
  else {
    ctx.drawImage(gameOverImg, 0, 0, 320, 640, 0, 0, 320, 640);
  }
}

function drawBoard() {
  ctx.drawImage(bgImg, 0, 0, 320, 640, 0, 0, 320, 640);

  for (var r = 0; r < ROWS; r++) {
    for (var c = 0; c < COLS; c++) {
      if(gameData[r][c] != 0) {
        ctx.drawImage(blockImg, (gameData[r][c] - 1) * SIZE, 0, SIZE, SIZE, c * SIZE, r * SIZE, SIZE, SIZE)
      }
    }
  }
}

function drawPiece(p) {
  var drawX = p.gridx;
  var drawY = p.gridy;
  var state = p.currentState;

  for (var r = 0, len = p.states[state].length; r < len; r++) {
    for (var c = 0, len2 = p.states[state][r].length; c < len2; c++) {
      if(p.states[state][r][c] == 1 && drawY >= 0) {
        ctx.drawImage(blockImg, p.color * SIZE, 0, SIZE, SIZE, drawX * SIZE, drawY * SIZE, SIZE, SIZE);
      }
      drawX += 1;
    }
    drawX = p.gridx;
    drawY += 1;
  }
}

function copyData(p) {
  var xpos = p.gridx;
  var ypos = p.gridy;
  var state = p.currentState;

  for (var r = 0, len = p.states[state].length; r < len; r++) {
    for (var c = 0, len2 = p.states[state][r].length; c < len2; c++) {
      if(p.states[state][r][c] == 1 && ypos >= 0) {
        gameData[ypos][xpos] = (p.color + 1);
      }
      xpos += 1;
    }
    xpos = p.gridx;
    ypos += 1;
  }

  checkLines();

  if(p.gridy < 0) {
    isGameOver = true;
  }
}

function checkLines() {
  var lineFound= false;
  var fullRow = true;
  var r = ROWS - 1;
  var c = COLS - 1;

  while(r >= 0) {
    while(c >= 0) {
      if(gameData[r][c] == 0) {
        fullRow = false;
        c = -1;
      }
      c--;
    }

    if (fullRow == true) {
      zeroRow(r);
      r++;
      lineFound = true;
      curLines++;
    }

    fullRow = true;
    c = COLS - 1;
    r--;
  }
}

function zeroRow(row) {
  var r = row;
  var c = 0;

  while(r >= 0) {
    while( c < COLS) {
      if(r > 0) {
        gameData[r][c] = gameData[r-1][c];
      }
      else {
        gameData[r][c] = 0
      }
      c++;
    }
    c = 0;
    r--;
  }
}

function checkMove(xpos, ypos, newState) {
  var result = true;
  var newx = xpos;
  var newy = ypos;

  for (var r = 0, len = p.states[state].length; r < len; r++) {
    for (var c = 0, len2 = p.states[state][r].length; c < len2; c++) {
      if(newx<0 || newx >= COLS) {
        result = false;
        c = len2;
        r = len;
      }

      if(gameData[newy] != undefined && gameData[newy][newx] != 0 && curPiece.states[newState][r] != 0 && curPiece.states[newState][r][c] != 0) {
        result = false;
        c = len2;
        r = len;
      }
      newx += 1;
    }
    newx = xpos;
    newy += 1;

    if(newy > ROWS) {
      r = len;
      result = false;
    }
  }

  return result;
}

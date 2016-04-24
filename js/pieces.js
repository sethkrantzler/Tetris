function Lpiece() {
  this.state1=[[1,0],
               [1,0],
               [1,1]];
  this.state2=[[0,0,1],
               [1,1,1]];
  this.state3=[[1,1],
               [0,1],
               [0,1]];
  this.state4=[[1,1,1],
               [1,0,0]];
  this.states=[this.state1, this.state2, this.state3, this.state4];
  this.curState=0;
  this.color=3;
  this.gridx=4;
  this.gridy=-3;
}

function RevLpiece() {
  this.state1=[[0,1],
               [0,1],
               [1,1]];
  this.state2=[[1,1,1],
               [0,0,1]];
  this.state3=[[1,1],
               [1,0],
               [1,0]];
  this.state4=[[1,0,0],
               [1,1,1]];
  this.states=[this.state1, this.state2, this.state3, this.state4];
  this.curState=0;
  this.color=0;
  this.gridx=4;
  this.gridy=-3;
}

function Sqpiece() {

  this.state1=[[1,1],
               [1,1]];
  this.states=[this.state1];
  this.curState=0;
  this.color=2;
  this.gridx=4;
  this.gridy=-2;
}

function Linepiece() {

  this.state1=[[1],
               [1],
               [1],
               [1]];
  this.state2=[[1,1,1,1]];
  this.states=[this.state1, this.state2];
  this.curState=0;
  this.color=7;
  this.gridx=5;
  this.gridy=-4;

}

function Tpiece() {
  this.state1=[[1,1,1],
               [0,1,0]];

  this.state2=[[1,0],
               [1,1],
               [1,0]];

  this.state3=[[0,1,0],
               [1,1,1]];

  this.state4=[[0,1],
               [1,1],
               [0,1]];

  this.states=[this.state1, this.state2, this.state3, this.state4];
  this.curState=0;
  this.color=4;
  this.gridx=4;
  this.gridy=-2;

}

function Spiece() {
  this.state1=[[0,1,1],
               [1,1,0]];

  this.state2=[[1,0],
               [1,1],
               [0,1]];

  this.states=[this.state1, this.state2];
  this.curState=0;
  this.color=1;
  this.gridx=4;
  this.gridy=-3;
}

function Zpiece() {
  this.state1=[[1,1,0],
               [0,1,1]];

  this.state2=[[0,1],
               [1,1],
               [1,0]];

  this.states=[this.state1, this.state2];
  this.curState=0;
  this.color=6;
  this.gridx=4;
  this.gridy=-3;
}

function getRandomPiece() {
  var Randomizer=Math.floor(Math.random()*7);
  var piece;

  switch(Randomizer) {
    case 0: piece = new RevLpiece(); break;
    case 1: piece = new Sqpiece(); break;
    case 2: piece = new Lpiece(); break;
    case 3: piece = new Zpiece(); break;
    case 4: piece = new Tpiece(); break;
    case 5: piece = new Spiece(); break;
    case 6: piece = new Linepiece(); break;
  }
  return piece
}

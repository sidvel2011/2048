var mytable=document.getElementById('siddharth');
var size = 4;
var values = new Array(size);
initialize();


function initialize(){
  //create 6x6 table and fill up null values
  createTable();
  //values[0][2] = 2;
  //values[0][4] = 2;
  //values[0][0] = 2;
  fillNewEntry();
  refreshTable();
  document.onkeydown = checkKey;
}

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        move('up');
    }
    else if (e.keyCode == '40') {
        // down arrow
        move('down');
    }
    else if (e.keyCode == '37') {
       // left arrow
       move('left');
    }
    else if (e.keyCode == '39') {
       // right arrow
       move('right');
    }

}

function setColor(value){
  switch(value){
    case 2: return 'yellow';
    case 4: return 'green';
    case 8: return 'orange';
    case 16: return 'blue';
    case 32: return 'pink';
    case 64: return 'teal';
    case 128: return 'aqua';
    case 256: return 'navy';
    case 512: return 'tan';
    case 1024: return 'maroon';
    case 2048: return 'lime';
  }
  return null;
}

function createTable(){
  for(i=0; i<size; i++){//ROWs
    var row = mytable.insertRow(i);
    values[i] = new Array(size);
  for(j=0; j<size; j++){
    values[i][j] = null;
    var col = row.insertCell(j);
    col.innerHTML = values[i][j];
    col.width=50;
    col.height=50;
    col.style.textAlign = "center";
    //col.style.verticalAlign= middle;
   }
  }
}

function pickRandomCell(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}

function refreshTable(){
  for(i=0; i<size; i++){//ROWs
    for(j=0; j<size; j++){
      mytable.rows[i].cells[j].innerHTML = values[i][j];
      mytable.rows[i].cells[j].style.backgroundColor = setColor(values[i][j]);
    }
  }
}

function fillNewEntry(){
  var random;
  do{
    random = pickRandomCell(0, (size * size));
  }while (values[Math.floor(random/size)][(random % size)] != null);
  //assign value 2 on the random cell
  values[Math.floor(random/size)][(random % size)] = 2;
}

function checkGameOver(){
  var gameOver = true;
  for(i=0; i<size; i++){//ROWs
    for(j=0; j<size; j++){
      if(!values[i][j]){
        gameOver = false;
      }
    }
  }
  //console.log('game over is: ' + gameOver);
  return gameOver;
}

function move(direction){
  if (direction === "right"){
    moveRight();
    addRight();
    moveRight();
  } else if (direction == "left"){
    moveLeft();
    addLeft();
    moveLeft();
  } else if (direction == "up"){
    moveUp();
    addUp();
    moveUp();
  } else if (direction == 'down'){
    moveDown();
    addDown();
    moveDown();
  }
  fillNewEntry();
  //Refresh table
  refreshTable();
  if (checkGameOver()){
    document.getElementById('up').disabled = true;
    document.getElementById('down').disabled = true;
    document.getElementById('left').disabled = true;
    document.getElementById('right').disabled = true;
    alert('Game Over');
  }
}

function moveRight(){
  var i, j, k;
  for (i=0;i<size;i++){
    for(j=size-1;j>=0;j--){
      //console.log("j is " + j);
      var x=values[i][j];
      if(!x){
        for(k=j-1; k>=0; k--){
          //console.log("k is " + k);
          var y=values[i][k];
          if(!y){
            continue;
          }
          values[i][j]=y;
          values[i][k]=null;
          break;
        }
      }
    }
  }
}


function addRight(){
  for(i=0;i<size;i++){
    for(j=size-1;j>=1;j--){
      var current = values[i][j];
      var prev = values[i][j-1];
      if(current && prev && current == prev){
        values[i][j] = current + prev;
        values[i][j-1] = null;
        if (checkWin(values[i][j])){
          return;
        }
      }
    }
  }
}

function checkWin(value){
  if (value == 2048){
    alert ('Congrats, you win!!');
    document.getElementById('up').disabled = true;
    document.getElementById('down').disabled = true;
    document.getElementById('left').disabled = true;
    document.getElementById('right').disabled = true;
    return true;
  }
  return false;
}

function moveLeft(){
  var i, j, k;
  for (i=0;i<size;i++){
    for(j=0;j<size;j++){
      //console.log("j is " + j);
      var x=values[i][j];
      if(!x){
        for(k=j+1; k<size; k++){
          //console.log("k is " + k);
          var y=values[i][k];
          if(!y){
            continue;
          }
          values[i][j]=y;
          values[i][k]=null;
          break;
        }
      }
    }
  }
}


function addLeft(){
  for(i=0;i<size;i++){
    for(j=0;j<size-1;j++){
      var current = values[i][j];
      var next = values[i][j+1];
      if(current && next && current == next){
        values[i][j] = current + next;
        values[i][j+1] = null;
        if (checkWin(values[i][j])){
          return;
        }
      }
    }
  }
}



function moveUp(){
  var i, j, k;
  for (i=0;i<size;i++){//column
    for(j=0;j<size;j++){//row
      //console.log("j is " + j);
      var x=values[j][i];
      if(!x){
        for(k=j+1; k<size; k++){
          //console.log("k is " + k);
          var y=values[k][i];
          if(!y){
            continue;
          }
          values[j][i]=y;
          values[k][i]=null;
          break;
        }
      }
    }
  }
}


function addUp(){
  for(i=0;i<size;i++){//column
    for(j=0;j<size-1;j++){//row
      var current = values[j][i];
      var next = values[j+1][i];
      if(current && next && current == next){
        values[j][i] = current + next;
        values[j+1][i] = null;
        if (checkWin(values[j][i])){
          return;
        }
      }
    }
  }
}


function moveDown(){
  var i, j, k;
  for (i=0;i<size;i++){//column
    for(j=size-1;j>=0;j--){//row
      //console.log("j is " + j);
      var x=values[j][i];
      if(!x){
        for(k=j-1; k>=0; k--){
          //console.log("k is " + k);
          var y=values[k][i];
          if(!y){
            continue;
          }
          values[j][i]=y;
          values[k][i]=null;
          break;
        }
      }
    }
  }
}

function addDown(){
  //console.log(values);
  for(i=0;i<size;i++){//column
    for(j=size-1;j>=1;j--){//row
      var current = values[j][i];
      var prev = values[j-1][i];
      if(current && prev && current == prev){
        values[j][i] = current + prev;
        values[j-1][i] = null;
        if (checkWin(values[j][i])){
          return;
        }
      }
    }
  }
}

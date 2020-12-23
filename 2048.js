//alert ('hi');
initialize();
drawTable();

function initialize(){
  var matrix=[6,6];

}

function drawTable(){
  var row=6;
  var col=6;
  var i, j;
  var mytable = document.getElementById('mytable');
  for(i=0;i<row;i++){
    var tablerow = mytable.insertRow(i);
    for (j=0; j<col; j++){
      var tablecol = tablerow.insertCell(j);
      //console.log("row" + (i+1) + " " + "col" + (j+1));
      //tablecol.innerHTML= ("row" + (i+1) + " " + "col" + (j+1));
      tablecol.width=50;
      tablecol.height=50;
      tablecol.innerHTML=' ';
    }
  }
}

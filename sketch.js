
var database;
var position;
var balloon;

function preload(){
  
  database = firebase.database();

  bg = loadImage("Hot Air Ballon-01.png");

  balon = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");

}

function setup(){

  createCanvas(1365,620);

  balloon = createSprite(280, 440);
  balloon.addAnimation("ok", balon);
  balloon.scale = 0.5;

  var ballposition = database.ref("balloon/position");
  ballposition.on("value", readPosition, showError);

}

function draw(){

  background(bg);

  strokeWeight(2);
  stroke("lightgreen");
  fill("blue");
  textSize(20);
  text("Use the arrow keys to move the Hot Air Balloon", 30, 30);

  if(position !== undefined){

  if(keyDown(LEFT_ARROW)){
    
    writePosition(-10, 0);

  }

  else if(keyDown(RIGHT_ARROW)){

    writePosition(10, 0);

  }

  else if(keyDown(UP_ARROW)){
      
    writePosition(0, -10);

    if (balloon.scale <1){
      
      balloon.scale = balloon.scale+0.05;
    
    }

  }

  else if(keyDown(DOWN_ARROW)){
      
    writePosition(0, 10);

    if(balloon.scale <1){

      writePosition(0, 10); 

    }
    
    if(balloon.scale >0.1){

      balloon.scale = balloon.scale-0.05;
    
    }
  }

}

  drawSprites();

}

function writePosition(x, y){

  database.ref('balloon/position').set({

    'x': balloon.x + x,
    'y': balloon.y + y,

  })

}

function readPosition(data){

  position = data.val();

  balloon.x = position.x;
  balloon.y = position.y;

}
  
function showError(){

  console.log("ERROR IN THE CODE");

}

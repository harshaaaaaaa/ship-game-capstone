var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg, restartimg;
var water, ship, helicopter, bomb;
var helicopterGroup, bombGroup;
var score = 0;



function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shipimg = loadImage("ship.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
  restartimg = loadImage ("gameOver.png");
}

 
function setup() {
  createCanvas(800, 450);
  bombGroup=new Group();
  helicopterGroup=new Group();
   
  
  //creating water ground
 water = createSprite(200,350,600, 600);
 water.addImage("flowing water", waterbg);
 water.velocityX = -4;
  //creating ship
  ship=createSprite(200,300, 50, 50);
  ship.addImage("player ship", shipimg);
  ship.scale =0.5;
  



  

  ship.setCollider("rectangle", 0, 0, 350, 350);
    

  //ship.debug = "true";

}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
  
    
  //gameState play
  if(gameState === PLAY){
    //increase score
    score = score + Math.round(frameCount/300);
  
   
    

    
    //Call user defined function
    if (keyDown("left")) {
      ship.x = ship.x - 20;
    }
    if (keyDown("right")) {
      ship.x = ship.x + 20;
    }
    
  
  spawnHelicopter();
  spawnBomb();
  if(bombGroup.isTouching(ship)){
    gameState = END;
  }
  }
  //gameState end
  else if(gameState === END){
    ship.addImage("player ship",restartimg)
    ship.x = 400;
    ship.y=300;
   //water velocity becomes zero
water.velocity = 0;
water.x= 200;
water.y =350;
   //destroy Helicopter group
   helicopterGroup.destroyEach ();
   //destroy bomb group
   bombGroup.destroyEach ();

   
}
  
    
  
  
 
 //for infinite background 
 if (water.position.x <300){
   water.position.x + 400;
 }
    if (water.x <300){
      water.x = width/2;
    }

    edges= createEdgeSprites();
    ship.collide(edges);

    drawSprites();
  
}
      
    



function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);
    
    helicopter.scale = 0.5;
    
    helicopterGroup.add(helicopter);
  }
}
function spawnBomb(){
  if (frameCount % 300 == 0) {
    bomb = createSprite(Math.round(random(20, 350),80, 200, 50));
    bomb.addImage("bomb", bombimg);
    bomb.scale=0.12;
    bomb.setVelocity (0,5);
    bombGroup.add(bomb);
 // create bombs at random position
 //use Math.random
}
}

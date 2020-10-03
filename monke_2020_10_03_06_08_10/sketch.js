
var monkey , monkey_running;
var ba ,bi, or, ob;
var FoodGroup, obstacleGroup;
var score;
var  invisibleGround, gr;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var opGroup, apGroup;
var score;
var ga,gg;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  mo = loadImage("sprite_3.png")
  
  bi = loadImage("banana.png");
  or = loadImage("obstacle.png");
  gr = loadImage("g.png");
  gg = loadImage("go.png");
}



function setup() {
  createCanvas(400, 500);
  
  monkey = createSprite(30, 450, 400, 20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;
  
  invisibleGround = createSprite(200, 490, 400, 10);
  invisibleGround.addImage("invisibleGround",gr);
  invisibleGround.x = invisibleGround.width / 2;
  
  opGroup = createGroup();
  apGroup = createGroup();
  
  monkey.setCollider("circle", 0, 0,280);
  monkey.debug = false
  
  gao = createSprite(200, 250);
  gao.addImage(gg);
  
  gao.scale = 0.5;
  
  score = 0
}


function draw() {
   background(256);
  
  text("Score: " + score, 300, 50);
  
  enemy();
  enemy2();
  
  if (gameState === PLAY) {
  
  if (keyDown("space") && monkey.y >= 361) {
      monkey.velocityY = -12;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(invisibleGround);
  
  invisibleGround.velocityX = -4;
  if (invisibleGround.x < 170) {
      invisibleGround.x = invisibleGround.width / 2;
    }
    
    gao.visible = false;
    
    if(apGroup.isTouching(monkey)){
      apGroup.destroyEach();
      score = score+1;
     
    }
  
    //monkey.addAnimation("monkey", monkey_running);
    
    if(opGroup.isTouching(monkey)){
      
     gameState = END;
    }
  } else if (gameState === END) {
    
    ba.velocityX = 0;
    ba.velocityY = 0;
    ob.velocityX = 0;
    invisibleGround.velocityX = 0;
    monkey.velocityY = 0;
    monkey.addImage("monkey",mo);
    gao.visible = true;
    if (mousePressedOver(gao)) {
      
      reset();

    }
    apGroup.destroyEach();
    opGroup.destroyEach();
  }
  drawSprites();
  
}

function reset() {

  gameState = PLAY;
  monkey.changeAnimation("monkey", monkey_running);
  score = 0;
}

function enemy(){
  if (frameCount % 300 === 0) {
    ob = createSprite(500,410, 10, 40);
    ob.addAnimation("o",or)
    ob.X = Math.round(random(100,300))
    ob.velocityX = -(8);
    ob.lifetime = 300;
    ob.scale  = 0.1;
    opGroup.add(ob);
  }
}

function enemy2(){
  if (frameCount % 301 === 0){
    ba = createSprite(300, 10, 10, 40);
    ba.addAnimation("ba",bi)
    ba.Y = Math.round(random(100,300))
    ba.velocityY = (6);
    ba.lifetime = 300;
    ba.scale = 0.1;
    ba.collide(invisibleGround);
    ba.velocityX = -4;
    apGroup.add(ba);
  }
}




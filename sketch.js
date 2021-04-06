var zombiegroup;
var zombieL,zombieR,zombieD,zombieU;
var bulletgroup;
var bullet;
var soldierright,soldierleft;
var soldire;
var bg;
var gameState=1, gameState=2, gameState=3;
var invisible;
var Lives=3;
var score = 0;
var zombieGroup;
var zombieimg;
var fountainimg,fountain2img,fountain3img,fountain4img;


function preload(){
soldierright=loadImage("soldire9.png");
soldierleft=loadImage("soldire 10.png");
fountainimg = loadImage("fountain.png");
fountain2img = loadImage("fountain.png");
fountain3img = loadImage("fountain.png");
fountain4img = loadImage("fountain.png");
zombieimg = loadImage("zombieimg2.jpg ");
bg=loadImage("green wall.jpg");
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight - 20);
  soldire = createSprite(displayWidth / 2, displayHeight / 2, 10, 10);
 
  soldire.addImage("soldier",soldierleft);
  soldire.scale = 0.18;
  soldire.setCollider("circle",100,0,300);
  soldire.debug=false;
  
 invisible=createSprite(soldire.x,soldire.y-15,10,10);
 invisible.setCollider("circle",0,0,30);
 invisible.visible=false;

  fountain1 = createSprite(30, 30, 20, 20);
  fountain1.addImage("fountainimg",fountainimg);
  fountain1.scale = 0.2;

  fountain2 = createSprite(displayWidth - 30, 30, 20, 20);
  fountain2.addImage("fountain2img",fountainimg);
  fountain2.scale = 0.2;

  fountain3 = createSprite(30, displayHeight - 70, 20, 20);
  fountain3.addImage("fountain3img",fountainimg);
  fountain3.scale = 0.2;

  fountain4 = createSprite(displayWidth - 50, displayHeight - 70, 20, 20);
  fountain4.addImage("fountain4img",fountainimg);
  fountain4.scale = 0.2;

  zombieL = createGroup();
  zombieR = createGroup();
  zombieD = createGroup();
  zombieU = createGroup();
  bulletgroup = new Group();
  zombieGroup=new Group();
}

function draw() {
  background(bg);
textSize(16);
text("Score:"+ score,displayWidth/30,40,40);
  text("Lives Left: "+Lives,displayWidth-200,40);
  invisible.x=soldire.x-20;
  invisible.y=soldire.y-20;

  var rand = Math.round(random(1, 2));
  if (World.frameCount % 100=== 0) {
    if (rand === 1) {
      ZombieLeft();
    }
    else if (rand === 2) {
      ZombieRight();
    }
  }

  if (keyDown(LEFT_ARROW)) {
    changePosition(-2, 0);
    soldire.addImage("soldier",soldierleft);
    gameState=1;
    soldire.setCollider("circle",100,0,300);
    soldire.scale=0.18;

    if(keyDown("space"))
    bulletLeft();
    
  }
  else if (keyDown(RIGHT_ARROW)) {
    changePosition(2, 0);
    soldire.addImage("soldier",soldierright);
    gameState=2;
    soldire.setCollider("circle",-100,0,300);
    soldire.scale=0.18;
    invisible.x=soldire.x+20;
  invisible.y=soldire.y-20;
   
    if(keyDown("space"))
    bulletRight();
   
   
  }
  else if (keyDown(UP_ARROW)) {
    changePosition(0, -2);
    if(keyDown("Space")){
    if(gameState===1){
bulletLeft();
    }
    else{
      bulletRight();
    }
  }
  }
  else if (keyDown(DOWN_ARROW)) {
    changePosition(0, +2);
    if(keyDown("Space")){
      if(gameState===1){
  bulletLeft();
      }
      else{
        bulletRight();
      }
    }
  }

  // console.log(bulletgroup);
  if (bulletgroup.isTouching(zombieL)) {
    zombieL.destroyEach();
    bulletgroup.destroyEach();
    console.log("touched");
  }
  if (bulletgroup.isTouching(zombieR)) {
    zombieR.destroyEach();
    bulletgroup.destroyEach();
    console.log("touched");
  }

  if(zombieGroup.collide(soldire)){
    Lives=Lives-1;
    zombieGroup.destroyEach();
  }

  if(Lives===0){
    soldire.destroy();
    zombieGroup.destroyEach();
    zombieGroup.clear();
    textSize(24);
    text("Mission Failed",displayWidth/2,displayHeight/2);
  }

  if (bulletgroup.isTouching(fountain1)) {
    fountain1.destroy();
    score = score+1;
    console.log("touched");
  }

  if (bulletgroup.isTouching(fountain2)) {
    fountain2.destroy();
    score = score+1;
    console.log("touched");
  
  }

  if (bulletgroup.isTouching(fountain3)) {
    fountain3.destroy();
    score = score+1;
    console.log("touched");
  }

  if (bulletgroup.isTouching(fountain4)) {
    fountain4.destroy();
    score = score+1;
    console.log("touched");
  }

  if(score===4){
    gameState=3;
    soldire.destroy();
    zombieGroup.destroyEach();
    zombieGroup.clear();
    stroke("black");
    textSize(24);
    text("Mission Passed",displayWidth/3,displayHeight/3);
   
  }
  drawSprites();

}

function changePosition(x, y) {
  soldire.x = soldire.x + x;
  soldire.y = soldire.y + y;
}

function ZombieRight() {

  var Zombie = new zombie(displayWidth, Math.round(random(50, displayHeight - 50)));
  Zombie.display();
  Zombie.addImage("zombieimg");
}

function ZombieLeft() {
  var Zombie = new zombieRight(0, Math.round(random(50, displayHeight - 50)));
  Zombie.display();
}

function bulletLeft() {
  bullet = createSprite(invisible.x, invisible.y, 10, 10);
  bullet.y = invisible.y;
  bullet.x = invisible.x;
  bullet.velocityX=-4;
  bullet.lifetime=500;
  bulletgroup.add(bullet);
}

function bulletRight() {
  bullet = createSprite(invisible.x, invisible.y, 10, 10);
  bullet.y = invisible.y;
  bullet.x = invisible.x;
  bullet.velocityX=4;
  bullet.lifetime=500;
  bulletgroup.add(bullet);
}
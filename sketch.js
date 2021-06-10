//Welcome to game of rocket to the moon

//declaring the variables
var rocket,rocketimg;
var backimg,back;
var aleinGroup,alien1,alien2,alien3,alien4;
var gamestate="serve";
var score=0;
var bulletimg,bulletgroup;
var d = 0;
var moon,moonimg;
var checkPointSound;
var shoot;
var die;


function preload(){
  
  //loading the image for the rocket
  rocketimg = loadImage("download.png");
  
  //loading the image for the background
  backimg = loadImage("back.jpg");
  
  //loading the images for the aliens
  alien1 = loadImage("alien1-1.png");
  alien2 = loadImage("alien2-1.png");
  alien3 = loadImage("alien3-1.png");
  alien4 = loadImage("alien4-1.png");
  
  //loading the image for the bullet
  bulletimg = loadImage("bullet.png");
  
  //loading the image for the moon
  moonimg = loadImage("moon.png");
  
  //loading the sound
  checkPointSound = loadSound("checkPoint.mp3");
  
  shoot = loadSound("shoot.mp3");
  
  die = loadSound("die.mp3")
  
  
}

function setup() {
  
  //creating the canvas
  createCanvas(600,600);
  
  //adding the background image
  back = createSprite(300,300);
  back.addImage(backimg);
  back.scale=1.2;
  back.velocityY = 50;
  
  
  //creating the rocket
  rocket = createSprite(500,500);
  rocket.addImage(rocketimg); 
  rocket.scale = 0.4;
  
  //creating the moon
  moon = createSprite(50,50,20,20);
  moon.addImage(moonimg);
  //making the moon invisible
  moon.visible = false;
  
  //creating the alien group
  aleinGroup = new Group();
  
  //creating the bullet group 
  bulletgroup = new Group();
  
  

}

function draw() {
  background(0);
  
  if(gamestate === "serve"){
    
    fill("lightblue");
    textSize(30);
    text("🚀 Travel To The Moon 🌙👽",100,50);
    textSize(20);
    text("Instructions :" ,250,100);
    text("Try Your Best To Reach The Moon 🌙",140,150);
    text("You Need To Travel 384,400 Kms To Reach The Moon !!",60,200);
    text("Press Space Key To Shoot The Aliens 🔫",100,300);
    text("Navigate Your Rocket With Left Arrow And Right Arrow Keys",30,350);
    text("Be Aware Of Aliens.👾👽",200,250);
    text("Get Ready To Play The Game 🎮🎮 !! All The Best",60,400);
    text("Press Space To Start Your Journey In The Rocket To The Moon",20,500);
    
    
    if(keyDown("space")){
      gamestate = "play";
    }
  }
  
  
  if(gamestate === "play"){
    score = score + Math.round(getFrameRate()/60*100);
    
    
   
  
  
  if(back.y>400){
    back.y=height/2;
  }
   if(keyDown("left")){
    rocket.x= rocket.x -3;
  }
  if(keyDown("right")){
    rocket.x= rocket.x +3;
  }
    if(score%10000 === 0){
       checkPointSound.play() 
    }
   if(keyWentDown("space")){
     spawnbullet();
     shoot.play();
   } 
  
  
  
  
  
  aliens();
  
  
  if(rocket.isTouching(aleinGroup) || rocket.y>600 || rocket.x>600 || rocket.x<0 || rocket.y<0 ){
    gamestate = "end";
    aleinGroup.destroyEach();
    rocket.destroy();
    bulletgroup.destroyEach();
    die.play();
  }
  
    if(bulletgroup.isTouching(aleinGroup)){
     aleinGroup.destroyEach(); 
      d = d+1;
}
    if(aleinGroup.y>600){
      gamestate = "end";
    }
    if(score>=374400){
      moon.visible=true;
    }
    if(score>=384400){
      gamestate = "win";
    }
    
    
    
    
    
  
  
  
  
 drawSprites();
  stroke("yellow");  
  fill("yellow");  
  textSize(14);
  text("Distance Travelled(in kms) : "+ score, 350,50); 
  text("Aliens Destroyed: "+d,350,70);  
  
  }
  
  
  if(gamestate === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Oops, Aliens Got You !! Game Over 💥💥",20,300);
    textSize(20);
    text("Distance Travelled : "+score,300,50);
    
  }
  if(gamestate === "win"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("You Have Reached The Moon 🚀🌙🏆",50,300);
    textSize(20);
    text("Distance Travelled : "+score,300,50);
    
  }
  
  
}
function spawnbullet(){
  var bullet= createSprite(100, 100, 60, 10);
  bullet.addImage(bulletimg);
  bullet.y = 460;
  bullet.x=rocket.x;
  bullet.velocityY = -4;
  bullet.lifetime = 100;
  bullet.scale = 0.05;
  bullet.lifetime = 200;
  bulletgroup.add(bullet);
}
function aliens(){
  if(frameCount%120 === 0){
   var alien = createSprite(600,-50,40,10);
    alien.x = Math.round(random(30,570));
    alien.velocityY = (6 + 3*score/10000);
    alien.lifetime = 200;
    
    aleinGroup.add(alien);
    
    
  
  var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: alien.addImage(alien1);
              break;
       case 2: alien.addImage(alien2);
              break;
      case 3: alien.addImage(alien3);
              break;
      case 4: alien.addImage(alien4);
              break;
              
      default: break;
    
    
      
    }
    
    
  }
  
}
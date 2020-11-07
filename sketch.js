var sword, swordImage;
var PLAY = 1;
var END = 0
var gameState = PLAY;
var score;
var fruitGroup, fruit, fruit1, fruit2, fruit3, fruit4, position1, position2;
var alienGroup, alienImage, alien, alien1, alien2;
var gameOver, gameOverImage;
var knifeSwooshSound,gameOverSound;

function preload() {
  swordImage = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  gameOverImage = loadImage("gameover.png");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");

}

function setup() {
  createCanvas(600, 600);

  sword = createSprite(40, 200, 20, 20);
  sword.addImage("sword", swordImage);
  sword.scale = 0.7;

  gameOver = createSprite(300, 200);
  gameOver.addImage(gameOverImage);

  score = 0;

  fruitGroup = new Group();
  alienGroup = new Group();

}

function draw() {
  background("yellow");

  //move the sword with mouse
  sword.y = World.mouseY;
  sword.x = World.mouseX;


  if (gameState === PLAY) {
    if (sword.isTouching(alienGroup)) {
      gameState = END;
      //gameOver Sound
      gameOverSound.play()

    }
    //calling the fruit and alien
    fruit();
    alien();

    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score = score + 2
    }

    gameOver.visible = false;


  } else if (gameState === END) {
    fruitGroup.destroyEach();
    alienGroup.destroyEach();
    sword.destroy();

    fruitGroup.setVelocityXEach = 0;
    alienGroup.setVelocityXEach = 0;

    gameOver.visible = true;
   
  }


  drawSprites();
  //displaying score
  text("Score: " + score, 450, 30)
}

function fruit() {
  if (frameCount % 60 === 0) {
    var fruit = createSprite(400, 200, 20, 20);
    fruit.velocityX = -4;
    fruit.scale = 0.2;
    //fruit.debug = true;  

    var rand = Math.round(random(1, 4));
    fruit.y = Math.round(random(50, 340));

if (rand == 1) {
      fruit.addImage(fruit1);
    } else if (rand == 2) {
      fruit.addImage(fruit2);
    } else if (rand == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    fruit.setLifetime = 250;
    fruitGroup.add(fruit);

     var position = Math.round(random(1,2));
  
  if(position==1){
    fruit.x = 400
    fruit.velocityX = -(7+(score/4));
  }
  else
  {
    if(position==2){
      fruit.x = 0;
      
  //Increase the velocity of fruit after score of 4 or 10
    fruit.velocityX= (7+(score/4));
      
    }
  }
    
  }
  
}



function alien() {
  if (frameCount % 200 === 0) {
    var alien = createSprite(400, 200, 20, 20);
    var rand = Math.round(random(1, 2));
    alien.y = Math.round(random(100, 300));
    if (rand == 1) {
      alien.addImage(alien1);
    } else {
      alien.addImage(alien2);
    }
    alien.velocityX = -(8 + (score / 10));
    alien.setLifetime = 50;
    alienGroup.add(alien);
  }

}
var monkey , monkey_running
var banana ,bananaImage, rock, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var ground;
var survivalTime=0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}



function setup() {
    createCanvas(670,550);
  
    monkey = createSprite(80,355,20,20);
  monkey.addAnimation("running", monkey_running);  
  monkey.scale = 0.14;
  
  ground=createSprite(400,510,1400,10);
  ground.x = ground.width/2;
  ground.shapeColor=("lime");
  ground.velocityX=-1;
  ground.visible=true;
  
  obstacleGroup=createGroup();
  foodGroup = createGroup();
}


function draw() {
  background("red");
  
  bananas();
  obstacles();
    
  if(keyDown("space")&& monkey.y >= 150) {
    monkey.velocityY = -12;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);

  if (foodGroup.isTouching(monkey)){
    score=score+2;
    foodGroup.destroyEach();
    }
  
  if (obstacleGroup.isTouching(monkey)){
        obstacleGroup.destroyEach();   
    score=score-1;
  }
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    drawSprites();
     
  stroke("Black");
  textSize(20);
  fill("white");
  text("Score: "+ score, 50,20);
  
  stroke("black");
  textSize(20);
  fill("white");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 500,20);
}

function bananas() {
  if (frameCount % 120 === 0){
  banana=createSprite(600,110,10,10);
    banana.y = Math.round(random(120,400));
  banana.addImage(bananaImage);
  banana.scale=0.12;
  banana.velocityX=-5;
  banana.lifetime = 200;  
  foodGroup.add(banana);
  }
}
function obstacles() {
  if (frameCount % 200 === 0){
  rock=createSprite(700,490,10,10);
  rock.addImage(obstacleImage);
  rock.scale=0.12;
  rock.velocityX=-4;
  rock.lifetime = 200;
  obstacleGroup.add(rock);

  }
}
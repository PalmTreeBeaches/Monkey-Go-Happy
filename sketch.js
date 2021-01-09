var monkey, monkeyRunning;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score, survivalTime;


function preload() {

  monkeyRunning = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(600, 600);
  survivalTime = 0;

  monkey = createSprite(50, 500, 900, 10);
  monkey.addAnimation("moving", monkeyRunning);
  monkey.scale = 0.1;
  
  banana = createSprite(620,250,40,10);

  ground = createSprite(400, 500, 900, 10);
  ground.veloctiyX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);
  

  foodGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
}

function draw() {
  background(255)

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);
  spawnFood();
  spawnObstacles();
  

  drawSprites();
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: " + score, 500, 50);

  if(monkey.isTouching(foodGroup)){
    score=score+1;
  }
  
  if (obstacleGroup.isTouching(monkey)) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);

  
  }
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / 20);
  text("Survival Time: " + survivalTime, 0, 50);
}

function spawnFood() {
  if (frameCount % 60 === 0) {
    banana = createSprite(620,250,40,10);
    banana.y = random(100,400);    
    banana.velocityX = -5;
  }
  
  monkey.depth=banana.depth+1;
   
  banana.addImage(bananaImage);
  banana.scale=0.07;
  
  foodGroup.add(banana);
}

function spawnObstacles() {  
  if(frameCount % 150 === 0) {
    obstacle = createSprite(800,450,10,40);
    obstacle.velocityX = -8;
   
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
     
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}

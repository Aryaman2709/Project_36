//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var button, add;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1600, 500);
  database = firebase.database();

  foodStock = database.ref('food')
  foodStock.on("value",readStock);

  foodObj = new Food();

  feed = createButton("Feed The Dog");
  feed.position(700,95); 
  feed.mousePressed(feedDog); 

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  dog = createSprite(850,250,50,50);
  dog.addImage(dogImage);
  dog.scale = 0.25
  
}


function draw() { 
  background(46,139,87); 

  foodObj.display();

  fedTime = database.ref('feedTime');
  fedTime.on("value", (data)=>{
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12 + "PM", 350, 30)
  }else if(lastFed===0){
    text("Last Feed: 12 AM", 350,30);
  }else{
    text("Last Feed: "+lastFed+"AM", 350,30)
  }

  //feed.mousePressed(()=>{
    //feedDog();
    //foodObj.deductFood();
    
  //})

  //addFood.mousePressed(()=>{
    //addFoods();
  //})

  drawSprites();
  fill("black");
  textSize(20);
  text("Food Remaining: "+foodS, 160, 450);
  //text("Press Up Arrow key to feed Drago Milk", 100,50);
  //add styles here

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImage);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food :foodObj.getFoodStock(),
    feedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food: foodS
  })
}


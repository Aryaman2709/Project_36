class Food{
    constructor(){
        this.foodStock= 50;
        this.lastFed;
        this.image =   loadImage("images/Milk.png");
    }

    display(){
        var x = 80;
        var y = 100;

        imageMode(CENTER);
        image(this.image, 720,220, 70,70);

        if(this.foodStock != 0){
            for(var i = 0; i< this.foodStock; i++){
                if(i%10===0){
                    x = 80;
                    y = y+50;
                }
                image(this.image, x, y, 50,50);
                x = x+30;
            }
        }
    }

    getFoodStock(){
        //var foodStockRef = database.ref('food');
        //foodStockRef.on("value", (data)=>{
           // this.foodStock = data.val();
        //})
        return this.foodStock;
    }

    updateFoodStock(foodStock){
       // database.ref('/').update({
           // food: x
        //})
        this.foodStock = foodStock;
    }

    deductFood(){
         if(this.foodStock>0){ 
             this.foodStock=this.foodStock-1; 
            }
         }

    getSetTime(lastFed){
        this.lastFed = lastFed;

    }

}
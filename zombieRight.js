class zombieRight {
    constructor(x, y) {
      this.zombie=createSprite(x,y,40,50);
      this.width = 40;
      this.height = 50;
     
    }
    display(){
      zombieR.add(this.zombie);
  this.zombie.velocityX=1;
  zombieGroup.add(this.zombie);
 //this.zombie.velocityY= 2
    }
  };
  
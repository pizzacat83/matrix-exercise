class Random{
    constructor(seed=20182133){
        this.y=seed;
    }
    rand(){
        this.y=this.y^(this.y<<13);
        this.y=this.y^(this.y>>17);
        this.y=this.y^(this.y<<15);
        return this.y;
    }
    randrange(begin,end){ //range的なのでbegin<=res<end
        return Math.abs(this.rand())%(end-begin)+begin;
    }
}

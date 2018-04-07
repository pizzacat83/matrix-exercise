var now=new Date;
var seed0=now.getFullYear()*10000+(now.getMonth()+1)*100+now.getDate(); //yymmdd

seedbox = document.getElementById("seed");
seedbox.value = seed0;

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


function generateProblems(){
    matrices=[];
    seed=seedbox.value;
    random=new Random(seed);
    for(var _=0; _<5;_++){
        maxsize=parseInt(document.getElementById("maxsize").value);
        maxnum=parseInt(document.getElementById("maxnum").value);
        minnum=parseInt(document.getElementById("minnum").value);

        r=parseInt(random.randrange(1,maxsize+1));
        c=parseInt(random.randrange(1,maxsize+1));
        rc=parseInt(random.randrange(1,maxsize+1));
        //A:縦r横rc B: 縦rc横c
        A=[];
        for(var i=0; i<r;i++){
            t=[];
            for(var j=0; j<rc; j++){
                t.push(random.randrange(minnum,maxnum+1));
            }
            A.push(t);
        }
        B=[];
        for(var i=0; i<rc;i++){
            t=[];
            for(var j=0; j<c; j++){
                t.push(random.randrange(minnum,maxnum+1));
            }
            B.push(t);
        }
        matrices.push([A,B]);
    }
}


function mat2str(mat){
    t=[];
    for(var i=0; i<mat.length; i++){
        t.push(mat[i].join(separator="&"))
    }
    return t.join(separator="\\\\")
}


function printProblems(){
    for(var i=0;i<5;i++){
        document.getElementById("problem"+i).textContent="\\(\\begin{pmatrix}"+mat2str(matrices[i][0])+"\\end{pmatrix}\\begin{pmatrix}"+mat2str(matrices[i][1])+"\\end{pmatrix}\\)";
        document.getElementById("button"+i).style.display="inline";
        document.getElementById("answer"+i).textContent="";
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}


function printAnswer(i){
    document.getElementById("button"+i).style.display="none";
    document.getElementById("answer"+i).textContent="\\(=\\begin{pmatrix}"+mat2str(math.multiply(matrices[i][0],matrices[i][1]))+"\\end{pmatrix}\\)";
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}


function newProblems(){
    generateProblems();
    printProblems();
}


newProblems();
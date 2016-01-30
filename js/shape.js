function shape(canvas,canvas1,cobj,xpobj,selectobj){
    this.canvas=canvas;
    this.canvas1=canvas1;
    this.cobj=cobj;
    this.xpobj=xpobj;
    this.selectobj=selectobj;
    this.bgcolor="#000";
    this.borderColor="#000";
    this.lineWidth=1;
    this.type="stroke";
    this.shapes="line";
    this.history=[];
}
 shape.prototype={
    init:function(){
        this.xpobj.css("display","none");
        this.selectobj.css("display","none");
        if (this.temp) {
            this.history.push(this.cobj.getImageData(0, 0, this.canvas1.width,this.canvas1.height));
            this.temp = null;
        }
        this.cobj.fillStyle=this.bgcolor;
        this.cobj.strokeStyle=this.borderColor;
        this.cobj.lineWidth=this.lineWidth;
    },
    line:function(x,y,x1,y1){
        var that=this;
        that.cobj.beginPath();
        that.cobj.moveTo(x,y);
        that.cobj.lineTo(x1,y1);
        that.cobj.stroke();
        that.cobj.closePath();
    },
    rect:function(x,y,x1,y1){
        var that=this;
        that.cobj.beginPath();
        that.cobj.rect(x,y,x1-x,y1-y);
        that.cobj.closePath();
        that.cobj[that.type]();
    },
    arc:function(x,y,x1,y1){
        var that=this;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        that.cobj.beginPath();
        that.cobj.arc(x,y,r,0,Math.PI*2);
        that.cobj.closePath();
        that.cobj[that.type]();
    },
     five:function(x,y,x1,y1){
         var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
         var r1=r/2;
         this.init();
         this.cobj.beginPath();
         this.cobj.moveTo(x+r,y);
         for(var i=0;i<10;i++){
             if(i%2==0){
                 this.cobj.lineTo(x+Math.cos(i*36*Math.PI/180)*r,y+Math.sin(i*36*Math.PI/180)*r)
             }else{
                 this.cobj.lineTo(x+Math.cos(i*36*Math.PI/180)*r1,y+Math.sin(i*36*Math.PI/180)*r1)
             }

         }
         this.cobj.closePath();
         this.cobj.stroke();
         this.cobj[this.type]();
     },
    draw:function(){
        var that=this;
        that.init();
        that.canvas.onmousedown=function(e){
            that.init();
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.canvas.onmousemove=function(e){
                that.cobj.clearRect(0,0,that.canvas1.width,that.canvas1.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                var endx= e.offsetX;
                var endy= e.offsetY;
                //调用样式：
                that.init();
                //画图方法
                that[that.shapes](startx,starty,endx,endy);
            }
            that.canvas.onmouseup=function(){
               that.history.push( that.cobj.getImageData(0,0,that.canvas1.width,that.canvas1.height));
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
            }
        }
    },
     pen:function() {
         var that = this;
         that.canvas.onmousedown = function (e) {
             var startx = e.offsetX;
             var starty = e.offsetY;
             that.init();
             that.cobj.beginPath();
             that.cobj.moveTo(startx, starty);
             that.canvas.onmousemove = function (e) {
                 var endx = e.offsetX;
                 var endy = e.offsetY;
                 that.cobj.lineTo(endx, endy);
                 that.cobj.stroke();
             }
             that.canvas.onmouseup = function () {
                 that.history.push(that.cobj.getImageData(0, 0, that.canvas1.width, that.canvas1.height));
                 that.cobj.closePath();
                 that.canvas.onmousemove = null;
                 that.canvas.onmouseup = null;
             }
         }
     },
     xp:function(xpobj,w,h){
         var that=this;
         that.canvas.onmousemove=function(e){
             var ox= e.offsetX;
             var oy= e.offsetY;
             xpobj.css({
                 display:"block",
                 width:w,
                 height:h
             })
             var ox= e.offsetX;
             var oy= e.offsetY;
             var lefts=ox-w/2;
             var tops=oy-h/2;
             if(lefts<0){
                 lefts=0;
             }
             if(lefts>that.width-w){
                 lefts=that.width-w;
             }
             if(tops<0){
                 tops=0;
             }
             if(tops>that.height-h){
                 tops=that.height-h;
             }
             xpobj.css({
                 left:lefts,
                 top:tops
             })
         }
         that.canvas.onmousedown=function(){
             that.canvas.onmousemove=function(e){
                 xpobj.css({
                             display:"block",
                             width:w,
                             height:h
                         })
                 var ox= e.offsetX;
                 var oy= e.offsetY;
                 var lefts=ox-w/2;
                 var tops=oy-h/2;
                 if(lefts<0){
                     lefts=0;
                 }
                 if(lefts>that.width-w){
                     lefts=that.width-w;
                 }
                 if(tops<0){
                     tops=0;
                 }
                 if(tops>that.height-h){
                     tops=that.height-h;
                 }
                 xpobj.css({
                     left:lefts,
                     top:tops
                 })
                 that.cobj.clearRect(lefts,tops,w,h);
             }
             that.canvas.onmouseup=function(){
                 xpobj.css("display","none");
                 that.history.push( that.cobj.getImageData(0,0,that.canvas1.width,that.canvas1.height));
                 that.canvas.onmousemove = null;
                 that.canvas.onmouseup = null;
             }
         }

     },
     select:function(selectareaobj){
         var that=this;
         that.init();
         that.canvas.onmousedown=function(e){
             that.init();
             var startx= e.offsetX;
             var starty= e.offsetY,minx,miny,w,h;
             that.canvas.onmousemove=function(e){
                 var endx= e.offsetX;
                 var endy= e.offsetY;
                 minx=startx>endx?endx:startx;
                  miny=starty>endy?endy:starty;
                 w=Math.abs(startx-endx);
                 h=Math.abs(starty-endy);
                 selectareaobj.css({
                     display:"block",
                     left:minx,
                     top:miny,
                     width:w,
                     height:h
                 })
             }
             that.canvas.onmouseup=function(){
                 that.canvas.onmousemove = null;
                 that.canvas.onmouseup = null;
                 that.temp=that.cobj.getImageData(minx,miny,w,h);
                 that.cobj.clearRect(minx,miny,w,h);
                 that.history.push(that.cobj.getImageData(0,0,that.canvas1.width,that.canvas1.height));
                 that.cobj.putImageData(that.temp,minx,miny);
                 that.drag(minx,miny,w,h,selectareaobj);
             }
         }
     },
     drag:function(x,y,w,h,selectareaobj){
         var that=this;
         that.canvas.onmousemove=function(e){
             var ox= e.offsetX;
             var oy= e.offsetY;
             if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                 that.canvas.style.cursor="move";
             }else{
                 that.canvas.style.cursor="default";
             }
         }
         that.canvas.onmousedown=function(e){
             var ox= e.offsetX;
             var oy= e.offsetY;
             var cx=ox-x;
             var cy=oy-y;
             if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                 that.canvas.style.cursor="move";
             }else{
                 that.canvas.style.cursor="default";
                 return;
             }
             that.canvas.onmousemove=function(e){
                 that.cobj.clearRect(0,0,that.cobj.width,that.cobj.height);
                 if(that.history.length!=0){
                     that.cobj.putImageData(that.history[that.history.length-1],0,0);
                 }
                 var endx= e.offsetX;
                 var endy= e.offsetY;
                 var lefts=endx-cx;
                 var tops=endy-cy;
                 if(lefts<0){
                     lefts=0;
                 }
                 if(lefts>that.width-w){
                     lefts=that.width-w
                 }

                 if(tops<0){
                     tops=0;
                 }
                 if(tops>that.height-h){
                     tops=that.height-h
                 }
                 selectareaobj.css({
                     left:lefts,
                     top:tops
                 });
                 x=lefts;
                 y=tops;
                 that.cobj.putImageData(that.temp,lefts,tops);
                 }
                 that.canvas.onmouseup=function(){
                     that.canvas.onmousemove = null;
                     that.canvas.onmouseup = null;
                     that.drag(x,y,w,h,selectareaobj)


                 }

         }

     }


}

var fillFlag=0;//   initialise fillFlag zero for border
var eraserWidth=10;

//Canvas initialization

var canvas = document.getElementById("canvas");
var context=canvas.getContext('2d');
context.lineWidth=1;

// function to make eraser size normal
function eraserNormal(){
	eraserWidth=10;
} 

// function to increase eraser size

function eraserPlus(){
	eraserWidth = eraserWidth + 5;
}

// function to decrease eraser size

function eraserMinus(){
	if(eraserWidth>10){
		earserWidth = eraserWidth - 5;
	}
}
//Function to make pixel size normal

function pixelNormal(){
context.lineWidth=1;
}

//Function to increase pixel size

function pixelPlus(){
		context.lineWidth=context.lineWidth+2;
}
//Function to decrease pixel size

function pixelMinus(){
	if(context.lineWidth>1){
		context.lineWidth=context.lineWidth-1;
	}
}

//Fill checking

function fill(){
fillFlag=1;
} 

//Border checking

function border(){
fillFlag=0;
}


//funtion for Save save image as png file format

function save() {
  var imgg=canvas.toDataURL("image/png");
  window.location = imgg;
}


//function for clear screen 

function clearScreen(){
context.clearRect(0,0,canvas.width,canvas.height);
}

//function for drawRectangle 

function rectangle(){
	canvas.onmousedown=rectDown;
	canvas.onmouseup=rectUp;
	canvas.onmousemove=rectMove;
	var draw=false;
	function rectDown(e){
 		imageData=context.getImageData(0,0,canvas.width,canvas.height);
 		startX= e.x - this.offsetLeft;
 		startY=e.y - this.offsetTop;
 		draw=true;
	}
	function rectUp(e){
		draw=false;
	}
	function rectMove(e){
		if (draw){
			context.putImageData(imageData,0,0);
			rectWidth=(e.x - this.offsetLeft)-startX;
			rectHeight=(e.y - this.offsetTop)-startY;
			if(fillFlag==0){			
				context.strokeRect(startX,startY,rectWidth,rectHeight);
			}else{
				context.fillRect(startX,startY,rectWidth,rectHeight);
			}
		}
	}
}

//functon for darwPencil tool

function pencil(){
	canvas.onmousedown=pencilDown;
	canvas.onmouseup=pencilUp;
	canvas.onmousemove=pencilMove;

	var draw1=false;
	function pencilDown(e){
		startX=e.x;
		startY=e.y;
		draw1=true;
	}
	function pencilUp(){
		draw1=false;
	}
	function pencilMove(event){
	if (draw1){
   		newX =event.x;
   		newY =event.y;
   		context.beginPath();
   		context.moveTo(startX,startY);
   		context.lineTo(newX,newY);
   		context.stroke();
   		context.closePath();
   		startX=newX;
   		startY=newY;
	 }
	}
}


//function for darwLine tool

function line(){
	canvas.onmousedown=linedown;
	canvas.onmouseup=lineup;
	canvas.onmousemove=linemove;
	var draw2=false;	
	function linedown(e){
 		imageData=context.getImageData(0,0,canvas.width,canvas.height);
 		startX=e.x;
 		startY=e.y;
 		draw2=true;
	}
	function lineup(e){
 		draw2=false;
	}
	function linemove(e){
 		if (draw2){
 			context.putImageData(imageData,0,0);
 			endX=e.x;
 			endY=e.y;
 			context.beginPath();
 			context.moveTo(startX,startY);
 			context.lineTo(endX,endY);
 			context.stroke();
 			context.closePath();
		}
	}
}



//functon for circle tool

function circle(){
	canvas.onmousedown=circleDown;
	canvas.onmouseup=circleUp;
	canvas.onmousemove=circleMove;
	var draw3=false;
	function circleDown(e){
 		imageData=context.getImageData(0,0,canvas.width,canvas.height);
		startX= e.x - this.offsetLeft;
 		startY=e.y - this.offsetTop;
 		draw3=true;
	}
	function circleUp(e){
		draw3=false;
	}
	function circleMove(e){
		if (draw3){
			context.putImageData(imageData,0,0);
		
			rectWidth=(e.x - this.offsetLeft)-startX;
			rectHeight=(e.y - this.offsetTop)-startY;
	 
			var radius=Math.sqrt(rectWidth*rectWidth+rectHeight*rectHeight)/2;
			context.beginPath();
			context.arc(startX,startY,radius,0,2*Math.PI);			

			context.closePath();
			context.stroke();
			if (fillFlag==1){
				context.fill();
			}
		}
	}
}

// functon for Color select tool

function selectColor(myColour){
context.strokeStyle=myColour;
context.fillStyle=myColour;
}


//function for Brush tool

function brush(){
	canvas.onmousedown=brushDown;
	canvas.onmouseup=brushUp;
	canvas.onmousemove=brushMove;
	var draw4=false;
	function brushDown(e){
		draw4=true;
	}
	function brushUp(e){
		draw4=false;
	}
	function brushMove(e){
		if (draw4){
 			x=e.x;
		  	y=e.y;
 			context.beginPath();
 			for(var i=0;i<5;i=i+0.1){
				context.arc(x+i,y+i,2, 0, Math.PI*2, true);
			}
			context.closePath();
			context.fill();
		}
	}
}

//function for eraser tool
function eraser(){
	canvas.onmousedown=eraserDown;
	canvas.onmouseup=eraserUp;
	canvas.onmousemove=eraserMove;
	var draw5=false;	
	function eraserDown(e){
		draw5=true;
	}
	function eraserUp(e){
		draw5=false;
	}
	function eraserMove(e){
		if(draw5){
			x=e.x;
			y=e.y;
			context.clearRect(x,y,eraserWidth,eraserWidth);
		}
	}
}

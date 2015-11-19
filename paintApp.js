
var fillFlag=0;		//   initialise fillFlag zero for border
var eraserWidth=10;	//   initialise eraser width
 
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
	if(eraserWidth > 10){
		earserWidth = eraserWidth - 5;
	}
}
//Function to set pixel size normal

function pixelNormal(){
	context.lineWidth=1;
}

//Function to increase pixel size

function pixelPlus(){
		context.lineWidth=context.lineWidth+1;
}
//Function to decrease pixel size

function pixelMinus(){
	if(context.lineWidth > 1){
		context.lineWidth=context.lineWidth-1;
	}
}

//Fill initialization

function fill(){
	fillFlag=1;
} 

//Border initialization

function border(){
	fillFlag=0;
}


//funtion for Save save image as png file format

function save() {
	  var new_image=canvas.toDataURL("image/png");
	  window.location = new_image;
}


//function for clear screen 

function clearScreen(){
	context.clearRect(0,0,canvas.width,canvas.height);
}

// functon for Color selection

function selectColor(myColour){
	
	context.strokeStyle=myColour;
	context.fillStyle=myColour;
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

//functon for darwPencil

function pencil(){
	
	canvas.onmousedown=pencilDown;
	canvas.onmouseup=pencilUp;
	canvas.onmousemove=pencilMove;

	var draw=false;
	function pencilDown(event){

		startX=event.clientX - canvas.getBoundingClientRect().left; 
		startY=event.clientY - canvas.getBoundingClientRect().top;
		draw=true;
	}
	function pencilUp(){
		draw=false;
	}
	function pencilMove(event){
	   if (draw){
		newX=event.clientX - canvas.getBoundingClientRect().left; 
		newY=event.clientY - canvas.getBoundingClientRect().top;
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


//function for darwLine 

function line(){

	canvas.onmousedown=linedown;
	canvas.onmouseup=lineup;
	canvas.onmousemove=linemove;
	var draw=false;	
	function linedown(event){
 		imageData=context.getImageData(0,0,canvas.width,canvas.height);

		startX=event.clientX - canvas.getBoundingClientRect().left; 
		startY=event.clientY - canvas.getBoundingClientRect().top;
 		draw=true;
	}
	function lineup(e){
 		draw=false;
	}
	function linemove(event){
 		if (draw){
 			context.putImageData(imageData,0,0);
			endX=event.clientX - canvas.getBoundingClientRect().left; 
			endY=event.clientY - canvas.getBoundingClientRect().top;
 			
			context.beginPath();
 			context.moveTo(startX,startY);
 			context.lineTo(endX,endY);
 			context.stroke();
 			context.closePath();
		}
	}
}

//functon for draw circle

function circle(){
	canvas.onmousedown=circleDown;
	canvas.onmouseup=circleUp;
	canvas.onmousemove=circleMove;
		
	var draw=false;
	function circleDown(e){
 		imageData=context.getImageData(0,0,canvas.width,canvas.height);
		startX= e.x - this.offsetLeft;
 		startY=e.y - this.offsetTop; 		
		draw=true;
	}
	function circleUp(e){
		draw=false;
	}
	function circleMove(e){
		if (draw){
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

//function for Brush 

function brush(){
	canvas.onmousedown=brushDown;
	canvas.onmouseup=brushUp;
	canvas.onmousemove=brushMove;
	
	var draw=false;
	function brushDown(e){
		draw=true;
	}
	function brushUp(e){
		draw=false;
	}
	function brushMove(e){
		if (draw){
 			x=event.clientX - canvas.getBoundingClientRect().left; 
			y=event.clientY - canvas.getBoundingClientRect().top;
		  	
 			context.beginPath();
 			for(var i=0;i<5;i=i+0.3){
				context.arc(x+i,y+i,2, 0, Math.PI*2, true);
			}
			context.closePath();
			context.fill();
		}
	}
}

//function for eraser 
function eraser(){
	canvas.onmousedown=eraserDown;
	canvas.onmouseup=eraserUp;
	canvas.onmousemove=eraserMove;
	var draw=false;	
	function eraserDown(e){
		draw=true;
	}
	function eraserUp(e){
		draw=false;
	}
	function eraserMove(event){
		if(draw){
			startX=event.clientX - canvas.getBoundingClientRect().left; 
			startY=event.clientY - canvas.getBoundingClientRect().top;
			context.clearRect(startX,startY,eraserWidth,eraserWidth);
		}
	}
}
//function for spray paint
function spray(){
	canvas.onmousedown=sprayDown;
	canvas.onmouseup=sprayUp;
	canvas.onmousemove=sprayMove;

	var draw=false;
	function sprayDown(event){

		startX=event.clientX - canvas.getBoundingClientRect().left; 
		startY=event.clientY - canvas.getBoundingClientRect().top;
		draw=true;
	}
	function sprayUp(){
		draw=false;
	}
	function sprayMove(event){
	   if (draw){
		newX=event.clientX - canvas.getBoundingClientRect().left; 
		newY=event.clientY - canvas.getBoundingClientRect().top;
		widthX=newX-startX;
		widthY=newY-startY;
		
		var len = 5 + ( Math.random() * 5 | 0 );

    		for( var i = 0; i < len; ++i ) {
   		
			context.beginPath();
			var radius=Math.sqrt(widthX*widthX+widthY*widthY)/2;
		
			context.arc(
	 	        startX + Math.cos( Math.random() * Math.PI * 2 ) * radius * Math.random(),
	 	        startY + Math.sin( Math.random() * Math.PI * 2 ) * radius * Math.random(),
	 	        1,0, Math.PI * 2, false);   		
		
			context.stroke();
   			context.closePath();
   			startX=newX;
   			startY=newY;
		}	 
      	   }
     }
}



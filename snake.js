var c = document.getElementById("arena");
var ctx = c.getContext("2d");
var x = 200;
var y = 200;
var dx = 0;
var dy = 0;
var x1 = (Math.floor(Math.random()*10))*40 + 10; // För att slumpa ut mat
var y1 = (Math.floor(Math.random()*10))*40 + 10; // --||--
var x2 = [];  // För att slumpa ut hinder
var y2 = [];  // --||--
var updateTime = 100;
var timer;
var startpause = 0;
var score = 0;
var level = 1;
var xorm = []; //Håller koll på vart ormen beffiner sig i x-led
var yorm = []; //--||-- i y-led
var matTimer = 10;


document.getElementById('page').addEventListener('keydown', keyListener);
document.getElementById("startknapp").addEventListener('click', starter);
document.getElementById("scorebox").innerHTML = "PoÃ¤ng: " + score + "<br>" + "Level: " + level + "<br>" + "Maten flyttas om: " + matTimer;

rektangel(ctx,x1,y1,10,10,"purple");

function starter () { // Ändrar värdet på startpause får att kunna byta startknappen till en stopknapp

	if (startpause == 1) {
		document.getElementById("startknapp").innerHTML = "Start";
		myStop();
		clearInterval(foodTimer);
		startpause = 0;
	}

	else if (startpause == 0) {
		document.getElementById("startknapp").innerHTML = "Pause";
		startpause++;
		myStart();
		foodTimer = setInterval(matFlyttare,1000);
	}
}

function myStart () { // Startar timern
	timer = setInterval(updateCanvas, updateTime);
}

function myStop () { // Stoppar timern
	clearInterval(timer);
}

function matFlyttare() {
	matTimer--;
	document.getElementById("scorebox").innerHTML = "PoÃ¤ng: " + score + "<br>" + "Level: " + level + "<br>" + "Maten flyttas om: " + matTimer;
	if (matTimer == 0) { // Om timern har nått noll så kommer maten att slumpas ut på en annan plats och timern ställs tillbaka
		x1 = (Math.floor(Math.random()*10))*40 + 10;
		y1 = (Math.floor(Math.random()*10))*40 + 10;
		for (var i = 9; i > -1; i--) {
			if (Math.abs(x1 - x2[i]) < 20 && Math.abs(y1 - y2[i]) < 20) {
				x1 = (Math.floor(Math.random()*10))*40 + 10;
				y1 = (Math.floor(Math.random()*10))*40 + 10;
			}
		}
		rektangel(ctx,x1,y1,10,10,"purple");
		matTimer = 10;
	}
	
}

function levelhandler (){// Ökar leveln, stoppar timern, uppdaterar timerns ticktid och startar den igen

	level++;
	myStop();
	updateTime = updateTime - 5;
	myStart();

	if (level % 2 == 0) { // Varannan level så kommer 10 hinder att slumpas ut
		for (var i = 9; i > -1; i--) {
			x2[i] = (Math.floor(Math.random()*10))*40 + 10;
			y2[i] = (Math.floor(Math.random()*10))*40 + 10;

			if (Math.abs(x2[i] - xorm[i]) < 20 && Math.abs(y2[i] - yorm[i]) < 20) { // Kollar om hindren slumpas ut på ormen
				x2[i] = (Math.floor(Math.random()*10))*40 + 10;
				y2[i] = (Math.floor(Math.random()*10))*40 + 10;
			}

			if (Math.abs(x1 - x2[i]) < 20 && Math.abs(y1 - y2[i]) < 20) { //Kollar om hindren slumpas ut på maten
				y2[i] = (Math.floor(Math.random()*10))*40 + 10;
				x2[i] = (Math.floor(Math.random()*10))*40 + 10;
			}
		}

	}
}


function headcheck () {
	
	if (x > 399 || x < 0) { // Kollar om ormen åker ut åt höger eller vänster
		myStop();
		window.alert("GAME OVER");
		reset();
	}

	if (y > 399 || y < 0) { // Kollar om ormen åker ut up eller ner
		myStop();
		window.alert("GAME OVER");
		reset();
	}

	for (var i = xorm.length; i > 0; i--) { // kollar om ormen krockar med sig själv
		if (xorm[0] == xorm[i] && yorm[0] == yorm[i]) {
		reset();
		myStop();
		window.alert("GAME OVER");
		break;
		}
	}	

	for (var i = x2.length-1; i > 0; i--) { // Kollar om huvudet på ormen krockar med ett av hindren
		if (xorm[0] == x2[i] && yorm[0] == y2[i]) {
			reset();
			myStop();
			window.alert("GAME OVER");
			break;
		}
	}	
}

function svans () {
	
	for (var i = 0; i < xorm.length; i++) {
		if (i==0) {
			rektangel(ctx,xorm[0],yorm[0],10,10,"blue");
		}//huvudet
		else if (i%2==0) {
			rektangel(ctx,xorm[i],yorm[i],10,10,"blue");
		}//svansen
		else  {
			rektangel(ctx,xorm[i],yorm[i],10,10,"green");
		}//svansen
	}

	for (var i = xorm.length-1; i > 0; i--) {
		xorm[i] = xorm[i-1];
		yorm[i] = yorm[i-1];
	}// Flyttar svansen 

y=y+dy;
x=x+dx;

xorm[0] = x;
yorm[0] = y;
	
}

function scorecheck () {

		if (Math.abs(x - x1) < 1 && Math.abs(y - y1) < 1) {//Kollar om maten är ligger på samma ruta som huvudet
			matTimer = 10;
			score++;
			xorm[score] = xorm[score-1];
		if (score % 5 == 0) {
			levelhandler();
		}
		document.getElementById("scorebox").innerHTML = "Poäng: " + score + "<br>" + "Level: " + level + "<br>" + "Maten flyttas om: " + matTimer;
		x1 = (Math.floor(Math.random()*10))*40 + 10;
		y1 = (Math.floor(Math.random()*10))*40 + 10;

		for (var i = xorm.length; i > 0; i--) {
			if (Math.abs(x1 - xorm[i]) < 50 && Math.abs(y1 - yorm[i]) < 50) {
				x1 = (Math.floor(Math.random()*10))*40 + 10;
				y1 = (Math.floor(Math.random()*10))*40 + 10;
				i = xorm.length+1;
			}
		}	

		for (var i = x2.length; i > 0; i--) {
			if (x1 == x2[i] && y1 == y2[i]) {
				x1 = (Math.floor(Math.random()*10))*40 + 10;
				y1 = (Math.floor(Math.random()*10))*40 + 10;
			}
		}

	}
}

function keyListener(evt) {

	if(evt.keyCode==37)
	{
		if (dx==10) {
			dx = 10;
			dy = 0;
		}
		else {
			dx = -10;
			dy = 0;	
		}
	}

	if(evt.keyCode==39)
	{
		if (dx == -10) {
			dx = -10;
			dy = 0;
		}
		else {
			dx = 10;
			dy = 0;
		}		
	}

	if(evt.keyCode==38)
	{
		if (dy==10) {
			dy = 10;
			dx = 0;
		}
		else {
			dy = -10;
			dx = 0;
		}	
	}

	if(evt.keyCode==40)
	{
		if (dy== -10) {
			dy = -10;
			dx = 0;
		}
		else {
			dy = 10;
			dx = 0;	
		}
	}    
}

function updateCanvas () {

	ctx.clearRect(0,0,400,400);
	if (startpause == 1) {
		rektangel(ctx,x1,y1,10,10,"purple"); // ritar ut maten
	}
	
	for (var i = 0; i < 20; i++) {
		rektangel(ctx,x2[i],y2[i],10,10,"red");
	}// Ritar ut de 10 hindren


	headcheck();

	svans();

	scorecheck();

}

function reset () {
	x = 200;
	y = 200;
	dx = 0;
	dy = 0;
	startpause = 1;
	starter();
	score = 0;
	level = 1;
	updateTime = 100;
	xorm = [];
	yorm = [];
	x2 = [];
	y2 = [];
	matTimer = 10;
    document.getElementById("scorebox").innerHTML = "PoÃ¤ng: " + score + "<br>" + "Level: " + level + "<br>" + "Maten flyttas om: " + matTimer;
	rektangel(ctx,x1,y1,10,10,"purple");

}// Återställer alla värden och gör så att spelet återgår till startinställningar.
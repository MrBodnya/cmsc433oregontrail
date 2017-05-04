		
		
window.onload = function() { document.getElementById("audio_menuTheme").play();}
/******************************************** Game related Objects *********************************************/
function selectGameBackground(){
	document.getElementById("wrapper_chooseGameBackground").style.display = "block";
	document.getElementById("wrapper_menuOptions").style.display = "none";
	document.getElementById("wrapper_chooseFamilyName").style.display = "none";
	document.getElementById("wrapper_chooseMonthtoLeave").style.display = "none";
	document.getElementById("wrapper_chooseGameBackground").style.backgroundImage = "url('Images/openBook.png')";

}

function pickBackground(type){
	
	this.currMile = 1;

	if (type == "banker"){
		this.money = 1600;
		this.pointsMulti = 1;
		this.type = type;
		makeFamily();
	}
	else if(type == "carpenter"){
		this.money = 800;
		this.pointsMulti = 2;
		this.type = type;
		makeFamily();
	}
	else if(type == "farmer")	{
		this.money = 400;
		this.pointsMulti = 3;
		this.type = type;
		makeFamily();
	}
	
}

function makeFamily(){

	document.getElementById("wrapper_chooseGameBackground").style.display = "none";
	document.getElementById("wrapper_menuOptions").style.display = "none";
	document.getElementById("wrapper_chooseFamilyName").style.display = "block";
	document.getElementById("wrapper_chooseMonthtoLeave").style.display = "none";
	document.getElementById("wrapper_chooseFamilyName").style.backgroundImage = "url('Images/openBook.png')";

}

function submitFNames(){
	this.game_family = []; //array that holds people objects (your family)
	game_family.push(Person(document.getElementById("playername").value));
	game_family.push(Person(document.getElementById("fname1").value));
	game_family.push(Person(document.getElementById("fname2").value));
	game_family.push(Person(document.getElementById("fname3").value));
	game_family.push(Person(document.getElementById("fname4").value));
	chooseMonth();
}


function Person(name){
	this.hunger = 100; //hunger for new people begins at 100
	this.p_name = name;
}

function chooseMonth(){
	
	document.getElementById("wrapper_chooseGameBackground").style.display = "none";
	document.getElementById("wrapper_menuOptions").style.display = "none";
	document.getElementById("wrapper_chooseFamilyName").style.display = "none";
	document.getElementById("wrapper_chooseMonthtoLeave").style.display = "block";
	document.getElementById("wrapper_chooseMonthtoLeave").style.backgroundImage = "url('Images/openBook.png')";

}

function monthPick(month){

	if(type == "march"){
		this.month = "March";
		timeToShop();
	}else if(type == "april"){
		this.month = "April";
		timeToShop();
	}else if(type == "may"){
		this.month = "May";
		timeToShop();
	}else if(type == "june"){
		this.month = "June";
		timeToShop();
	}else if(type == "july"){
		this.month = "july";
		timeToShop();
	}
	
}

function timeToShop(){

	if(this.type == "banker"){
		
	}

}


/********************************************** Main Menu Functions *********************************************/

function startGame(){
	selectGameBackground();
	
}

//Functionality for sfx sound on hover menu items
function playMenuHoverSound()
{
	var paperCrumble = document.getElementById("audio_menuSelect");
	paperCrumble.play();
}
function stopMenuHoverSound()
{
	var paperCrumble = document.getElementById("audio_menuSelect");
	paperCrumble.pause();
	paperCrumble.currentTime = 0;
}
//Functionality for the Turn Sound Off/On Menu Option.
function toggleMusic(){ 
	var audio = document.getElementById("audio_menuTheme");
	var button = document.getElementById("button_toggleMusic");
	if(button.innerHTML == "Turn sound off")
	{
		audio.pause();
		button.innerHTML = "Turn sound on";
	}
	else
	{
		audio.play();
		button.innerHTML = "Turn sound off";
	}	
}

//this function allows the user to click through prompts when clicking "Learn the trail"
var currentLearnTheTrailMenu = 0; //used to navigate the menu
function learnTheTrail(){
	if (currentLearnTheTrailMenu == 0){
		currentLearnTheTrailMenu = 1;
		var menuHTML = document.getElementById("div_Menu").innerHTML; 
		document.getElementById("wrapper_menuOptions").style.display="none";
		document.getElementById("wrapper_learnTheTrail").style.display="inline";
		document.getElementById("button_learnTheTrail").innerHTML = "Try taking a journey by covered wagon across 2000 miles of plain, rivers, and mountains. Try!<br>  On the plains, will you slosh through mud and water-filled ruts or will you plod through dust six inches deep? <br>  <u>CLICK TO CONTINUE! </u>";	
	}
	else if (currentLearnTheTrailMenu == 1){
		currentLearnTheTrailMenu = 2;
		document.getElementById("button_learnTheTrail").innerHTML = "How will you cross the rivers?<br> If you have money, you might take a ferry (if there is a ferry). <br>Or, you can go through the river and hope you and your wagon aren't swallowed alive! <br>  <u>CLICK TO CONTINUE! </u>";
	}
	else if (currentLearnTheTrailMenu == 2){
		currentLearnTheTrailMenu = 3;
		document.getElementById("button_learnTheTrail").innerHTML =  "What about supplies? Well, if you're low on food you can hunt.<br> You might get a buffalo... you might.<br> And there are bears in the mountains. <br>  <u>CLICK TO CONTINUE!</u>";
	}
	else if (currentLearnTheTrailMenu == 3) {
		currentLearnTheTrailMenu = 4;
		document.getElementById("button_learnTheTrail").innerHTML =  "At the Dalles, you can try navigating the Columbia River.<br> But, if running the rapids with a makeshift raft makes you queasy, better take the Barlow Road. <br> <u> CLICK TO CONTINUE!</u>";
	}
	else if (currentLearnTheTrailMenu == 4){
		currentLearnTheTrailMenu = 5;
		document.getElementById("button_learnTheTrail").innerHTML = "If for some reason you don't survive -- your wagon burns, or theives steal your oxen,<br> or you run out of provisions, or you die of cholera -- don't give up!<br> Try again...and again...until your name is up with the others on The Oregon Top Ten<br> <u> CLICK TO CONTINUE!</u>"; 
	}
	else if(currentLearnTheTrailMenu == 5){
		currentLearnTheTrailMenu = 6;
		document.getElementById("button_learnTheTrail").innerHTML = "The software team responsible for creation of this product: <br> Sean Imam <br> Andrei Bodnya <br> Christine Miller <br> Malik Phillips-Uwanamodo <br> <u> CLICK TO EXIT!</u>";
	}
	else if(currentLearnTheTrailMenu == 6){
		currentLearnTheTrailMenu = 1;
		document.getElementById("wrapper_learnTheTrail").style.display="none";
		document.getElementById("wrapper_menuOptions").style.display="block";	
	}
}
/********************************************** jQuery Functions *********************************************/
//this sections is used for more complicated effects and interactivity

$(document).ready(function() {
   $('#button_startGame').on('click', function() {
     $('#overlay').animate({
       opacity: 0.33,
     }, 5000, function() {
        // Animation complete.
     });
   }); 
});
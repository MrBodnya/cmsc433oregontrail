

window.onload = function() { document.getElementById("audio_menuTheme").play();}
var theGame = [];
var mattsbill = 0;
/******************************************** Game related Objects *********************************************/
function Game(personBackground){
	this.game_family =[]; //array that holds people objects (your family)
	this.currMile = 1;    //current mile
	this.pointsMulti = 0; //points multiplier
	this.money = 0;
	this.type="";
	this.month = "";
	this.day = 1;
	this.oxen = 0;
	this.food = 0;
	this.clothes = 0;
	this.ammo = 0;
	this.wheels = 0;
	this.axles = 0;
	this.tongues = 0;
	this.pace = "";


	if (personBackground =="banker"){
		this.money = 1600;
		this.pointsMulti = 1;
		this.type = "banker";

	}
	else if (personBackground=="carpenter"){
		this.money = 800;
		this.pointsMulti = 2;
		this.type = "capenter";
	}
	else if(personBackground=="farmer"){
		this.money = 400;
		this.pointsMulti = 3;
		this.type = "farmer";
	}
}

function selectGameBackground(){
	document.getElementById("wrapper_chooseGameBackground").style.display = "block";
	document.getElementById("wrapper_menuOptions").style.display = "none";
	document.getElementById("wrapper_chooseFamilyName").style.display = "none";
	document.getElementById("wrapper_chooseMonthtoLeave").style.display = "none";
	document.getElementById("wrapper_chooseGameBackground").style.backgroundImage = "url('Images/openBook.png')";

}

function pickBackground(type){

	if (type == "banker"){
		theGame[0] = new Game(type);
		console.log(theGame[0].money);
		makeFamily();
	}
	else if(type == "carpenter"){
		theGame[0] = new Game(type);
		makeFamily();
	}
	else if(type == "farmer")	{
		theGame[0] = new Game(type);
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

	document.getElementById("wrapper_chooseFamilyName").style.display = "none";
	document.getElementById("wrapper_chooseMonthtoLeave").style.display = "block";
	document.getElementById("wrapper_chooseMonthtoLeave").style.backgroundImage = "url('Images/openBook.png')";

}

function monthPick(month){

	if(month == "march"){
		theGame[0].month = "March";
		timeToShop();
	}else if(month == "april"){
		theGame[0].month = "April";
		timeToShop();
	}else if(month == "may"){
		theGame[0].month = "May";
		timeToShop();
	}else if(month == "june"){
		theGame[0].month = "June";
		timeToShop();
	}else if(month == "july"){
		theGame[0].month = "July";
		timeToShop();
	}

}

function timeToShop(){
	console.log("in timeToShop");

	document.getElementById("wrapper_chooseMonthtoLeave").style.display = "none";

	document.getElementById("wrapper_shoppingTime").style.display = "inline";
	document.getElementById("GameBox").style.backgroundImage = "Images/GeneralStore.png";

	document.getElementById("button_shoppingTime").innerHTML = "<center>Its Time to Shop!</center><br>Before leaving Independence you \n should buy equipment and \n supplies. You have <font color='red'> " + theGame[0].money + " </font> in \n cash, but you don't have to \n spend it all now. <br> You can buy whatever you need at Matt's General Store.";

}

function openShop_Matt(){
	//setup page
	document.getElementById("wrapper_shoppingTime").style.display = "none";
	document.getElementById("wrapper_OxenShop").style.display = "none";
	document.getElementById("wrapper_FoodShop").style.display = "none";
	document.getElementById("wrapper_ClothesShop").style.display = "none";
	document.getElementById("wrapper_AmmoShop").style.display = "none";
	document.getElementById("wrapper_SpareShop").style.display = "none";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/GeneralStore.png)';
	document.getElementById("wrapper_MattsShop").style.display = "block";
	document.getElementById("wrapper_MattsShop").style.backgroundImage = 'url(Images/openBook.png)';

	//set variables
	document.getElementById("currentMoney").innerHTML = "Current Money: "+theGame[0].money ;
	document.getElementById("MattsTotalBill").innerHTML = "Total Bill: "+mattsbill;


}

function shop_for_oxen(){
	document.getElementById("wrapper_MattsShop").style.display = "none";
	document.getElementById("wrapper_OxenShop").style.display = "block";
	document.getElementById("wrapper_OxenShop").style.backgroundImage = 'url(Images/openBook.png)';

	//set variables
	document.getElementById("currentMoney_1").innerHTML = "Current Money: "+theGame[0].money ;
	document.getElementById("MattsTotalBill_1").innerHTML = "Total Bill: " + mattsbill;

}

function oxen_purchase(){
	document.getElementById("currentMoney").innerHTML = "Current Money: "+theGame[0].money ;// Does not work
	var numOfOxen = document.getElementById("oxen_number").value;
	var priceofOxen = Number(numOfOxen) * 20;
	if(priceofOxen > theGame[0].money){
		window.alert("You do not have enough money to purchase this many Oxen!");
	}else{
		theGame[0].oxen = Number(numOfOxen);
		theGame[0].money -= priceofOxen;
		window.alert("Congradulations, you bought " + theGame[0].oxen + "!");
		mattsbill += priceofOxen;
		openShop_Matt();
	}
}

function shop_for_food(){
	document.getElementById("wrapper_MattsShop").style.display = "none";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/GeneralStore.png)';
	document.getElementById("wrapper_FoodShop").style.display = "block";
	document.getElementById("wrapper_MattsShop").style.backgroundImage = 'url(Images/openBook.png)';

	//set variables
	document.getElementById("currentMoney_2").innerHTML = "Current Money: "+theGame[0].money ;
	document.getElementById("MattsTotalBill_2").innerHTML = "Total Bill: " + mattsbill;
}

function food_purchase(){
	document.getElementById("currentMoney").innerHTML = "Current Money: "+theGame[0].money ;
	document.getElementById("MattsTotalBill").innerHTML = "Total Bill: " + mattsbill;

	var numOfFood = document.getElementById("foodp_number").value;
	var priceofFood = Number(numOfFood) * 0.2;
	if(priceofFood > theGame[0].money){
		window.alert("You do not have enough money to purchase that many pounds of food!");
	}else{
		theGame[0].food = Number(numOfFood);
		theGame[0].money -= priceofFood;
		window.alert("Congradulations, you bought "+theGame[0].food+"!");
		mattsbill += priceofFood;
		openShop_Matt();
	}
}

function shop_for_clothes(){
	document.getElementById("wrapper_MattsShop").style.display = "none";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/GeneralStore.png)';
	document.getElementById("wrapper_ClothesShop").style.display = "block";
	document.getElementById("wrapper_MattsShop").style.backgroundImage = 'url(Images/openBook.png)';

	//set variables
	document.getElementById("currentMoney_3").innerHTML = "Current Money: "+theGame[0].money ;
	document.getElementById("MattsTotalBill_3").innerHTML = "Total Bill: " + mattsbill;
}

function clothes_purchase(){
	document.getElementById("currentMoney").innerHTML = "Current Money: "+theGame[0].money ;
	document.getElementById("MattsTotalBill").innerHTML = "Total Bill: " + mattsbill;

	var numOfClothes = document.getElementById("clothes_number").value;
	var priceofClothes = Number(numOfClothes) * 10;
	if(priceofClothes > theGame[0].money){
		window.alert("You do not have enough money to purchase that many sets of clothes!");
	}else{
		theGame[0].clothes = Number(numOfClothes);
		theGame[0].money -= priceofClothes;
		window.alert("Congradulations, you bought" + theGame[0].clothes+"!");
		mattsbill+=priceofClothes;
		openShop_Matt();
	}
}

function shop_for_ammo(){
	document.getElementById("wrapper_MattsShop").style.display = "none";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/GeneralStore.png)';
	document.getElementById("wrapper_AmmoShop").style.display = "block";
	document.getElementById("wrapper_MattsShop").style.backgroundImage = 'url(Images/openBook.png)';

	//set variables
	document.getElementById("currentMoney_4").innerHTML = "Current Money: "+theGame[0].money ;
	document.getElementById("MattsTotalBill_4").innerHTML = "Total Bill: " + mattsbill;
}

function ammo_purchase(){
	document.getElementById("currentMoney").innerHTML = "Current Money: "+theGame[0].money ;
	document.getElementById("MattsTotalBill").innerHTML = "Total Bill: " + mattsbill;

	var numOfAmmo = document.getElementById("ammo_number").value;
	var priceofAmmo = Number(numOfAmmo) * 2;
	if(priceofAmmo > theGame[0].money){
		window.alert("You do not have enough money to purchase that much ammunition!");
	}else{
		theGame[0].ammo = Number(numOfAmmo);
		theGame[0].money -= priceofAmmo;
		window.alert("Congradulations, you bought" + theGame.ammo+"!");
		mattsbill+=priceofAmmo;
		openShop_Matt();
	}
}

function shop_spareparts(){
	document.getElementById("wrapper_MattsShop").style.display = "none";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/GeneralStore.png)';
	document.getElementById("wrapper_SpareShop").style.display = "block";
	document.getElementById("wrapper_MattsShop").style.backgroundImage = 'url(Images/openBook.png)';

	//set variables
	document.getElementById("currentMoney_5").innerHTML = "Current Money: "+theGame[0].money ;
	document.getElementById("MattsTotalBill_5").innerHTML = "Total Bill: " + mattsbill;
}

function spareparts_purchase(){
	document.getElementById("currentMoney").innerHTML = "Current Money: "+theGame[0].money ;
	document.getElementById("MattsTotalBill").innerHTML = "Total Bill: " + mattsbill;

	var numOfWheels = document.getElementById("sparewheel_number").value;
	var numOfAxles = document.getElementById("sparewheel_number").value;
	var numOfTongues = document.getElementById("sparewheel_number").value;
	var sparepartPrice = (Number(numOfWheels) + Number(numOfAxles) + Number(numOfTongues)) * 10;
	if(sparepartPrice > theGame[0].money){
		window.alert("You do not have enough money to buy all these spare parts!");
	}else{
		theGame[0].wheels = Number(numOfWheels);
		theGame[0].axles = Number(numOfAxles);
		theGame[0].tongues = Number(numOfTongues);
		theGame[0].money -= sparepartPrice;
		window.alert= ("Congradulations, you bought" + theGame[0].wheels + "wheels," + theGame[0].axles + "axles," + theGame[0].tongues + "tongues.");
		mattsbill += sparepartPrice;
		openShop_Matt();
	}
}

function goTown1_view(){
	// Just add a span that shows the town, like a picture of it
	document.getElementById("wrapper_MattsShop").style.display = "none";
	document.getElementById("wrapper_goToTown").style.display = "block";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/IndependenceTown.png)';
	document.getElementById("button_startTown").innerHTML = theGame[0].month + " " + theGame[0].day + "</br> Enter The Town";

}

function goTown1(){
	// This is where the logic goes for going from just a picture to the twon menu
	document.getElementById("wrapper_goToTown").style.display = "none";
	document.getElementById("wrapper_checksupplies").style.display = "none";
	document.getElementById("wrapper_changepace").style.display = "none";
	document.getElementById("wrapper_townMenu").style.display="block";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/IndependenceTown2.jpg)';
}

function supplyCheck(){
	document.getElementById("wrapper_goToTown").style.display = "none";
	document.getElementById("wrapper_checksupplies").style.display = "block";
	document.getElementById("wrapper_townMenu").style.display="none";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/IndependenceTown2.jpg)';

	document.getElementById("oxencheck").innerHTML = "Oxen:			" + theGame[0].oxen;
	document.getElementById("clothingcheck").innerHTML = "Sets of clothing:			" + theGame[0].clothes;
	document.getElementById("bulletcheck").innerHTML = "Bullets:			" + theGame[0].ammo;
	document.getElementById("wheelcheck").innerHTML = "Wagon Wheels:			" + theGame[0].wheels;
	document.getElementById("axlecheck").innerHTML = "Wagon Axles:			" + theGame[0].axles;
	document.getElementById("tonguecheck").innerHTML = "Wagon Tongues:			" + theGame[0].axles;
	document.getElementById("foodcheck").innerHTML = "Pounds of Food:			" + theGame[0].food;
	document.getElementById("moneycheck").innerHTML = "Money Left:			" + theGame[0].money;
}

function choosePace(pace){
	document.getElementById("wrapper_changepace").style.display="block";
	document.getElementById("wrapper_townMenu").style.display="none";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/IndependenceTown2.jpg)';

	if(pace == "steady"){
		theGame[0].pace = pace;
		window.alert("You have chosen to go at a steady pace.");
	}else if(pace == "strain"){
		theGame[0].pace = pace;
		window.alert("You have chosen to go at a streneous pace.");
	}else if(pace == "grueli"){
		theGame[0].pace = pace;
		window.alert("You have chosen to go at a grueling pace.");
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

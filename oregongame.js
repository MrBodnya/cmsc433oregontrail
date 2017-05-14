

window.onload = function() { document.getElementById("audio_menuTheme").play();}
var theGame = [];
var mattsbill = 0;
/******************************************** Game related Objects *********************************************/
function Game(personBackground){
	this.game_family = []; //array that holds people objects (your family)
	this.currMile = 1;    //current mile
	this.pointsMulti = 0; //points multiplier
	this.money = 100;
	this.type="";
	this.month = 0;
	this.day = 1;
	this.year = 1848; 
	this.oxen = 0;
	this.food = 0;
	this.clothes = 0;
	this.ammo = 0;
	this.wheels = 0;
	this.axles = 0;
	this.tongues = 0;
	this.pace = "steady";
	this.ration = "";
	this.health = 100;
	this.location = "";
	this.storeType="Matt";

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

function Person(name){ //a person object, which has a name and health value, this constructor is used when creating a family for the first time
	this.health = 100; //hunger for new people begins at 100
	this.p_name = name;
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

	theGame[0].location ="Independence, Missouri";

}

function makeFamily(){

	document.getElementById("wrapper_chooseGameBackground").style.display = "none";
	document.getElementById("wrapper_chooseFamilyName").style.display = "block";
	/*document.getElementById("wrapper_menuOptions").style.display = "none";*/
	/*document.getElementById("wrapper_chooseMonthtoLeave").style.display = "none";*/
	/*document.getElementById("wrapper_chooseFamilyName").style.backgroundImage = "url('Images/openBook.png')"; */

}

function submitFNames(){ //this function takes the values for the family names and creates an array of person objects
	theGame[0].game_family[0] = new Person(document.getElementById("playername").value);
	theGame[0].game_family[1] = new Person(document.getElementById("fname1").value);
	theGame[0].game_family[2] = new Person(document.getElementById("fname2").value);
	theGame[0].game_family[3] = new Person(document.getElementById("fname3").value);
	theGame[0].game_family[4] = new Person(document.getElementById("fname4").value);
	chooseMonth();
}


function chooseMonth(){

	document.getElementById("wrapper_chooseFamilyName").style.display = "none";
	document.getElementById("wrapper_chooseMonthtoLeave").style.display = "block";
	/*document.getElementById("wrapper_chooseMonthtoLeave").style.backgroundImage = "url('Images/openBook.png')"; */

}

function monthPick(month){

	if(month == "march"){
		theGame[0].month = 3;
		timeToShop();
	}else if(month == "april"){
		theGame[0].month = 4;
		timeToShop();
	}else if(month == "may"){
		theGame[0].month = 5;
		timeToShop();
	}else if(month == "june"){
		theGame[0].month = 6;
		timeToShop();
	}else if(month == "july"){
		theGame[0].month = 7;
		timeToShop();
	}

}

function timeToShop(){
	console.log("in timeToShop");

	document.getElementById("wrapper_chooseMonthtoLeave").style.display = "none";
	document.getElementById("wrapper_shoppingTime").style.display = "inline";
	document.getElementById("GameBox").style.backgroundImage = "Images/GeneralStore.png";
	document.getElementById("button_shoppingTime").innerHTML = "<center>Its Time to Shop!</center><br>Before leaving Independence you should buy equipment and supplies.<br> You have <font color='red'> " + theGame[0].money + " </font> in \n cash, but you don't have to \n spend it all now. <br> You can buy whatever you need at Matt's General Store.";

}

function openShop(){
	//setup page
	document.getElementById("wrapper_shoppingTime").style.display = "none";
	document.getElementById("wrapper_OxenShop").style.display = "none";
	document.getElementById("wrapper_FoodShop").style.display = "none";
	document.getElementById("wrapper_ClothesShop").style.display = "none";
	document.getElementById("wrapper_AmmoShop").style.display = "none";
	document.getElementById("wrapper_SpareShop").style.display = "none";
	document.getElementById("wrapper_townMenu").style.display = "none";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/GeneralStore.png)';
	document.getElementById("wrapper_MattsShop").style.display = "block";
	document.getElementById("wrapper_MattsShop").style.backgroundImage = 'url(Images/openBook.png)';

	//set variables
	document.getElementById("currentMoney").innerHTML = "Current Money: "+theGame[0].money ;
	document.getElementById("MattsTotalBill").innerHTML = "Total Bill: "+mattsbill;
	document.getElementById("store_location_main").innerHTML = theGame[0].location; //set store location
	switch (theGame[0].storeType){
		case "Matt":
			document.getElementById("store_name_main").innerHTML = "Matt's General Store"; //set store name
			break;
		case "Town":
			document.getElementById("store_name_main").innerHTML = "Town General Store";
			document.getElementById("button_goto_town").onclick = goTown1;
			break;
	}
	


}

function shop_for_oxen(){
	document.getElementById("wrapper_MattsShop").style.display = "none";
	document.getElementById("wrapper_OxenShop").style.display = "block";
	document.getElementById("wrapper_OxenShop").style.backgroundImage = 'url(Images/openBook.png)';

	//set variables
	document.getElementById("currentMoney_1").innerHTML = "Current Money: "+theGame[0].money ;
	document.getElementById("MattsTotalBill_1").innerHTML = "Total Bill: " + mattsbill;
	document.getElementById("store_location_oxen").innerHTML = theGame[0].location; //set store location
	console.log("The store type is:"+theGame[0].storeType);
	switch (theGame[0].storeType){
		case "Matt":
			document.getElementById("store_name_oxen").innerHTML = "Matt's General Store"; //set store name
			break;
		case "Town":
			document.getElementById("store_name_oxen").innerHTML = "Town General Store";
			break;
	}

}

function oxen_purchase(){
	document.getElementById("currentMoney").innerHTML = "Current Money: "+theGame[0].money ;// Does not work
	var numOfOxen = document.getElementById("oxen_number").value;
	var priceofOxen = Number(numOfOxen) * 20;
	if(priceofOxen > theGame[0].money){
		window.alert("You do not have enough money to purchase this many Oxen!");
	}else{
		theGame[0].oxen += Number(numOfOxen);
		theGame[0].money -= priceofOxen;
		window.alert("Congratulations, you bought " + Number(numOfOxen) + "!");
		mattsbill += priceofOxen;
		openShop();							
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
	document.getElementById("store_location_food").innerHTML = theGame[0].location; //set store location

	switch (theGame[0].storeType){
		case "Matt":
			document.getElementById("store_name_food").innerHTML = "Matt's General Store"; //set store name
			break;
		case "Town":
			document.getElementById("store_name_food").innerHTML = "Town General Store";
			break;
		
	}
}

function food_purchase(){
	document.getElementById("currentMoney").innerHTML = "Current Money: "+theGame[0].money ;
	document.getElementById("MattsTotalBill").innerHTML = "Total Bill: " + mattsbill;

	var numOfFood = document.getElementById("foodp_number").value;
	var priceofFood = Number(numOfFood) * 0.2;
	if(priceofFood > theGame[0].money){
		window.alert("You do not have enough money to purchase that many pounds of food!");
	}else{
		theGame[0].food += Number(numOfFood);
		theGame[0].money -= priceofFood;
		window.alert("Congradulations, you bought "+Number(numOfFood)+" pounds of food!");
		mattsbill += priceofFood;
		openShop();			
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
	document.getElementById("store_location_clothes").innerHTML = theGame[0].location; //set store location
	switch (theGame[0].storeType){
		case "Matt":
			document.getElementById("store_name_clothes").innerHTML = "Matt's General Store"; //set store name	
			break;
		case "Town":
			document.getElementById("store_name_clothes").innerHTML = "Town General Store";
			break;
	}
}

function clothes_purchase(){
	document.getElementById("currentMoney").innerHTML = "Current Money: "+theGame[0].money ;
	document.getElementById("MattsTotalBill").innerHTML = "Total Bill: " + mattsbill;

	var numOfClothes = document.getElementById("clothes_number").value;
	var priceofClothes = Number(numOfClothes) * 10;
	if(priceofClothes > theGame[0].money){
		window.alert("You do not have enough money to purchase that many sets of clothes!");
	}else{
		theGame[0].clothes += Number(numOfClothes);
		theGame[0].money -= priceofClothes;
		window.alert("Congradulations, you bought" + Number(numOfClothes).clothes+" Clothes!");
		mattsbill+=priceofClothes;
		openShop();			
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
	document.getElementById("store_location_ammo").innerHTML = theGame[0].location; //set store location

	switch (theGame[0].storeType){
		case "Matt":
			document.getElementById("store_name_ammo").innerHTML = "Matt's General Store"; //set store name
			break;
		case "Town":
			document.getElementById("store_name_ammo").innerHTML = "Town General Store";
			break;
	}
}

function ammo_purchase(){
	document.getElementById("currentMoney").innerHTML = "Current Money: "+theGame[0].money ;
	document.getElementById("MattsTotalBill").innerHTML = "Total Bill: " + mattsbill;

	var numOfAmmo = document.getElementById("ammo_number").value;
	var priceofAmmo = Number(numOfAmmo) * 2;
	if(priceofAmmo > theGame[0].money){
		window.alert("You do not have enough money to purchase that much ammunition!");
	}else{
		theGame[0].ammo += Number(numOfAmmo);
		theGame[0].money -= priceofAmmo;
		window.alert("Congratulations, you bought" + Number(numOfAmmo)+"!");
		mattsbill+=priceofAmmo;
		openShop();			
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
	document.getElementById("store_location_spare").innerHTML = theGame[0].location; //set store location
	switch (theGame[0].storeType){
		case "Matt":
			document.getElementById("store_name_spare").innerHTML = "Matt's General Store"; //set store name
			break;
		case "Town":
			document.getElementById("store_name_spare").innerHTML = "Town General Store";
			break;	
	}
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
		theGame[0].wheels += Number(numOfWheels);
		theGame[0].axles += Number(numOfAxles);
		theGame[0].tongues += Number(numOfTongues);
		theGame[0].money -= sparepartPrice;
		window.alert= ("Congratulations, you bought" + Number(numOfWheels) + "wheels," + Number(numOfAxles) + "axles," + Number(numOfTongues) + "tongues.");
		mattsbill += sparepartPrice;
		openShop();		
	}
}

function goTown1_view(){
	// Just add a span that shows the town, like a picture of it
	document.getElementById("wrapper_MattsShop").style.display = "none";
	document.getElementById("wrapper_goToTown").style.display = "block";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/IndependenceTown.png)';
	document.getElementById("button_startTown").innerHTML = getDate(theGame[0].month) + "</br> Enter The Town";
	theGame[0].storeType = "Town";

}

function goTown1(){
	// This is where the logic goes for going from just a picture to the twon menu
	document.getElementById("wrapper_goToTown").style.display = "none";
	document.getElementById("wrapper_checksupplies").style.display = "none";
	document.getElementById("wrapper_changepace").style.display = "none";
	document.getElementById("wrapper_changefoodrat").style.display = "none";
	document.getElementById("wrapper_stoprest").style.display = "none";
	document.getElementById("wrapper_MattsShop").style.display = "none";
	document.getElementById("wrapper_townMenu").style.display="block";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/IndependenceTown2.jpg)';

	//set variables
	
	document.getElementById("date_town").innerHTML = "<u>"+getDate(theGame[0].month)+"</u>";
	document.getElementById("location_town").innerHTML = "<u>"+theGame[0].location+"</u>";
	document.getElementById("health_town").innerHTML ="<u>Average Health:</u> "+ calcAverageHealth();
	document.getElementById("pace_town").innerHTML = "<u>Pace:</u> "+theGame[0].pace;
	document.getElementById("rations_town").innerHTML = "<u>Rations:</u> " + getRationStatus(theGame[0].food);

	console.log("shop bill is "+mattsbill);
	mattsbill = 0; //resetting the bill counter for the shop, so that it starts at 0 again when you go to the store
	 //set store type variable so correct store & pricing is set
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
	}else if(pace == "grueling"){
		theGame[0].pace = pace;
		window.alert("You have chosen to go at a grueling pace.");
	}

}

function chooseFoodRation(ration){
	document.getElementById("wrapper_changefoodrat").style.display="block";
	document.getElementById("wrapper_townMenu").style.display="none";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/IndependenceTown2.jpg)';

	document.getElementById("foodrat_description").innerHTML = "The amount of food the people in your party eat each day can change. Choose:";
	document.getElementById("filling_desc").innerHTML = "<font color='green'>Meals are large and generous.</font>";
	document.getElementById("meager_desc").innerHTML = "<font color='orange'>Meals are small, but adequate.</font>";
	document.getElementById("barebones_desc").innerHTML = "<font color='red'>Meals are very small; everyone stays hungry. </font>";
	if(ration == "fill"){
		theGame[0].ration = ration;
		window.alert("You have chosen to eat filling rations!");
	}else if(ration == "meager"){
		theGame[0].ration = ration;
		window.alert("You have choser to eat meager portions of food!");
	}else if(ration == "bare"){
		theGame[0].ration = ration;
		window.alert("You have chosen to eat the minimum bare bones!");
	}
}

function stoptoRest(){
	document.getElementById("wrapper_stoprest").style.display="block";
	document.getElementById("wrapper_townMenu").style.display="none";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/IndependenceTown2.jpg)';

	document.getElementById("daypass_desc").innerHTML = "You have rested and a day has gone by.";
	theGame[0].day++;
	if(theGame[0].health < 100){
		theGame[0] += 10;
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

/*********************************Helper Functions*********************************/

function calcAverageHealth(){ //takes the average of your family members health 
	var HealthTotal = 0;
	for (i = 0; i < theGame[0].game_family.length; i++){
		console.log(theGame[0].game_family[i].p_name+"'s Health is: "+theGame[0].game_family[i].health);	
		HealthTotal += theGame[0].game_family[i].health;
	}

	console.log("Average health is: "+(HealthTotal/5) );
	
	switch (true){
		case ( (HealthTotal/5) > 75 ):
			console.log("<font color='green'>"+(HealthTotal/5)+"</font>");
			return ("<font color='green'>"+(HealthTotal/5)+"</font>");
			break;
		case ( (HealthTotal/5) > 50 ):
			console.log("<font color='orange'>"+(HealthTotal/5)+"</font>");
			return ("<font color='orange'>"+(HealthTotal/5)+"</font>");
			break;
		case ( (HealthTotal/5) > 25 ):
			console.log("<font color='purple'>"+(HealthTotal/5)+"</font>");
			return ("<font color='purple'>"+(HealthTotal/5)+"</font>");
			break;
		case ( (HealthTotal/5) > 1 ):
			console.log("<font color='red'>"+(HealthTotal/5)+"</font>");
			return ("<font color='red'>"+(HealthTotal/5)+"</font>");
			break;
	}
	return "Invalid health amount";

}

function devConsole_Execute(input){
	
	
	switch(input){
		case "Show1":
			var TagToChange = document.getElementById("devConsoleInput").value;
			document.getElementById(TagToChange).style.display = "block";
			break;
		case "Hide1":
			var TagToChange = document.getElementById("devConsoleInput").value;
			document.getElementById(TagToChange).style.display = "none";
			break;
		case "Show2":
			var TagToChange = document.getElementById("devConsoleInput_2").value;
			document.getElementById(TagToChange).style.display = "block";
			break;
		case "Hide2":
			var TagToChange = document.getElementById("devConsoleInput_2").value;
			document.getElementById(TagToChange).style.display = "none";
			break;
		case "fakeGame":
			theGame[0] = new Game("banker");
			theGame[0].currMile = 1;    //current mile
			theGame[0].pointsMulti = 1; //points multiplier
			theGame[0].money = 1600;
			theGame[0].type="Banker";
			theGame[0].month = 1;
			theGame[0].day = 1;
			theGame[0].oxen = 20;
			theGame[0].food = 20;
			theGame[0].clothes = 20;
			theGame[0].ammo = 20;
			theGame[0].wheels = 20;
			theGame[0].axles = 20;
			theGame[0].tongues = 20;
			theGame[0].pace = "steady";
			theGame[0].ration = "";
			theGame[0].health = 100;
			theGame[0].location ="Independence, Missouri";
			theGame[0].storeType ="Town";
			theGame[0].game_family[0] = new Person("Satan");
			theGame[0].game_family[1] = new Person("Sean");
			theGame[0].game_family[2] = new Person("Andrei");
			theGame[0].game_family[3] = new Person("Christy");
			theGame[0].game_family[4] = new Person("Malik");
			break;	
	}
}

function getDate(intMonth){
	switch (intMonth){
		case 1:
			return "January "+ theGame[0].day + ", " + theGame[0].year;
			break;
		case 2:
			return "February "+ theGame[0].day + ", " + theGame[0].year;
			break;
		case 3:
			return "March "+ theGame[0].day + ", " + theGame[0].year;
			break;
		case 4:
			return "April "+ theGame[0].day + ", " + theGame[0].year;
			break;
		case 5:
			return "May "+ theGame[0].day + ", " + theGame[0].year;
			break;
		case 6:
			return "June "+ theGame[0].day + ", " + theGame[0].year;
			break;
		case 7:
			return "July "+ theGame[0].day + ", " + theGame[0].year;
			break;
		case 8:
			return "August "+ theGame[0].day + ", " + theGame[0].year;
			break;
		case 9:
			return "September "+ theGame[0].day + ", " + theGame[0].year;
			break;
		case 10:
			return "October "+ theGame[0].day + ", " + theGame[0].year;
			break;
		case 11:
			return "November "+ theGame[0].day + ", " + theGame[0].year;
			break;
		case 12:
			return "December "+ theGame[0].day + ", " + theGame[0].year;
			break;
	}

	return "Invalid month number";
}

function getRationStatus(foodPounds){ //recommended food is 200lb per person

	switch (true){
		case (foodPounds >= 800):
			return "<font color='green'> Filling </font>";
		case (foodPounds >= 600):
			return "<font color='orange'>Adequate</font>";
		case (foodPounds >= 250 && foodPounds  < 500):
			return "<font color='purple'>Running Low </font>";
		case (foodPounds >= 0):
			return "<font color='red'>Scarce </font>";


	}

}
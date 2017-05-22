

window.onload = function() { document.getElementById("audio_menuTheme").play();}
var theGame = [];
var animals =[];
var mattsbill = 0;
var startTime, startMin, startSec;
var times_up = false;
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
	this.pace = "Steady";
	this.ration = "filling"; //filling = 3lb/per person/day   meager = 2lb/per person/day   scarce = 2lb/per person/day
	this.foodperPerson = 3; //pounds of food per person, per day.
	this.healthReductionMultiplier = 1; //health reduction multiplier per day, the pace will make this either 1, 2 or 3
	this.health = 100;
	this.location = "";
	this.storeType="Matt";
	this.traderItemWanted = "";
	this.traderItemQuantityWanted = 0;
	this.traderItemGiven ="";
	this.traderItemQuantityGiven = 0;
	this.traderPresent = true; //variable to determine whether the player has traded once for that day or not
	this.milesToDestination = 0;
	this.currentMilesTraveled = 0;
	this.milesLeft = 0;
	this.destinationName ="";
	this.points = 0;
	this.wagonAWheels = 4;
	this.wagonAAxles = 2;
	this.wagonATongue = 1;
	this.currWrapper ="";
	this.currMenu = "";
	this.continueTrail = true;
	this.SouthPassChoice = 0; //if the user picks to go to fort brigader or green river
	this.huntedToday = false;
	this.totalMiles = 0;

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
	this.condition ="";
}

function selectGameBackground(){
	document.getElementById("wrapper_chooseGameBackground").style.display = "block";
	document.getElementById("wrapper_menuOptions").style.display = "none";
	document.getElementById("wrapper_chooseFamilyName").style.display = "none";
	document.getElementById("wrapper_chooseMonthtoLeave").style.display = "none";
	document.getElementById("wrapper_chooseGameBackground").style.backgroundImage = "url('Images/openBook.png')";

}

function Animal(type, health, pounds, r_pic, l_pic, width, height, lrange, rrange){
	this.type = type;
	this.health = health;
	this.pounds = pounds;
	this.right_picture = r_pic;
	this.left_picture = l_pic;
	this.width = width;
	this.height = height;
	this.lrange = lrange;
	this.rrange = rrange;
}

function createAnimals(){
	animals[0] = new Animal("sm_deer", 1, 5, "sm_deer_right.png", "sm_deer_left.png", "100px", "100px", "423px", "453px");
	animals[1] = new Animal("md_deer", 2, 7, "md_deer_right.png", "md_deer_left.png", "150px", "150px", "382px", "443px");
	animals[2] = new Animal("sm_buffalo", 2, 10, "sm_buffalo_right.png", "sm_buffalo_left.png", "160px", "100px", "345px", "453px");
	animals[3] = new Animal("md_buffalo", 3, 15, "md_buffalo_right.png", "md_buffalo_left.png", "200px", "150px", "302px", "460px");
}

function resetAnimals(){
	animals[0].health = 1;
	animals[1].health = 2;
	animals[2].health = 2;
	animals[3].health = 3;
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

/****************************************************************** START SHOP MENU CODE ****************************************************************************************/
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
	document.getElementById("store_date_main").innerHTML = getDate(theGame[0].month); //set store date
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
	document.getElementById("store_date_oxen").innerHTML = getDate(theGame[0].month); //set store date
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
	document.getElementById("store_date_food").innerHTML = getDate(theGame[0].month); //set store date

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
		window.alert("Congratulations, you bought "+Number(numOfFood)+" pounds of food!");
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
	document.getElementById("store_date_clothes").innerHTML = getDate(theGame[0].month); //set store date
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
		window.alert("Congratulations, you bought " + Number(numOfClothes)+" Clothes!");
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
	document.getElementById("store_date_ammo").innerHTML = getDate(theGame[0].month); //set store date

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
		window.alert("Congratulations, you bought " + Number(numOfAmmo)+"!");
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
	document.getElementById("store_location_spare").innerHTML =theGame[0].location; //set store location
	document.getElementById("store_date_spare").innerHTML = getDate(theGame[0].month); //set store date
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
	var numOfAxles = document.getElementById("spareaxle_number").value;
	var numOfTongues = document.getElementById("sparetongue_number").value;
	var sparepartPrice = (Number(numOfWheels) + Number(numOfAxles) + Number(numOfTongues)) * 10;
	if(sparepartPrice > theGame[0].money){
		window.alert("You do not have enough money to buy all these spare parts!");
	}else{
		theGame[0].wheels += Number(numOfWheels);
		theGame[0].axles += Number(numOfAxles);
		theGame[0].tongues += Number(numOfTongues);
		theGame[0].money -= sparepartPrice;
		window.alert ("Congratulations, you bought " + Number(numOfWheels) + " wheels, " + Number(numOfAxles) + " axles, and " + Number(numOfTongues) + " tongues.");
		mattsbill += sparepartPrice;
		openShop();
	}
}

/******************************************************************END SHOP MENU CODE ****************************************************************************************/


/******************************************************************START TOWN MENU CODE ****************************************************************************************/

function goTown1_view(){
	if(theGame[0].oxen == 0){ //the player cannot go to town if they have not bought atleast 1 oxen
	window.alert("You need to buy atleast 1 oxen before going to town!!!");
	}
	else{
		// Just add a span that shows the town, like a picture of it
	document.getElementById("wrapper_MattsShop").style.display = "none";
	document.getElementById("wrapper_goToTown").style.display = "block";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/IndependenceTown.png)';
	document.getElementById("button_startTown").innerHTML = getDate(theGame[0].month) + "</br> Enter The Town";
	theGame[0].storeType = "Town";
	setRandomTradeValues();
	}

	theGame[0].currWrapper = "wrapper_goToTown";
	theGame[0].currMenu = "wrapper_townMenu";
}

function goTown1(){

	//document.getElementById(theGame[0].currWrapper).style.display = "none";
	//document.getElementById(theGame[0].currMenu).style.display = "none";
	theGame[0].currMenu = "wrapper_townMenu";
	// This is where the logic goes for going from just a picture to the twon menu
	document.getElementById("wrapper_goToTown").style.display = "none";
	document.getElementById("wrapper_checksupplies").style.display = "none";
	document.getElementById("wrapper_changepace").style.display = "none";
	document.getElementById("wrapper_changefoodrat").style.display = "none";
	document.getElementById("wrapper_stoprest").style.display = "none";
	document.getElementById("wrapper_MattsShop").style.display = "none";
	document.getElementById("wrapper_attemptTrade").style.display="none";
	document.getElementById("wrapper_townMenu").style.display="block";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/IndependenceTown2.jpg)';

	//set variables
	document.getElementById("date_town").innerHTML = "<u>"+getDate(theGame[0].month)+"</u>";
	document.getElementById("weather_town").innerHTML = "<u>Weather:</u> warm";
	document.getElementById("location_town").innerHTML = "<u>"+theGame[0].location+"</u>";
	document.getElementById("health_town").innerHTML ="<u>Average Health:</u> "+ calcAverageHealth();
	document.getElementById("pace_town").innerHTML = "<u>Pace:</u> "+theGame[0].pace;
	document.getElementById("rations_town").innerHTML = "<u>Rations:</u> " + getRationStatus();

	//console.log("shop bill is "+mattsbill);
	mattsbill = 0; //resetting the bill counter for the shop, so that it starts at 0 again when you go to the store
	 //set store type variable so correct store & pricing is set
	 switch(theGame[0].location){ //If we are in a fort, then continue on the trail will route back to the travel
	 	case "Fort Kearny":
	 		document.getElementById("button_continuetrail").onclick = continueOnTrail;
	 		break;
	 	case "Fort Laramie":
	 		document.getElementById("button_continuetrail").onclick = continueOnTrail;
	 		break;
	 	case "Fort Bridger":
	 		document.getElementById("button_continuetrail").onclick = continueOnTrail;
	 		break;
	 	case "Fort Hall":
	 		document.getElementById("button_continuetrail").onclick = continueOnTrail;
	 		break;
	 	case "Fort Boise":
	 		document.getElementById("button_continuetrail").onclick = continueOnTrail;
	 		break;
	 	case "Fort Walla Walla":
	 		 document.getElementById("button_continuetrail").onclick = continueOnTrail;
	 		break;

	 }

}

function supplyCheck(){
	theGame[0].currWrapper ="wrapper_checksupplies";
	document.getElementById(theGame[0].currMenu).style.display ="none";
	document.getElementById("wrapper_goToTown").style.display = "none";
	document.getElementById("wrapper_checksupplies").style.display = "block";
	document.getElementById("wrapper_townMenu").style.display="none";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/IndependenceTown2.jpg)';

	document.getElementById("oxencheck").innerHTML = "<u>Oxen:</u> " + theGame[0].oxen;
	document.getElementById("clothingcheck").innerHTML = "<u>Sets of clothing:</u>	" + theGame[0].clothes;
	document.getElementById("bulletcheck").innerHTML = "<u>Bullets:</u> " + theGame[0].ammo;
	document.getElementById("wheelcheck").innerHTML = "<u>Wagon Wheels:</u> " + theGame[0].wheels;
	document.getElementById("axlecheck").innerHTML = "<u>Wagon Axles:</u> " + theGame[0].axles;
	document.getElementById("tonguecheck").innerHTML = "<u>Wagon Tongues:</u> " + theGame[0].tongues;
	document.getElementById("foodcheck").innerHTML = "<u>Pounds of Food:</u> " + theGame[0].food;
	document.getElementById("moneycheck").innerHTML = "<u>Money Left:</u> " + theGame[0].money;

document.getElementById("location_status").innerHTML = "<u> Current Location: </u><br> <font color='green'>" + theGame[0].location;+"</font>";
	document.getElementById("family1_status").innerHTML = "<u>" + theGame[0].game_family[0].p_name + "'s health:</u> " + theGame[0].game_family[0].health;
	document.getElementById("family2_status").innerHTML = "<u>" +  theGame[0].game_family[1].p_name + "'s health:</u> " + theGame[0].game_family[1].health;
	document.getElementById("family3_status").innerHTML = "<u>" + theGame[0].game_family[2].p_name + "'s health:</u> " + theGame[0].game_family[2].health;
	document.getElementById("family4_status").innerHTML = "<u>" + theGame[0].game_family[3].p_name + "'s health:</u> " + theGame[0].game_family[3].health;
	document.getElementById("family5_status").innerHTML = "<u>" + theGame[0].game_family[4].p_name + "'s health:</u> " + theGame[0].game_family[4].health;
}

function choosePace(pace){
	theGame[0].currWrapper ="wrapper_changepace";
	document.getElementById(theGame[0].currMenu).style.display ="none";
	document.getElementById("wrapper_changepace").style.display="block";
	document.getElementById("wrapper_townMenu").style.display="none";

	if(pace == "Steady"){
		theGame[0].pace = pace;
		theGame[0].healthReductionMultiplier = 1;
		window.alert("You have chosen to go at a steady pace.");
	}else if(pace == "Straining"){
		theGame[0].pace = pace;
		theGame[0].healthReductionMultiplier = 2;
		window.alert("You have chosen to go at a streneous pace.");
	}else if(pace == "Grueling"){
		theGame[0].pace = pace;
		theGame[0].healthReductionMultiplier = 3;
		window.alert("You have chosen to go at a grueling pace.");
	}

}

function chooseFoodRation(ration){
	theGame[0].currWrapper ="wrapper_changefoodrat";
	document.getElementById(theGame[0].currMenu).style.display ="none";
	document.getElementById("wrapper_changefoodrat").style.display="block";
	document.getElementById("wrapper_townMenu").style.display="none";

	document.getElementById("foodrat_description").innerHTML = "The amount of food the people in your party eat each day can change. Choose:";
	document.getElementById("filling_desc").innerHTML = "<font color='green'>Meals are large and generous.</font>";
	document.getElementById("meager_desc").innerHTML = "<font color='orange'>Meals are small, but adequate.</font>";
	document.getElementById("barebones_desc").innerHTML = "<font color='red'>Meals are very small; everyone stays hungry. </font>";
	if(ration == "filling"){
		theGame[0].ration = ration;
		theGame[0].foodperPerson = 3; //each person gets 3lbs of food per day with filling rations
		window.alert("You have chosen to eat filling rations!");
	}else if(ration == "meager"){
		theGame[0].ration = ration;
		theGame[0].foodperPerson = 2; //each person gets 2lbs of food per day with meager rations
		window.alert("You have choser to eat meager portions of food!");
	}else if(ration == "bare"){
		theGame[0].ration = ration;
		theGame[0].foodperPerson = 1 //each person gets 1lbs of food per day with bare rations
		window.alert("You have chosen to eat the minimum bare bones!");
	}
}

function stoptoRest(){
	theGame[0].currWrapper ="wrapper_stoprest";
	console.log(theGame[0].currMenu);
	document.getElementById(theGame[0].currMenu).style.display ="none";
	document.getElementById("wrapper_townMenu").style.display="none";
	document.getElementById("wrapper_stoprest").style.display="block";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/BlackScreen.png)';
}

function rest(){
	var days = document.getElementById("input_restDays").value;
	if(theGame[0].storeType =="Town"){ window.alert("You Have Rested for "+days+" days."); }
	theGame[0].day +=Number(days);

	if (days > 0){
		//ADD LOGIC FOR FOOD/HEALTH SUBTRACTION HERE
		setRandomTradeValues(); //reset random trader after a day has passed
		theGame[0].traderPresent = true; //reset trader present so that the player can trade
		theGame[0].huntedToday = false;

		var healthReduxMultiplier = theGame[0].healthReductionMultiplier; //variable to hold health reduction multiplier
		var foodEatenPerPerson = (theGame[0].foodperPerson * days) //variable that holds the amount of food each person will be eating is lbs of food per person * the number of days that pass
		var foodEatenPerPerson_AfterStockCheck = (theGame[0].foodperPerson * days); //variable will determine the final amount of lbs the player will eat, if they are attempting to eat more than exists
		if (theGame[0].storeType=="Town"){healthReduxMultiplier = 1;} //regardless of current pace, if player is in town, health reduction is set to 1
		console.log(days+" days have passed, the player is in "+theGame[0].storeType+" so health reduction multiplier is set from "+theGame[0].healthReductionMultiplier+" to "+healthReduxMultiplier);
		for (i = 0; i < theGame[0].game_family.length; i++){
			if (theGame[0].game_family[i].health > 0){ //only people who have more than 0 health may eat
				theGame[0].game_family[i].health -= (5 * healthReduxMultiplier)*days; //a persons health decreases by 5,10 or 15 points per day due to hunger
				console.log(theGame[0].game_family[i].p_name +" has lost "+(5 * healthReduxMultiplier)*days+" hp points, health is now: "+ theGame[0].game_family[i].health);

				if(  foodEatenPerPerson >  theGame[0].food){ //this person needs to eat more food than is left, they will only eat whatever is left in stock instead
					foodEatenPerPerson_AfterStockCheck = theGame[0].food;
				}

				theGame[0].food -= foodEatenPerPerson_AfterStockCheck; //reduce food stock by the total amount this individual is eating after the stock check.
				theGame[0].game_family[i].health += (foodEatenPerPerson_AfterStockCheck * 4) //a person gains 4 points of health per lb of food, they gain this health for each day that passes: total lbs of food eaten * 4hp points
				if (theGame[0].game_family[i].health > 100) {theGame[0].game_family[i].health = 100;} //if a persons health exceeds 100, change it back to 100.
				if (theGame[0].game_family[i].health <= 0) {theGame[0].game_family[i].health = 0; saveTombstone( getDate(theGame[0].month),theGame[0].game_family[i],theGame[0].totalMiles,"Here lies idiot."); window.alert(theGame[0].game_family[i].p_name +" HAS DIED NOOOOOOOOOOOO!!!!! ;( "); }

				console.log(theGame[0].game_family[i].p_name +" has eaten "+foodEatenPerPerson_AfterStockCheck+" lbs of food. and gained "+(foodEatenPerPerson_AfterStockCheck * 4)+" hp points, health is now: "+theGame[0].game_family[i].health);
			}
		}
	}

	if(theGame[0].storeType =="Town"){
		goBackToMenu();
	}
	else if (theGame[0].currMenu =="wrapper_travel_pause_menu" && theGame[0].continueTrail == false){
		goBackToMenu();
	}

}

function attemptTrade(){

	theGame[0].currWrapper ="wrapper_attemptTrade";
	document.getElementById(theGame[0].currMenu).style.display ="none";
	document.getElementById("wrapper_townMenu").style.display="none";
	document.getElementById("wrapper_attemptTrade").style.display="block";

	if(theGame[0].traderPresent == true){
		document.getElementById("button_acceptTrade").style.display ="block"; //show accept trade button if trader is present
		document.getElementById("trade_traderInfo").innerHTML ="A trader is asking for <font color='red'>"+theGame[0].traderItemQuantityWanted+" "+theGame[0].traderItemWanted+ "</font>, They will trade you <font color='red'>"+theGame[0].traderItemQuantityGiven+" "+theGame[0].traderItemGiven+"</font> in return.";
		document.getElementById("trade_oxencheck").innerHTML = "Oxen: " + theGame[0].oxen;
		document.getElementById("trade_clothingcheck").innerHTML = "Sets of clothing: " + theGame[0].clothes;
		document.getElementById("trade_bulletcheck").innerHTML = "Bullets: " + theGame[0].ammo;
		document.getElementById("trade_wheelcheck").innerHTML = "Wagon Wheels: " + theGame[0].wheels;
		document.getElementById("trade_axlecheck").innerHTML = "Wagon Axles: " + theGame[0].axles;
		document.getElementById("trade_tonguecheck").innerHTML = "Wagon Tongues: " + theGame[0].tongues;
		document.getElementById("trade_foodcheck").innerHTML = "Pounds of Food: " + theGame[0].food;
		document.getElementById("trade_moneycheck").innerHTML = "Money Left: " + theGame[0].money;
	}
	else if(theGame[0].traderPresent == false){
		document.getElementById("trade_oxencheck").innerHTML = "Oxen: " + theGame[0].oxen;
		document.getElementById("trade_clothingcheck").innerHTML = "Sets of clothing: " + theGame[0].clothes;
		document.getElementById("trade_bulletcheck").innerHTML = "Bullets: " + theGame[0].ammo;
		document.getElementById("trade_wheelcheck").innerHTML = "Wagon Wheels: " + theGame[0].wheels;
		document.getElementById("trade_axlecheck").innerHTML = "Wagon Axles: " + theGame[0].axles;
		document.getElementById("trade_tonguecheck").innerHTML = "Wagon Tongues: " + theGame[0].tongues;
		document.getElementById("trade_foodcheck").innerHTML = "Pounds of Food: " + theGame[0].food;
		document.getElementById("trade_moneycheck").innerHTML = "Money Left: " + theGame[0].money;
		document.getElementById("trade_traderInfo").innerHTML="No One Wants to trade with you today."
		document.getElementById("button_acceptTrade").style.display ="none"; //hide accept trade button if trader is not present
	}

}

function acceptTrade(){
	var itemTraded = false;
	switch (theGame[0].traderItemWanted){
		case "Oxen":
			if (theGame[0].oxen < theGame[0].traderItemQuantityWanted ){window.alert("You do not have enough Oxen to make this trade!"); }
			else{ theGame[0].oxen -= theGame[0].traderItemQuantityWanted; itemTraded = true;}
			break;
		case "Set of Clothing":
			if (theGame[0].clothes < theGame[0].traderItemQuantityWanted ){ window.alert("You do not have enough Clothing to make this trade!");}
			else{theGame[0].clothes -= theGame[0].traderItemQuantityWanted; itemTraded = true;}
			break;
		case "Bullets":
			if (theGame[0].ammo < theGame[0].traderItemQuantityWanted ){ window.alert("You do not have enough Bullets to make this trade!");}
			else{theGame[0].ammo -= theGame[0].traderItemQuantityWanted; itemTraded = true;}
			break;
		case "Wagon Wheels":
			if (theGame[0].wheels < theGame[0].traderItemQuantityWanted ){ window.alert("You do not have enough Wagon Wheels to make this trade!");}
			else{theGame[0].wheels -= theGame[0].traderItemQuantityWanted; itemTraded = true;}
			break;
		case "Wagon Axles":
			if (theGame[0].axles < theGame[0].traderItemQuantityWanted ){ window.alert("You do not have enough Wagon Axles to make this trade!");}
			else{theGame[0].axles -= theGame[0].traderItemQuantityWanted; itemTraded = true;}
			break;
		case "Wagon Tongues":
			if (theGame[0].tongues < theGame[0].traderItemQuantityWanted ){ window.alert("You do not have enough Wagon Tongues to make this trade!");}
			else{theGame[0].tongues -= theGame[0].traderItemQuantityWanted; itemTraded = true;}
			break;
		case "Pounds of Food":
			if (theGame[0].food < theGame[0].traderItemQuantityWanted ){ window.alert("You do not have enough Pounds of Food to make this trade!");}
			else{theGame[0].food -= theGame[0].traderItemQuantityWanted; itemTraded = true;}
			break;
	}
	if(itemTraded == true){
		aquireTradeItem(theGame[0].traderItemGiven);
		theGame[0].traderPresent = false; //after a trade is complete, they will no longer be present (for the day).
		goTown1();
		window.alert("You have succesfully traded "+theGame[0].traderItemQuantityWanted+" "+theGame[0].traderItemWanted+" for "+theGame[0].traderItemQuantityGiven+" "+theGame[0].traderItemGiven+" in return!");
		document.getElementById("button_acceptTrade").style.display ="none";
	}

}

/******************************************************************END TOWN MENU CODE ****************************************************************************************/




/******************************************************************START TRAVEL TRAIL CODE ****************************************************************************************/
var SplitExtraMiles =0;
var AnotherExtraMiles =0;
var extraEndOption = false;
function startTrail(){
	theGame[0].currMenu ="wrapper_travel_pause_menu";
	theGame[0].currWrapper ="wrapper_travel";
	document.getElementById("wrapper_townMenu").style.display = "none";
	document.getElementById("wrapper_travel").style.display = "block";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/MainMenu.png)';

	//set variables
	switch(theGame[0].location){
		case "Independence, Missouri":
			setDestinationVariables("Kansas River");//sets your miles variables according to the kansas river
			break;
		case "Kansas River":
			setDestinationVariables("Big Blue River");//sets your miles variables according to the kansas river
			break;

		//add more cases here when adding more destinations

		case "Big Blue River":
			setDestinationVariables("Fort Kearny");//sets your miles variables according to the kansas river
			break;
		case "Fort Kearny":
			setDestinationVariables("Chimney Rock");//sets your miles variables according to the kansas river
			break;
		case "Chimney Rock":
			setDestinationVariables("Fort Laramie");//sets your miles variables according to the kansas river
			break;
		case "Fort Laramie":
			setDestinationVariables("Independence Rock");//sets your miles variables according to the kansas river
			break;
		case "Independence Rock":
			setDestinationVariables("South Pass");//sets your miles variables according to the kansas river
			break;
		//You can either leave from south pass and stop inside the fort THEN  go tosoda springs, or go directly from South Pass
		case "South Pass":
			SplitExtraMiles = 0; //going here adds more miles to the trail
			setDestinationVariables("Green River");//sets your miles variables according to the kansas river
			break;
		case "Fort Bridger":
			SplitExtraMiles = 94;  //going here adds more miles to the trail
			setDestinationVariables("Soda Springs");//sets your miles variables according to the kansas river
			break;
		case "Green River":
			SplitExtraMiles = 0;  //going here adds more miles to the trail
			setDestinationVariables("Soda Springs");//sets your miles variables according to the kansas river
			break;
		case "Soda Springs":
			setDestinationVariables("Fort Hall");//sets your miles variables according to the kansas river
			break;
		case "Fort Hall":
			setDestinationVariables("Snake River Crossing");//sets your miles variables according to the kansas river
			break;
		case "Snake River Crossing":
			setDestinationVariables("Fort Boise");//sets your miles variables according to the kansas river
			break;
		case "Fort Boise":
			setDestinationVariables("Blue Mountains");//sets your miles variables according to the kansas river
			break;
		case "Fort Walla Walla":
			extraEndOption = true;
			SplitExtraMiles = 172;  //going here adds more miles to the trail
			setDestinationVariables("Oregon City");//sets your miles variables according to the kansas river
			break;
		case "Blue Mountains":
			extraEndOption = false;
			SplitExtraMiles = 0;  //going here adds more miles to the trail
			setDestinationVariables("The Dalles");//sets your miles variables according to the kansas river
			break;


		//add more cases here when adding more destinations

	}


	document.getElementById("wagon").style.left = "45vw";
	wagonPos = 45;
	theGame[0].storeType = "Trail";
	document.getElementById("trail_date").innerHTML = "<u>Date: </u>" + getDate(theGame[0].month);
	document.getElementById("trail_health").innerHTML ="<u>Average Health:</u> "+ calcAverageHealth();
	document.getElementById("trail_weather").innerHTML ="<u>Weather:</u> cold";
	document.getElementById("trail_food").innerHTML ="<u>Food:</u> "+ theGame[0].food+"lbs";
	document.getElementById("trail_nextLandmark").innerHTML ="<u>Next Landmark:</u> "+ theGame[0].milesLeft +"("+theGame[0].destinationName+")";
	document.getElementById("trail_milesTraveled").innerHTML ="<u>Miles Traveled:</u> "+ theGame[0].currentMilesTraveled;


}

function goBackToMenu(){
	console.log("Switching from "+theGame[0].currWrapper+" to "+theGame[0].currMenu)
	document.getElementById(theGame[0].currWrapper).style.display ="none";
	document.getElementById(theGame[0].currMenu).style.display ="block";

	switch (theGame[0].currMenu){
		case "wrapper_townMenu":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/IndependenceTown2.jpg)';
			break;
		case "wrapper_travel_pause_menu":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/campfire.gif)';
			break;

	}
}



function goToDestination_view1(){ //show view before entering destination
	// Just add a span that shows the town, like a picture of it
	theGame[0].currWrapper ="wrapper_goToDestination";
	document.getElementById("wrapper_goToDestination").style.display = "block";
	document.getElementById("wrapper_travel").style.display = "none";

	document.getElementById("button_startDestination").innerHTML = getDate(theGame[0].month) + "</br>"+theGame[0].location+"<br> Enter";
	//console.log(theGame[0].location);
	switch (theGame[0].destinationName){
		case "Kansas River":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/KansasRiver.png)';
			document.getElementById("wrapper_travel").style.display = "none";
			break;
		case "Big Blue River":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/BigBlueRiver.png)';
			document.getElementById("wrapper_travel").style.display = "none";
			break;
		case "Fort Kearny":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/FortKearny.jpg)';
			document.getElementById("wrapper_travel").style.display = "none";
			break;
		case "Chimney Rock":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/ChimneyRock.jpg)';
			document.getElementById("wrapper_travel").style.display = "none";
			break;
		case "Fort Laramie":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/FortLaramie.jpg)';
			document.getElementById("wrapper_travel").style.display = "none";
			break;
		case "Independence Rock":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/IndependenceRock.jpg)';
			document.getElementById("wrapper_travel").style.display = "none";
			break;
		case "South Pass":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/SouthPass.jpg)';
			document.getElementById("wrapper_travel").style.display = "none";
			break;
		case "Fort Bridger":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/FortBridger.jpg)';
			document.getElementById("wrapper_travel").style.display = "none";
			break;
		case "Soda Springs":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/SodaSprings.png)';
			document.getElementById("wrapper_travel").style.display = "none";
			break;
		case "Green River":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/GreenRiver.jpg)';
			document.getElementById("wrapper_travel").style.display = "none";
			break;
		case "Fort Hall":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/FortBridger.jpg)';
			document.getElementById("wrapper_travel").style.display = "none";
			break;
		case "Snake River Crossing":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/SnakeRiverCrossing.png)';
			document.getElementById("wrapper_travel").style.display = "none";
			break;
		case "Fort Boise":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/FortBoise.jpg)';
			document.getElementById("wrapper_travel").style.display = "none";
			break;
		case "Blue Mountains":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/BlueMountains.png)';
			document.getElementById("wrapper_travel").style.display = "none";
			break;
		case "Fort Walla Walla":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/FortWallaWalla.png)';
			document.getElementById("wrapper_travel").style.display = "none";
			break;
		case "The Dalles":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/TheDalles.jpg)';
			document.getElementById("wrapper_travel").style.display = "none";
			break;
		case "Oregon City":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/OregonCity.jpg)';
			document.getElementById("wrapper_travel").style.display = "none";
			break;

	}


}

function goToDestination(){ //enters destination itself

	switch (theGame[0].location){
		case "Kansas River": //when you reach this area, execute this code
			displayRiver();
			break;
		case "Big Blue River":
			displayRiver();
			break;
		case "Fort Kearny":
			goTown1();
			break;
		case "Chimney Rock":
			goBackToMenu();
			break;
		case "Fort Laramie":
			goTown1();
			break;
		case "Independence Rock":
			goBackToMenu();
			break;
		case "South Pass":
			//let the player choose the which split to take in the road
			showPrompt();
			break;
		case "Green River":
			displayRiver();
			break;
		case "Soda Springs":
			goBackToMenu();
			break;
		case "Fort Bridger":
			goTown1();
			break;

		case "Fort Hall":
			goTown1();
			break;
		case "Snake River Crossing":
			displayRiver();
			break;
		case "Fort Boise":
			goTown1();
			break;
		case "Blue Mountains":
			showPrompt();
			break;
  		case "Fort Walla Walla":
			goTown1();
			break;
		case "The Dalles":
			showPrompt();
			break;
		case "Oregon City":
			showPrompt();
			break;




	}

}
var wagonPos; //the start of the wagon position is always 45vw;
var TempMilesLeft;
function setDestinationVariables(destination){
	switch (destination){
		case "Kansas River":
			theGame[0].currentMilesTraveled = 0;
			theGame[0].milesToDestination = 102;
			theGame[0].milesLeft = 102; //this is just to display to the ui
			theGame[0].destinationName ="Kansas River";
			TempMilesLeft = theGame[0].milesLeft;
			setRiver("Kansas River");
			wagonPos = 45;
			document.getElementById("button_talkPrompt").innerHTML="A traveler tells you:<br> Some folks think two oxne are enough for the trail... I call em dead men walking";
			break;
		case "Big Blue River":
			theGame[0].currentMilesTraveled = 102;
			theGame[0].milesToDestination = 185;
			theGame[0].milesLeft = 83; //this is just to display to the ui
			theGame[0].destinationName ="Big Blue River";
			TempMilesLeft = theGame[0].milesLeft;
			setRiver("Big Blue River");
			wagonPos = 45;
			document.getElementById("button_talkPrompt").innerHTML="A party leader heading east tells you: <br> I'm tired of all these damn flies and this friggen baking sun!!!!";
			break;

		case "xxx": //CHANGE
			theGame[0].currentMilesTraveled = 0;
			theGame[0].milesToDestination = 102;
			theGame[0].milesLeft = 102; //this is just to display to the ui
			theGame[0].destinationName ="Kansas River";
			TempMilesLeft = theGame[0].milesLeft;
			setRiver(XXX); //CHANGE
			wagonPos = 45;

		case "Fort Kearny": //CHANGE
			theGame[0].currentMilesTraveled = 185;
			theGame[0].milesToDestination = 304;
			theGame[0].milesLeft = 119; //this is just to display to the ui
			theGame[0].destinationName ="Fort Kearny";
			TempMilesLeft = theGame[0].milesLeft;
			//setRiver(XXX); // DO NOT SET A RIVER FOR FORT KEARNY
			wagonPos = 45;
			document.getElementById("button_talkPrompt").innerHTML="A lady, Marnie Stewart tells you: This prarie is beautiful! look at the wild flowres and tall grass!~ *sigh* I miss town.";
			break;
		case "Chimney Rock": //CHANGE
			theGame[0].currentMilesTraveled = 304;
			theGame[0].milesToDestination = 554;
			theGame[0].milesLeft = 250; //this is just to display to the ui
			theGame[0].destinationName ="Chimney Rock";
			TempMilesLeft = theGame[0].milesLeft;
			//setRiver(XXX); // DO NOT SET A RIVER FOR FORT KEARNY
			wagonPos = 45;
			document.getElementById("button_talkPrompt").innerHTML="";
			break;
		case "Fort Laramie":
			theGame[0].currentMilesTraveled = 554;
			theGame[0].milesToDestination = 640;
			theGame[0].milesLeft = 86; //this is just to display to the ui
			theGame[0].destinationName ="Fort Laramie";
			TempMilesLeft = theGame[0].milesLeft;
			//setRiver(XXX); // DO NOT SET A RIVER FOR FORT KEARNY
			wagonPos = 45;
			document.getElementById("button_talkPrompt").innerHTML="A fort solider tells you:<br> THIS FORT IS MY LIFE. I WILL DESTROY ANY AND ALL HEATHENS AT ALL COSTS MUAHUHAUHA";
			break;
		case "Independence Rock":
			theGame[0].currentMilesTraveled = 640;
			theGame[0].milesToDestination = 830;
			theGame[0].milesLeft = 190; //this is just to display to the ui
			theGame[0].destinationName ="Independence Rock";
			TempMilesLeft = theGame[0].milesLeft;
			//setRiver(XXX); // DO NOT SET A RIVER FOR FORT KEARNY
			wagonPos = 45;
			document.getElementById("button_talkPrompt").innerHTML="Big louie, a trail driver, tells you:<br> Don't push those oxen too hard now! They have rights too...";
			break;
		case "South Pass":
			theGame[0].currentMilesTraveled = 830;
			theGame[0].milesToDestination = 932;
			theGame[0].milesLeft = 102; //this is just to display to the ui
			theGame[0].destinationName ="South Pass";
			TempMilesLeft = theGame[0].milesLeft;
			//setRiver(XXX); // DO NOT SET A RIVER FOR FORT KEARNY
			wagonPos = 45;
			document.getElementById("button_talkPrompt").innerHTML="Celinda Hines tells you:<br> Did you see chimney Rock?? The thing is sublime in the moonlight.. Many indians tried to trade fish with us for clothing!";
			break;
		case "Green River":
			theGame[0].currentMilesTraveled = 932;
			theGame[0].milesToDestination = 1,057;
			theGame[0].milesLeft = 125;
			theGame[0].destinationName ="Green River";
			TempMilesLeft = theGame[0].milesLeft;
			setRiver("Green River"); // DO NOT SET A RIVER FOR FORT KEARNY
			wagonPos = 45;
			document.getElementById("button_talkPrompt").innerHTML="Celinda Hines tells you:<br> We meet again! make sure to rest when you need to. Family Survival is priority 1!";
			break;
		case "Soda Springs":
			theGame[0].currentMilesTraveled = 932 +SplitExtraMiles;
			theGame[0].milesToDestination = 1201 + SplitExtraMiles;
			theGame[0].milesLeft = 269 + SplitExtraMiles; //add extra miles based on your choice made
			theGame[0].destinationName ="Soda Springs";
			TempMilesLeft = theGame[0].milesLeft;
			//setRiver(XXX); // DO NOT SET A RIVER FOR FORT KEARNY
			wagonPos = 45;
			document.getElementById("button_talkPrompt").innerHTML="A traveler tells you:<br> Some folks think two oxen are enough for the trail... I call em dead men walking";
			break;
		case "Fort Hall":
			theGame[0].currentMilesTraveled = 1201 + SplitExtraMiles;
			theGame[0].milesToDestination = 1,258 + SplitExtraMiles;
			theGame[0].milesLeft = 57 + SplitExtraMiles;
			theGame[0].destinationName ="Fort Hall";
			TempMilesLeft = theGame[0].milesLeft;

			//setRiver("Green River"); // DO NOT SET A RIVER FOR FORT KEARNY
			//wagonPos = 45;


			//setRiver("XXX"); // DO NOT SET A RIVER FOR FORT KEARNY
			document.getElementById("button_talkPrompt").innerHTML="A traveler tells you:<br> Some folks think two oxne are enough for the trail... I call em dead men walking";
			wagonPos = 45;
			break;
		case "Snake River Crossing":
			theGame[0].currentMilesTraveled = 1,258 + SplitExtraMiles;
			theGame[0].milesToDestination = 1,440 + SplitExtraMiles;
			theGame[0].milesLeft = 182 + SplitExtraMiles;
			theGame[0].destinationName ="Snake River Crossing";
			TempMilesLeft = theGame[0].milesLeft;
			setRiver("Snake River"); // DO NOT SET A RIVER FOR FORT KEARNY
			wagonPos = 45;
			document.getElementById("button_talkPrompt").innerHTML="A traveler tells you:<br> Some folks think two oxne are enough for the trail... I call em dead men walking";
			break;
		case "Fort Boise":
			theGame[0].currentMilesTraveled = 1,440 + SplitExtraMiles;
			theGame[0].milesToDestination = 1,554 + SplitExtraMiles;
			theGame[0].milesLeft = 114 + SplitExtraMiles;
			theGame[0].destinationName ="Fort Boise";
			TempMilesLeft = theGame[0].milesLeft;
			//setRiver("XXX"); // DO NOT SET A RIVER FOR FORT KEARNY
			wagonPos = 45;
			document.getElementById("button_talkPrompt").innerHTML="A traveler tells you:<br> Some folks think two oxne are enough for the trail... I call em dead men walking";
			break;
		case "Blue Mountains":
			theGame[0].currentMilesTraveled = 1,554 + SplitExtraMiles;
			theGame[0].milesToDestination = 1,714 + SplitExtraMiles;
			theGame[0].milesLeft = 160 + SplitExtraMiles;
			theGame[0].destinationName ="Blue Mountains";
			TempMilesLeft = theGame[0].milesLeft;
			//setRiver("XXX"); // DO NOT SET A RIVER FOR FORT KEARNY
			wagonPos = 45;
			break;
		case "The Dalles":
			theGame[0].currentMilesTraveled = 1,714 + SplitExtraMiles + AnotherExtraMiles;
			theGame[0].milesToDestination = 1,769 + SplitExtraMiles + AnotherExtraMiles;
			theGame[0].milesLeft = 55 + SplitExtraMiles + AnotherExtraMiles;
			theGame[0].destinationName ="The Dalles";
			TempMilesLeft = theGame[0].milesLeft;
			//setRiver("XXX"); // DO NOT SET A RIVER FOR FORT KEARNY
			wagonPos = 45;
			document.getElementById("button_talkPrompt").innerHTML="A traveler tells you:<br> Some folks think two oxne are enough for the trail... I call em dead men walking";
			break;
		case "Oregon City":
			theGame[0].currentMilesTraveled = 1,714 + SplitExtraMiles + AnotherExtraMiles;
			theGame[0].milesToDestination = 1,769 + SplitExtraMiles + AnotherExtraMiles;
			theGame[0].milesLeft = 55 + SplitExtraMiles + AnotherExtraMiles;
			theGame[0].destinationName ="Oregon City";
			TempMilesLeft = theGame[0].milesLeft;
			//setRiver("XXX"); // DO NOT SET A RIVER FOR FORT KEARNY
			wagonPos = 45;
			document.getElementById("button_talkPrompt").innerHTML="A traveler tells you:<br> Some folks think two oxne are enough for the trail... I call em dead men walking";
			break;


		//Add More cases here
	}

}

function pauseOrStarTrail(choice){
	theGame[0].currWrapper ="wrapper_travel";
	if(choice =="start"){
		theGame[0].continueTrail = true;
		beginMoving();
		console.log(theGame[0].continueTrail);

	}
	else if(choice =="pause"){
		theGame[0].continueTrail = false;
		beginMoving();
	}
}

function continueOnTrail(){
	if(theGame[0].oxen > 0){
		if(theGame[0].milesLeft <=0){ //then you are pressing continue trail after finishing reaching a destination, so we reset your destination variables to the next place
			document.getElementById("reached_destinationPrompt").style.display ="none";
			document.getElementById("wrapper_travel_pause_menu").style.display ="none";
			startTrail();
		}
		else{ //if miels is not <=0 then we are on a destination still, bring you back to the trail without restarting varaibles
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/MainMenu.png)';
			document.getElementById("wrapper_travel_pause_menu").style.display ="none";
			document.getElementById("wrapper_travel").style.display ="block";
			document.getElementById("trail_date").innerHTML = "<u>Date: </u>" + getDate(theGame[0].month);
			document.getElementById("trail_food").innerHTML = "<u>Food: </u>" + theGame[0].food +"lbs";
			document.getElementById("trail_health").innerHTML = "<u>Avg Health: </u>" + calcAverageHealth();
			document.getElementById("trail_weather").innerHTML ="<u>Weather:</u> cold";
		}
	
	}
	else if(theGame[0].oxen <= 0){
			window.alert("Not Enough Oxen to continue pulling the cart! I Have to look for more by trading!!");
			goBackToMenu();
	}
	



}

function setSouthPathChoice(choice){

	if(choice == 'Fort Bridger'){
		theGame[0].currMenu ="wrapper_townMenu";
		theGame[0].location = "Fort Bridger";
		document.getElementById("wrapper_goToDestination").style.display ="none";
		goTown1();
	}
	else if(choice =='Green River'){
		theGame[0].currMenu ="wrapper_travel_pause_menu";
		theGame[0].location = "South Pass";
		document.getElementById("wrapper_goToDestination").style.display ="none";
		goBackToMenu();
	}
	document.getElementById("wrapper_southPassChoice").style.display ="none";

}

function setBlueMountainPathChoice(choice){

	if(choice == 'Fort Walla Walla'){
		theGame[0].currMenu ="wrapper_townMenu";
		theGame[0].location = "Fort Walla Walla";
		document.getElementById("wrapper_goToDestination").style.display ="none";
		document.getElementById("wrapper_blueMountainsChoice").style.display ="none";
		goTown1();
	}
	else if(choice =='The Dalles'){
		theGame[0].currMenu ="wrapper_travel_pause_menu";
		theGame[0].location = "Blue Mountains";
		document.getElementById("wrapper_goToDestination").style.display ="none";
		document.getElementById("wrapper_blueMountainsChoice").style.display ="none";
		goBackToMenu();
	}
	document.getElementById("wrapper_blueMountainChoice").style.display ="none";

}

function setOregonCityChoice(choice){

	if(choice == 'Toll'){
		theGame[0].currMenu ="wrapper_townMenu";
		//theGame[0].location = "Fort Walla Walla";
		document.getElementById("wrapper_goToDestination").style.display ="none";
		document.getElementById("wrapper_oregonCityChoice").style.display ="none";

		//END THE GAME HERE

		//location.reload();
		//PUSH CODE TO DB

	}
	else if(choice =='Raft'){
		theGame[0].currMenu ="wrapper_travel_pause_menu";
		//theGame[0].location = "The Dalles";
		document.getElementById("wrapper_goToDestination").style.display ="none";
		document.getElementById("wrapper_oregonCityChoice").style.display ="none";

		//START RAFTING MINIGAME HERE
		startRaft();

	}
	document.getElementById("wrapper_blueMountainsChoice").style.display ="none";

}

function showPrompt(){
	document.getElementById(theGame[0].currWrapper).style.display ="none";


	switch (theGame[0].location){
		case 'South Pass':
			theGame[0].currWrapper = "wrapper_southPassChoice";
			document.getElementById("wrapper_southPassChoice").style.display ="block";
			break;
		case 'Blue Mountains':
			theGame[0].currWrapper = "wrapper_blueMountainsChoice";
			document.getElementById("wrapper_blueMountainsChoice").style.display ="block";
			break;
		case 'The Dalles':
		case 'Oregon City':
			theGame[0].currWrapper = "wrapper_oregonCityChoice";
			document.getElementById("wrapper_oregonCityChoice").style.display ="block";
			if(extraEndOption == false ){ //hide the toll road option if extra end option is false
				document.getElementById("button_oregonCityPrompt").innerHTML = " I can't go back now... My only choice to get to Oregon City is to Raft down the river Dalles <br> May god have mercy...";
				document.getElementById("button_ChooseToll").style.display ="none";
			}
			break;
	}
}




/*************************************************************START WAGON MOVEMENTS & CALCULATIONS CODE*************************************************/
function beginMoving(){
	if(theGame[0].continueTrail == true){
		
		if(theGame[0].oxen > 0){
		if (theGame[0].milesLeft > 0){
			moveWagon(); //move the wagon if we are not at the destination
			console.log("moving");
			rest(); //rest a day after traveling
			//PUT RANDOM FUNCTIONS HERE
			//choose a random event (an event does not have to occur)
			//process diseases on family
			randomEventGenerator();
			processDisease();
			document.getElementById("trail_date").innerHTML = "<u>Date: </u>" + getDate(theGame[0].month);
			document.getElementById("trail_food").innerHTML = "<u>Food: </u>" + theGame[0].food +"lbs";
			document.getElementById("trail_health").innerHTML = "<u>Avg Health: </u>" + calcAverageHealth();
			document.getElementById("trail_weather").innerHTML ="<u>Weather:</u> cold";
			//SEND PLAYER BACK TO MENU IF PLAYER OXEN AMOUNT IS < 0
			setTimeout(function() {
	    		// rest of code here
	    		beginMoving(); //attempt to begin moving the wagon again
				}, 1000);
			document.getElementById("input_restDays").value = 1;
			document.getElementById("trail_date").innerHTML = "<u>Date: </u>" + getDate(theGame[0].month);
			document.getElementById("trail_food").innerHTML = "<u>Food: </u>" + theGame[0].food +"lbs";
			document.getElementById("trail_health").innerHTML = "<u>Avg Health: </u>" + calcAverageHealth();
			document.getElementById("trail_weather").innerHTML ="<u>Weather:</u> cold";
		}
		else{ //you have reached the destination
			document.getElementById("reached_destinationPrompt").style.display = "block";
			document.getElementById("button_destinationPrompt").innerHTML = "You have reached "+ theGame[0].destinationName+"!";
			theGame[0].location = theGame[0].destinationName; //update location to destination name

		}
		
		}
		else if(theGame[0].oxen <= 0){
			window.alert("Not Enough Oxen to continue pulling the cart! I Have to look for more trading!!");
			goBackToMenu();
		}

	}	
	else if(theGame[0].continueTrail == false){ //go back to travel pause menu
		console.log("GOIN BACK");
		goBackToMenu();
	}


}

function moveWagon(){ //calculates the number of miles that will be traveled for the day, based on your pace and moves the wagon accordingly
		var milestoTravel = 0;
		switch (theGame[0].pace){
			case "Steady":
				milestoTravel = ( Math.floor(Math.random() * (15 - 12 + 1)) + 12) + Number(theGame[0].oxen);
				console.log("Your pace is: "+ theGame[0].pace+" today the wagon will move "+milestoTravel+" miles.");
				animateWagon(milestoTravel);
				break;
			case "Straining":
				milestoTravel = ( Math.floor(Math.random() * (25 - 22 + 1)) + 22) + Number(theGame[0].oxen);
				console.log("Your pace is: "+ theGame[0].pace +" today the wagon will move "+milestoTravel+" miles.");
				animateWagon(milestoTravel);
				break;
			case "Grueling":
				milestoTravel = ( Math.floor(Math.random() * (28 - 25 + 1)) + 25) + Number(theGame[0].oxen);
				console.log("Your pace is: "+ theGame[0].pace +" today the wagon will move "+milestoTravel+" miles.");
				animateWagon(milestoTravel);
				break;
		}
}



function animateWagon(miles){
	var pixelsToMove = (25/TempMilesLeft)*miles; //total pixels to move is (25vw / milesToDestination) * number of miles
	wagonPos -= pixelsToMove; //new wagon pos is old wagon pos - pixels moved
	document.getElementById("wagon").style.left = wagonPos + 'vw';
	//console.log("miles left before move: "+theGame[0].milesLeft);
	theGame[0].currentMilesTraveled = theGame[0].currentMilesTraveled + Number(miles); //add how many miles were traveled to the current miles traveled variable
	theGame[0].milesLeft = theGame[0].milesLeft - Number(miles); //reduce miles to destination by miles that the player has traveled
	//console.log("miles left AFTER move: "+theGame[0].milesLeft);
	//console.log("going to move wagon to "+pixelsToMove+"vw, new position will be: "+wagonPos+" total miles traveled: "+theGame[0].currentMilesTraveled);
	var MilesLeftshown = theGame[0].milesLeft; if(MilesLeftshown < 0){ MilesLeftshown = 0;} //this makes it so negative values are not displayed for miles left
	document.getElementById("trail_nextLandmark").innerHTML ="<u>Next Landmark:</u> "+ MilesLeftshown +"("+theGame[0].destinationName+")"; //update ui elements
	document.getElementById("trail_milesTraveled").innerHTML ="<u>Miles Traveled:</u> "+ theGame[0].currentMilesTraveled; //update ui elements
	theGame[0].totalMiles += miles;
}


/*************************************************************END WAGON MOVEMENTS & CALCULATIONS CODE*************************************************/

/******************************************************************END TRAVEL TRAIL CODE ****************************************************************************************/



/*************************************************************RIVER MENU AF*************************************************/
var river_depth = 0;
var river_width = 0;
var ferry_price = 0;
var cur_river = "";

function displayRiver(){
	document.getElementById(theGame[0].currWrapper).style.display="none";

	theGame[0].currWrapper ="wrapper_rivermenu";

	document.getElementById("wrapper_rivermenuinfo").style.display="none";
	document.getElementById("wrapper_rivermenu").style.display="block";
	document.getElementById("river_info_name").innerHTML = theGame[0].destinationName;
	document.getElementById("river_info_width").innerHTML = "River Width: " + river_width;
	document.getElementById("river_info_depth").innerHTML = "River Depth: " + river_depth;
	document.getElementById("river_info_price").innerHTML = "Ferry Price: $" + ferry_price;

}

function setRiver(river){
	var riverD = (Math.random() * 10) + 1;
	var riverW = Math.floor(Math.random() * (1200-200+1))+200;
	if(river == "Kansas River"){
		river_depth = riverD;
		river_width = riverW;
		ferry_price = 5;
		cur_river = river;
	}else if(river == "Big Blue River"){
		river_depth = riverD;
		river_width = riverW;
		ferry_price = 7;
		cur_river = river;
	}else if(river == "Green River"){
		river_depth = riverD;
		river_width = riverW;
		ferry_price = 9;
		cur_river = river;
	}else if(river == "Snake River"){
		river_depth = riverD;
		river_width = riverW;
		ferry_price = 11;
		cur_river = river;
	}
	document.getElementById("river_info_name").innerHTML =  theGame[0].destinationName;
	document.getElementById("river_info_width").innerHTML = "River Width: " + river_width;
	document.getElementById("river_info_depth").innerHTML = "River Depth: " + river_depth;

}
function fordRiver(){
	if(river_depth > 3){
		// Lose random items or kill person
		var whatHappens = Math.floor((Math.random()*3)+1);
		switch(whatHappens){
			case 1:
			loseItem();
			break;
			case 2:
			killPersonRandom();
			break;
			case 3:
			loseItem();
			killPersonRandom();
			break;
		}

		document.getElementById("riverAnimation").style.backgroundImage = 'url(Images/riverCrossFail.gif)';
		document.getElementById("riverAnimation").style.display ="block";
		setTimeout(function() {
	    		// rest of code here
	    	document.getElementById("riverAnimation").style.display ="none";
	    	goBackToMenu();
		}, 4950);
		window.alert("Your family almost died fording the river!");
	}else{
		document.getElementById("wrapper_rivermenu").style.display ="block";

		document.getElementById("riverAnimation").style.backgroundImage = 'url(Images/riverCross.gif)';
		document.getElementById("riverAnimation").style.display ="block";
		setTimeout(function() {
	    		// rest of code here
	    	document.getElementById("riverAnimation").style.display ="none";
	    	goBackToMenu();
		}, 4500);
		window.alert("You have forded the river successfully!");
	}
}

function caulkRiver(){
	if(river_depth < 3){
		window.alert("River is too shallow to caulk!");
	}else if(river_width >= 700){
		// drown wagon lose something or kill someone
		var whatHappens = Math.floor((Math.random()*3)+1);
		switch(whatHappens){
			case 1:
			loseItem();
			break;
			case 2:
			killPersonRandom();
			break;
			case 3:
			loseItem();
			killPersonRandom();
			break;
		}
		//show river animtion
		document.getElementById("riverAnimation").style.backgroundImage = 'url(Images/riverCrossFail.gif)';
		document.getElementById("riverAnimation").style.display ="block";
		setTimeout(function() {
	    		// rest of code here
	    	document.getElementById("riverAnimation").style.display ="none";
	    	goBackToMenu();
		}, 4950);
		// go to div passed river
		window.alert("Your family almost died caulking the river!");
	}else{
		//show river animtion
		document.getElementById("riverAnimation").style.backgroundImage = 'url(Images/riverCross.gif)';
		document.getElementById("riverAnimation").style.display ="block";
		setTimeout(function() {
	    	// rest of code here
	    	document.getElementById("riverAnimation").style.display ="none";
	    	goBackToMenu();
		}, 4500);
	    // go to div passed river
	    window.alert("You have caulked the river successfully!");

	}
}

function ferryRiver(){

	if(ferry_price > theGame[0].money){
		window.alert("Sorry, not enough money to pay for ferry!");
	}else{
		theGame[0].money -= ferry_price;
		document.getElementById("riverAnimation").style.backgroundImage = 'url(Images/riverFerry.gif)';
		document.getElementById("riverAnimation").style.display ="block";
		setTimeout(function() {
	    	// rest of code here
	    	document.getElementById("riverAnimation").style.display ="none";
	    	goBackToMenu();
		}, 7500);
	    // go to div passed river
	    window.alert("You have successfully crossed the river!");
	}
}

function wait4River(){
	document.getElementById("input_restDays").value = 1;
	rest();
	setRiver(cur_river);
	window.alert("River conditions changed.");
}

function riverInfo(){
	//
	document.getElementById("wrapper_rivermenu").style.display="none";
	document.getElementById("wrapper_rivermenuinfo").style.display="block";
	document.getElementById("river_info2").innerHTML = "To ford the river means to attempt to cross with the wagon fully assembled.";
	document.getElementById("river_info3").innerHTML = "To caulk the river means to take off the wheels off of the wagon, and attempt to float it across the river.";
	document.getElementById("river_info4").innerHTML = "To take the ferry means to pay the ticket cost for the ferry and to cross the river safely on the ferry.";
	document.getElementById("river_info5").innerHTML = "To wait a for conditions to change means spending a day at the river hoping the conditions improve.";
}

/*************************************************************END RIVER MENU AF*************************************************/


/**********************************************START Random Acts For Travel ****************************************/

// Something like this?
function wagonWheelBreak(){
	theGame[0].wagonAWheels--;
	window.alert("Your wagon wheel has broken!");
	//Would you like to repair it?
	var repair = Math.floor((Math.random()*2))+1;
	if(repair == 1){
		window.alert("Could not repair the wagon.");
		// Would you like to use a spare?

		if(theGame[0].wheels > 0){
			window.alert("Replaced the wheel with a spare!");
			theGame[0].wagonAWheels++;
			theGame[0].wheels--;
		}else{
			window.alert("You do not have any spare wheels to change out the broken wheel.");
			// Cannot move on until wagon wheel are 4;
			//SEND PLAYER BACK TO MAIN MENU
		}
	}else{
		window.alert("Wagon wheel successfully repaired!");
		theGame[0].wagonAWheels++;
	}
}

function wagonAxleBreak(){
	theGame[0].wagonAAxles--;
	window.alert("Your wagon axle has broken!");
	//Would you like to repair it?
	var repair = Math.floor((Math.random()*2))+1;
	if(repair == 1){
		window.alert("Could not repair the wagon.");
		// Would you like to use a spare?

		if(theGame[0].axles > 0){
			window.alert("Replaced the axle with a spare!");
			theGame[0].wagonAAxles++;
			theGame[0].axles--;
		}else{
			window.alert("You do not have any spare axles to change out the broken axle.");
			// Cannot move on until wagon axle are 2
			//SEND PLAYER BACK TO MAIN MENU
		}
	}else{
		window.alert("Wagon Axle successfully repaired!");
		theGame[0].wagonAAxles++;
	}

}

function wagonTongueBreak(){
	theGame[0].wagonATongue--;
	window.alert("Your wagon tongue has broken!");
	//Would you like to repair it?
	var repair = Math.floor((Math.random()*2))+1;
	if(repair == 1){
		window.alert("Could not repair the wagon.");
		// Would you like to use a spare?

		if(theGame[0].tongues > 0){
			window.alert("Replaced the axle with a spare!");
			theGame[0].wagonATongue++;
			theGame[0].tongues--;
		}else{
			window.alert("You do not have any spare tongues to change out the broken tongue.");
			// Cannot move on until wagon axle are 2
			//SEND PLAYER BACK TO MAIN MENU
		}
	}else{
		window.alert("Wagon tongue successfully repaired!");
		theGame[0].wagonATongue++;
	}
}

function tookWrongTrail(){
	var daysLost = Math.floor(Math.random() * 7)+1;
	window.alert("You have taken the wrong trail, you have wondered " + daysLost + " days getting back on track.");
	document.getElementById("input_restDays").value = daysLost;
	rest();
}

function findItems(){
	var itemNum = Math.floor((Math.random() * 14)+1);
	var itemGot = 0;
	switch(itemNum){
		case 1:
		case 8:
		itemGot = Math.floor((Math.random() * Number(theGame[0].oxen))+1)+1;
		theGame[0].oxen += itemGot;
		window.alert("You have found " + itemGot + " oxen.");
		break;
		case 2:
		case 9:
		itemGot = Math.floor((Math.random() * Number(theGame[0].clothes))+1)+1;
		theGame[0].clothes += itemGot;
		window.alert("You have found " + itemGot + " clothes.");
		break;
		case 3:
		case 10:
		itemGot = Math.floor((Math.random() * Number(theGame[0].ammo))+1)+1;
		theGame[0].ammo += itemGot;
		window.alert("You have found " + itemGot + " bullets.");
		break;
		case 4:
		case 11:
		itemGot = Math.floor((Math.random() * Number(theGame[0].wheels))+1)+1;
		theGame[0].wheels += itemGot;
		window.alert("You have found " + itemGot + " wheels.");
		break;
		case 5:
		case 12:
		itemGot = Math.floor((Math.random() * Number(theGame[0].axles))+1)+1;
		theGame[0].axles += itemGot;
		window.alert("You have found " + itemGot + " axles.");
		break;
		case 6:
		case 13:
		itemGot = Math.floor((Math.random() * Number(theGame[0].tongues))+1)+1;
		theGame[0].tongues += itemGot;
		window.alert("You have found " + itemGot + " tongues.");
		break;
		case 7:
		case 14:
		itemGot = Math.floor((Math.random() * Number(theGame[0].food))+1)+1;
		theGame[0].food += itemGot;
		window.alert("You have found " + itemGot + " pounds of food.")+1;
		break;
	}
}

function findBarries(){
	var barriesFound = Math.floor(Math.random()*20)+1;
	window.alert("You have found " + barriesFound + " berries.");
	theGame[0].food += Math.floor(barriesFound/4);
}

function lostTrail(){
	var daysLost = Math.floor(Math.random() * 7)+1;
	window.alert("You have lost the trail, you have wondered " + daysLost + " days getting back on track.");
	document.getElementById("input_restDays").value = daysLost;
	rest();
}

function lostFood(){
	var foodloss = Math.floor(Math.random() * Number(theGame[0].food))+1;
	window.alert( foodloss + " pounds of food have spoiled.");
	theGame[0].food -= foodloss;
}

function noGrass(){
	window.alert("There is no grass here.");
}

function oxWonder(){
	window.alert("Your oxen has wandered off, you lose a day recapturing it.");
	document.getElementById("input_restDays").value = 1;
	rest();
}

function oxDied(){
	window.alert("One of your oxen has died.");
	theGame[0].oxen--;
}

function thiefStole(){

	var numofItemsStolen = Math.floor(Math.random()*4)+1;
	window.alert("A theif has stolen items from you at night.");
	switch (numofItemsStolen) {
		case 1:
		loseItem();
		break;
		case 2:
		loseItem();
		loseItem();
		break;
		case 3:
		loseItem();
		loseItem();
		loseItem();
		break;
		case 4:
		loseItem();
		loseItem();
		loseItem();
		loseItem();
		break;
	}

}

function wagonFire(){
	var numofItemsBurned = Math.floor(Math.random()*4)+1;
	window.alert("A fire has erupted, you have lost items.");
	switch (numofItemsBurned) {
		case 1:
		loseItem();
		break;
		case 2:
		loseItem();
		loseItem();
		break;
		case 3:
		loseItem();
		loseItem();
		loseItem();
		break;
		case 4:
		loseItem();
		loseItem();
		loseItem();
		loseItem();
		break;
	}
}

function p_gotLost(){
	window.alert("Member of your party has goten lost, you lose a day to find them.");
	document.getElementById("input_restDays").value = 1;
	rest();
}

function snakeBite(){
	var bittenPerson = Math.floor(Math.random()*4)+0;
	window.alert(theGame[0].game_family[bittenPerson].p_name + " has been bitten by a snake.");
	theGame[0].game_family[bittenPerson].health -= 2;
}

function dysentery(){
	for (var i=0; i<theGame[0].game_family.length; i++){
		if (theGame[0].game_family[i].health < 80){ theGame[0].game_family[infect].condition = "dysentery"; break;}
	}

}

function cholera(){
	for (var i=0; i<theGame[0].game_family.length; i++){
		if (theGame[0].game_family[i].health < 80){ theGame[0].game_family[infect].condition = "cholera"; break;}
	}
}

function exhaustion(){

for (var i=0; i<theGame[0].game_family.length; i++){
		if (theGame[0].game_family[i].health < 80){ theGame[0].game_family[infect].condition = "exhaustion"; break;}
	}
}

function fever(){

	for (var i=0; i<theGame[0].game_family.length; i++){
		if (theGame[0].game_family[i].health < 80){ theGame[0].game_family[infect].condition = "fever"; break;}
	}
}

function wellAgain(){
	var i = 0;
	for(i = 0; i < 5; i++){
		if(theGame[0].game_family[i].condition!="" && theGame[0].game_family[i].health > 20){
			console.log("THE CONDITION IS: "+theGame[0].game_family[i].condition);
			window.alert(theGame[0].game_family[i].p_name + " has gotten better.");
			theGame[0].game_family[i].condition = "";
		}
	}
}

function takenWorst(){
	var i = 0;
	for(i = 0; i < 5; i++){
		if(theGame[0].game_family[i].condition != "" && theGame[0].game_family[i].health < 20){
			window.alert(theGame[0].game_family[i].p_name + " has taken a turn for the worst.");
		}
	}
}

function processDisease(){
	wellAgain();
	takenWorst();
	for(var i = 0; i < 5; i++){
		if(theGame[0].game_family[i].condition!="dysentery"){
			theGame[0].game_family[i].health -= 5;
		}else if(theGame[0].game_family[i].condition!="cholera"){
			theGame[0].game_family[i].health -= 7;
		}else if(theGame[0].game_family[i].condition!="exhaustion"){
			theGame[0].game_family[i].health -= 3;
		}else if(theGame[0].game_family[i].condition!="fever"){
			theGame[0].game_family[i].health -= 9;
		}
	}
}

/**********************************************END Random Acts For Travel ****************************************/



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
function winGame(){
	

	var score = (theGame[0].food +theGame[0].money + theGame[0].oxen+ theGame[0].wheels + theGame[0].axles +theGame[0].tongues+ theGame[0].clothes) * theGame[0].pointsMulti;
	window.alert("YOU WON THE GAME! Your Score: "+score );

	winGame(theGame[0].game_family[0].p_name,score);

}

function goBackToMenu(){
	console.log("Switching from "+theGame[0].currWrapper+" to "+theGame[0].currMenu)
	document.getElementById(theGame[0].currWrapper).style.display ="none";
	document.getElementById(theGame[0].currMenu).style.display ="block";

	switch (theGame[0].currMenu){
		case "wrapper_townMenu":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/IndependenceTown2.jpg)';
			document.getElementById("weather_town").innerHTML = "<u>Weather:</u> warm";
			document.getElementById("date_town").innerHTML = "<u>"+getDate(theGame[0].month)+"</u>";
			document.getElementById("location_town").innerHTML = "<u>"+theGame[0].location+"</u>";
			document.getElementById("health_town").innerHTML ="<u>Average Health:</u> "+ calcAverageHealth();
			document.getElementById("pace_town").innerHTML = "<u>Pace:</u> "+theGame[0].pace;
			document.getElementById("rations_town").innerHTML = "<u>Rations:</u> " + getRationStatus();
			break;
		case "wrapper_travel_pause_menu":
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/campfire.gif)';
			break;

	}
}


function aquireTradeItem(item){
	switch (item){
		case "Oxen":
			theGame[0].oxen += theGame[0].traderItemQuantityGiven;
			break;
		case "Set of Clothing":
			theGame[0].clothes += theGame[0].traderItemQuantityGiven;
			break;
		case "Bullets":
			theGame[0].ammo += theGame[0].traderItemQuantityGiven;
			break;
		case "Wagon Wheels":
			theGame[0].wheels += theGame[0].traderItemQuantityGiven;
			break;
		case "Wagon Axles":
			theGame[0].axles += theGame[0].traderItemQuantityGiven;
			break;
		case "Wagon Tonges":
			theGame[0].tongues += theGame[0].traderItemQuantityGiven;
			break;
		case "Pounds of Food":
			theGame[0].food += theGame[0].traderItemQuantityGiven;
			break;
	}
}

function calcAverageHealth(){ //takes the average of your family members health
	var HealthTotal = 0;
	for (i = 0; i < theGame[0].game_family.length; i++){
		//console.log(theGame[0].game_family[i].p_name+"'s Health is: "+theGame[0].game_family[i].health);
		HealthTotal += theGame[0].game_family[i].health;
	}

	if(HealthTotal < 1){
		document.getElementsByTagName("body")[0].style.background = "#890808";
		document.getElementById("GameBox").style.backgroundImage = 'url(Images/BlackScreen.png)';
		document.getElementById("div_Menu").style.display ="none";
		setTimeout(function() {
    		// rest of code here
    		var score = (theGame[0].food +theGame[0].money + theGame[0].oxen+ theGame[0].wheels + theGame[0].axles +theGame[0].tongues+ theGame[0].clothes) * theGame[0].pointsMulti;

			saveDeath(theGame[0].game_family[0].p_name,score);
    		window.alert( "Your Family has all died, how careless of you. You are trash. I'm going to just refresh the page for you, you useless idiot....");

		location.reload();
		}, 300);
	}
	//console.log("Average health is: "+(HealthTotal/5) );
	else{
	switch (true){
		case ( (HealthTotal/5) > 75 ):
			return ("<font color='green'>"+(HealthTotal/5)+"</font>");
			break;
		case ( (HealthTotal/5) > 50 ):
			return ("<font color='orange'>"+(HealthTotal/5)+"</font>");
			break;
		case ( (HealthTotal/5) > 25 ):
			return ("<font color='purple'>"+(HealthTotal/5)+"</font>");
			break;
		case ( (HealthTotal/5) > 1 ):
			return ("<font color='red'>"+(HealthTotal/5)+"</font>");
			break;
		case ((HealthTotal/5) == 0):
			document.getElementsByTagName("body")[0].style.background = "#890808";
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/BlackScreen.png)';
			document.getElementById("div_Menu").style.display ="none";
			setTimeout(function() {
    		// rest of code here
    		var score = (theGame[0].food +theGame[0].money + theGame[0].oxen+ theGame[0].wheels + theGame[0].axles +theGame[0].tongues+ theGame[0].clothes) * theGame[0].pointsMulti;

			saveDeath(theGame[0].game_family[0].p_name,score);
    		window.alert( "Your Family has all died, how careless of you. You are trash. I'm going to just refresh the page for you, you useless idiot....");
			location.reload();
			}, 300);

			break;
	}
	return "Invalid health amount";
	

	}
	

}

function setRandomTradeValues(){
	var randomNumberBetween0and6 = Math.floor(Math.random() * 7); //get a random num in the range of 7 numbers, (0 to 6)
	var second_randomNumberBetween0and6  = Math.floor(Math.random() * 7);
	switch (randomNumberBetween0and6){
		case 0:
			theGame[0].traderItemWanted = "Oxen";
			var numItems = Math.floor(Math.random() * 5) + 1;
			break
		case 1:
			theGame[0].traderItemWanted = "Set of Clothing";
			var numItems = Math.floor(Math.random() * 5) + 1;
			theGame[0].traderItemQuantityWanted = numItems;
			break;
		case 2:
			theGame[0].traderItemWanted = "Bullets";
			var numItems = Math.floor(Math.random() * 200) + 20;
			theGame[0].traderItemQuantityWanted = numItems;
			break;
		case 3:
			theGame[0].traderItemWanted = "Wagon Wheels";
			var numItems = Math.floor(Math.random() * 3) + 1;
			theGame[0].traderItemQuantityWanted = numItems;
			break;
		case 4:
			theGame[0].traderItemWanted = "Wagon Axles";
			var numItems = Math.floor(Math.random() * 3) + 1;
			theGame[0].traderItemQuantityWanted = numItems;
			break;
		case 5:
			theGame[0].traderItemWanted = "Wagon Tongues";
			var numItems = Math.floor(Math.random() * 3) + 1;
			theGame[0].traderItemQuantityWanted = numItems;
			break;
		case 6:
			theGame[0].traderItemWanted = "Pounds of Food";
			var numItems = Math.floor(Math.random() * 200) + 1;
			theGame[0].traderItemQuantityWanted = numItems;
			break;
	}
	switch(second_randomNumberBetween0and6){
		case 0:
			theGame[0].traderItemGiven = "Oxen";
			var numItems = Math.floor(Math.random() * 5) + 1;
			theGame[0].traderItemQuantityGiven = numItems;
			break
		case 1:
			theGame[0].traderItemGiven = "Set of Clothing";
			var numItems = Math.floor(Math.random() * 5) + 1;
			theGame[0].traderItemQuantityGiven = numItems;
			break;
		case 2:
			theGame[0].traderItemGiven = "Bullets";
			var numItems = Math.floor(Math.random() * 200) + 20;
			theGame[0].traderItemQuantityGiven = numItems;
			break;
		case 3:
			theGame[0].traderItemGiven = "Wagon Wheels";
			var numItems = Math.floor(Math.random() * 3) + 1;
			theGame[0].traderItemQuantityGiven = numItems;
			break;
		case 4:
			theGame[0].traderItemGiven = "Wagon Axles";
			var numItems = Math.floor(Math.random() * 3) + 1;
			theGame[0].traderItemQuantityGiven = numItems;
			break;
		case 5:
			theGame[0].traderItemGiven = "Wagon Tongues";
			var numItems = Math.floor(Math.random() * 3) + 1;
			theGame[0].traderItemQuantityGiven = numItems;
			break;
		case 6:
			theGame[0].traderItemGiven = "Pounds of Food";
			var numItems = Math.floor(Math.random() * 200) + 1;
			theGame[0].traderItemQuantityGiven = numItems;
			break;

	}

}
function showTalk(){
document.getElementById(theGame[0].currMenu).style.display = "none";
document.getElementById("wrapper_peopleTalk").style.display = "block";

}
function hideTalk(){
document.getElementById("wrapper_peopleTalk").style.display = "none";
document.getElementById(theGame[0].currMenu).style.display = "block";
}
function showMap(){
	document.getElementById("wrapper_map").style.display = "block";
}

function hidemap(){
	document.getElementById("wrapper_map").style.display = "none";
}
function showScores(){

document.getElementById("wrapper_peopleTalk").style.display = "block";
document.getElementById("button_talkPrompt").style.height = 45+"vh";
document.getElementById("button_talkPrompt").innerHTML="<center><table style='font-size:1.5vw;'><tr><td>Satan: 1557 </td></tr>  <tr><td>Sean: 1237 </td></tr>  <tr><td>Christie: 1115 </td></tr>  <tr><td>Andrei: 1102 </td></tr>  <tr><td>Malik: 1008 </td></tr> <tr><td>Adnan: 942 </td></tr> <tr><td>Jacob: 469</td> </tr> <tr><td>Jon: 201 </td></tr> <tr><td>James: 1237 </td></tr></table></center>";
}
function devConsole_Execute(input){ // show and/or hide an html element or run a function


	switch(input){
		case "Show1": //show inputted html element
			var TagToChange = document.getElementById("devConsoleInput").value;
			document.getElementById(TagToChange).style.display = "block";
			break;
		case "Hide1"://hide inputted html element
			var TagToChange = document.getElementById("devConsoleInput").value;
			document.getElementById(TagToChange).style.display = "none";
			break;
		case "executeFunction": //run inputted function
			eval(document.getElementById("devConsoleInput_2").value);
			break;
		case "fakeGame":
			theGame[0] = new Game("banker");
			theGame[0].currMile = 1;    //current mile
			theGame[0].pointsMulti = 1; //points multiplier
			theGame[0].money = 1600;
			theGame[0].type="Banker";
			theGame[0].month = 3;
			theGame[0].day = 1;
			theGame[0].oxen = 3;
			theGame[0].food = 2000;
			theGame[0].clothes = 200;
			theGame[0].ammo = 200;
			theGame[0].wheels = 200;
			theGame[0].axles = 200;
			theGame[0].tongues = 200;
			theGame[0].pace = "Steady";
			theGame[0].ration = "filling";
			theGame[0].health = 100;
			theGame[0].location ="Independence, Missouri";
			theGame[0].storeType ="Town";
			theGame[0].traderItemWanted = "";
			theGame[0].traderItemQuantityWanted = 0;
			theGame[0].traderItemGiven ="";
			theGame[0].traderItemQuantityGiven = 0;
			theGame[0].traderPresent = true; //variable to determine whether the player has traded once for that day or not
			theGame[0].game_family[0] = new Person("Satan");
			theGame[0].game_family[1] = new Person("Sean");
			theGame[0].game_family[2] = new Person("Andrei");
			theGame[0].game_family[3] = new Person("Christy");
			theGame[0].game_family[4] = new Person("Malik");
			setRandomTradeValues();
			break;
	}
}

function getDate(intMonth){

	monthsToAdd = Math.floor(theGame[0].day /32); //based on the number of days that have passed, calc the addition months that have passed by diving days by 31
	intMonth =  Math.floor(theGame[0].month + monthsToAdd); //add the additional number of motnsh to the starting month.
	actualDay = theGame[0].day % 32;
	if (actualDay == 0) actualDay = 1;
	//console.log("Months to add: "+monthsToAdd);
	//console.log("Month after addition: "+intMonth);
	switch (intMonth){
		case 1:
			return "January "+ actualDay + ", " + theGame[0].year;
			break;
		case 2:
			return "February "+ actualDay + ", " + theGame[0].year;
			break;
		case 3:
			return "March "+ actualDay + ", " + theGame[0].year;
			break;
		case 4:
			return "April "+ actualDay + ", " + theGame[0].year;
			break;
		case 5:
			return "May "+ actualDay + ", " + theGame[0].year;
			break;
		case 6:
			return "June "+ actualDay + ", " + theGame[0].year;
			break;
		case 7:
			return "July "+ actualDay + ", " + theGame[0].year;
			break;
		case 8:
			return "August "+ actualDay + ", " + theGame[0].year;
			break;
		case 9:
			return "September "+ actualDay + ", " + theGame[0].year;
			break;
		case 10:
			return "October "+ actualDay + ", " + theGame[0].year;
			break;
		case 11:
			return "November "+ actualDay  + ", " + theGame[0].year;
			break;
		case 12:
			return "December "+ actualDay + ", " + theGame[0].year;
			break;
	}

	return "Invalid month number";
}

function getRationStatus(){ //recommended food is 200lb per person

	switch (theGame[0].ration){
		case "filling":
			return "<font color='green'> Filling </font>";
		case "meager":
			return "<font color='orange'>Meager</font>";
		case "bare":
			return "<font color='purple'>Bare</font>";
	}

}

function loseItem(){
	var itemNum = Math.floor((Math.random() * 14)+1);
	var itemLost = 0;
	switch(itemNum){
		case 1:
		case 8:
		itemLost = Math.floor(Math.random() * ( ( Number(theGame[0].oxen -1 )) - 1 + 1)) + 1;
		theGame[0].oxen -= itemLost;
		window.alert("You have lost " + itemLost + " oxen.");
		break;
		case 2:
		case 9:
		itemLost = Math.floor(Math.random() * ( ( Number(theGame[0].clothes -1 )) - 1 + 1)) + 1;
		theGame[0].clothes -= itemLost;
		window.alert("You have lost " + itemLost + " clothes.");
		break;
		case 3:
		case 10:
		itemLost = Math.floor(Math.random() * ( ( Number(theGame[0].ammo -1 )) - 1 + 1)) + 1;
		theGame[0].ammo -= itemLost;
		window.alert("You have lost " + itemLost + " bullets.");
		break;
		case 4:
		case 11:
		itemLost = Math.floor(Math.random() * ( ( Number(theGame[0].wheels -1 )) - 1 + 1)) + 1;
		theGame[0].wheels -= itemLost;
		window.alert("You have lost " + itemLost + " wheels.");
		break;
		case 5:
		case 12:
		itemLost = Math.floor(Math.random() * ( ( Number(theGame[0].axles -1 )) - 1 + 1)) + 1;
		theGame[0].axles -= itemLost;
		window.alert("You have lost " + itemLost + " axles.");
		break;
		case 6:
		case 13:
		itemLost = Math.floor(Math.random() * ( ( Number(theGame[0].tongues -1 )) - 1 + 1)) + 1;
		theGame[0].tongues -= itemLost;
		window.alert("You have lost " + itemLost + " tongues.");
		break;
		case 7:
		case 14:
		itemLost = Math.floor((Math.random() * Number(theGame[0].food))+1);
		theGame[0].food -= itemLost;
		window.alert("You have lost " + itemLost + " pounds of food.");
		break;
	}
}

function killPersonRandom(){
	var who = Math.floor((Math.random()*4)+0);
	if(Number(theGame[0].game_family[who].health) != 0){
		theGame[0].game_family[who].health = 0;
		saveTombstone( getDate(theGame[0].month),theGame[0].game_family[who],theGame[0].totalMiles,"Here lies idiot.");
		window.alert(theGame[0].game_family[who].p_name + " has died.");
	}else{
		killPerson();
	}
}

function checkHealth(member){
	return theGame[0].game_family[member].health;
}

function randomEventGenerator(){
	var eventHappen = Math.floor(Math.random()*54)-1;
	switch (eventHappen){
		case 1:
		case 2:
			break;
		case 3:
			wagonWheelBreak();
			break;
		case 4:
		case 5:
			break;
		case 6:
			wagonTongueBreak();
			break;
		case 7:
		case 8:
			break;
		case 9:
			wagonAxleBreak();
			break;
		case 10:
		case 11:
			break;
		case 12:
			tookWrongTrail();
			break;
		case 13:
		case 14:
		case 15:
			findItems();
			break;
		case 16:
		case 17:
		case 18:
			findBarries();
			break;
		case 19:
		case 20:
			break;
		case 21:
			lostTrail();
			break;
		case 22:
		case 23:
			break;
		case 24:
			lostFood();
			break;
		case 25:
		case 26:
			break;
		case 27:
			noGrass();
			break;
		case 28:
		case 29:
			break;
		case 30:
			oxWonder();
			break;
		case 31:
		case 32:
			break;
		case 33:
			oxDied();
			break;
		case 34:
			break;
		case 35:
		case 36:
			thiefStole();
			break;
		case 37:
		case 38:
			break;
		case 39:
			wagonFire();
			break;
		case 40:
		case 41:
			break;
		case 42:
			p_gotLost();
			break;
		case 43:
		case 44:
			break;
		case 45:
			snakeBite();
			break;
		case 46:
		case 47:
			break;
		case 48:
			dysentery();
			break;
		case 49:
		case 50:
			break;
		case 51:
			cholera();
			break;
		case 52:
		case 53:
			break;
		case 54:
			exhaustion();
			break;
		case 55:
		case 56:
			break;
		case 57:
			fever();
			break;
	}
}
/***********************************huntING CODE**************************************/
function learnToHunt(){
		 if(theGame[0].huntedToday == false){
			document.getElementById("wrapper_townMenu").style.display="none";
			document.getElementById("wrapper_travel_pause_menu").style.display="none";
			document.getElementById("wrapper_learnToHunt").style.display="block";
			document.getElementById("wrapper_huntingArea").style.display="block";
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/hunting_field2.jpg)';
		 }
		else{
		document.getElementById("button_talkPrompt").innerHTML= "You can't hunt anymore for today! Try again tommorow.";
	 	showTalk();
		//document.getElementById("wrapper_peopleTalk").style.display = "block";
		

	 }
}

var originalFood; // variable to store amt of food before hunting
function startHunting(){
	 	document.getElementById("wrapper_learnToHunt").style.display="none";
		document.getElementById("fps").style.display="block";
		var randomHunts = Math.floor((Math.random() * 3) + 1);
		originalFood = theGame[0].food;
		createAnimals();
		goHunting(randomHunts);


	
}

function goHunting(numHunts){
	theGame[0].huntedToday = true;
	var shotsound = document.getElementById("audio_shotSound");
	if (numHunts > 0) {
		// restores health of each animal
		resetAnimals();

		// when space bar is pressed
		document.body.onkeydown = function(e){
			if(e.keyCode == 32){
				shotsound.play();
				if(theGame[0].ammo > 0) {
					theGame[0].ammo--;
					if(animal.style.top >= "245px" && animal.style.top <= "268px") {
						//if(animal.style.left >= "423px" && animal.style.left <= "453px") {
						if(animal.style.left >= animals[randomAnimal].lrange && animal.style.left <= animals[randomAnimal].rrange) {
							animals[randomAnimal].health--;
							if(animals[randomAnimal].health == 0){
								numHunts--;
								animal.style.display="none";
								theGame[0].food += animals[randomAnimal].pounds;
								clearInterval(id);
								goHunting(numHunts);
							}
							else{
							//alert("Great shot! Not quite enough though.");
							}
						}
						else {
							//alert("Missed shot! Deer at pos left: " + animal.style.left + " and top: " + animal.style.top);
						}
					}
					//alert("Ammo left: " + theGame[0].ammo + ", pounds of food: " + theGame[0].food);
				}
				else {
					alert("No more bullets left!");
				}
			}
		}

		var randomAnimal = Math.floor(Math.random() * (3 - 0 + 1));
		var randomPixel = Math.floor(Math.random() * (800 - 0 + 1));
		var randomSpeed = Math.floor(Math.random() * (15 - 7 + 1));
		// console.log("random speed is " + randomSpeed);
		// console.log("random animal num is " + randomAnimal);
		// console.log("Random animal is " + animals[randomAnimal].type);
		// console.log("Random animal health is " + animals[randomAnimal].health);
		// console.log("Random pixel num is " + randomPixel);

		// display random animal
		var animal = document.getElementById("hunt_animal");
		animal.style.display="block";
		animal.style.backgroundImage='url(Images/'+animals[randomAnimal].right_picture+')';
		animal.style.width=animals[randomAnimal].width;
		animal.style.height=animals[randomAnimal].height;
		animal.style.top='250px';
		var pos = 0;
		var id = setInterval(frame, randomSpeed);

		// random animal moves across screen until random position
		function frame() {
			if (pos == randomPixel) {
				numHunts--;
				clearInterval(id);
				animal.style.display="none";
				goHunting(numHunts);
			} else {
				pos++;
				//animal.style.top = pos + 'px';
				animal.style.left = pos + 'px';
			}
		}
	}
	else {
		// alert("Times up");
		huntingResults();
		return;
	}
}

function huntingResults(){
	theGame[0].currWrapper = "wrapper_huntingResults";
	theGame[0].currMenu = "wrapper_travel_pause_menu";
	document.body.onkeydown = null;
	document.getElementById("fps").style.display="none";
	document.getElementById("hunt_animal").style.display="none";
	var results = document.getElementById("wrapper_huntingResults");
	var foodWon = Number(theGame[0].food) - Number(originalFood);
	results.style.display="block";

	// create button to display results
	document.getElementById("button_talkPrompt").innerHTML= "Sorry! Looks like that's all the animals that are out today.<br><h3>Hunting Results</h3>Pounds of food: " + Number(foodWon) + "<br>Ammo left: " + Number(theGame[0].ammo);
	showTalk();

}

function winGame(name, score){
	$.ajax({ url: "proj2.php",
		method: "POST",
		data: {'username': name, 'score': score},
		//dataType: 'text',
		success: function(data){
			console.log(data);
		},
		error: function(request, status, error){
			console.log(error);
		}
});
}

function saveDeath(time, message, mile){
	$.ajax({ url: "proj2.php",
		method: "POST",
		data: {'time': time, 'message': message, 'mile': mile},
		//dataType: 'text',
		success: function(data){
			console.log(data);
		},
		error: function(request, status, error){
			console.log(error);
		}
});
}

function saveTombstone(dod, name, mile, message){
	$.ajax({ url: "proj2.php",
		method: "POST",
		data: {'dod': dod, 'name': name, 'mile': mile, 'message': message},
		//dataType: 'text',
		success: function(data){
			console.log(data);
		},
		error: function(request, status, error){
			console.log(error);
		}
});
}
var myGamePiece;
var myLogs = [];
var myRocks = [];
var myFlags = [];
var myDock = [];

function startRaft() {
    myGamePiece = new component(20, 20, "Images/raft.jpeg", 10, 120, "image");
	myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
	stop : function(){
		clearInterval(this.interval);
	}
}

function everyinterval(n){
	if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
	return false;
}

function component(width, height, color, x, y, type) {
	this.type = type;
	if (type == "image"){
		this.image = new Image();
		this.image.src = color;
	}
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
		if (type == "image"){
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		} else {
		  ctx.fillStyle = color;
		  ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
	this.crashWith = function(otherobj) {

	var myleft = this.x;
	var myright = this.x + (this.width);
	var mytop = this.y;
	var mybottom = this.y + (this.height);
	var otherleft = otherobj.x;
	var otherright = otherobj.x + (otherobj.width);
	var othertop = otherobj.y;
	var otherbottom = otherobj.y + (otherobj.height);
	var crash = true;
	if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
		crash = false;
		}
	return crash;
	}
}
var health = 0;
function updateGameArea() {
	var x, height, gap, minHeight, maxHeight, minGap, maxGap;
	if (myGameArea.frameNo > 4500){
			alert("Ya Dingus!!!! You've missed the docks! Looks like youre taking the long way home.....DOWN THE WATERFALL.... -_-");
			myGameArea.stop();
			document.getElementsByTagName("body")[0].style.background = "#890808";
			document.getElementById("GameBox").style.backgroundImage = 'url(Images/BlackScreen.png)';
			document.getElementById("div_Menu").style.display ="none";
			setTimeout(function() {
    		// rest of code here
    		var score = (theGame[0].food +theGame[0].money + theGame[0].oxen+ theGame[0].wheels + theGame[0].axles +theGame[0].tongues+ theGame[0].clothes) * theGame[0].pointsMulti;

			saveDeath(theGame[0].game_family[0].p_name,score);
    			window.alert( "Your Family has all died, how careless of you. You are trash. I'm going to just refresh the page for you, you useless idiot....");
				location.reload();
			}, 300);

		}
	for (i = 0; i < myLogs.length; i+= 1){
		if (myGamePiece.crashWith(myLogs[i])){
			alert("You hit something m8, get rekt skrub");
			myGamePiece.x += 34;
			health += 50;
			if (health >=100){
				document.getElementsByTagName("body")[0].style.background = "#890808";
				document.getElementById("GameBox").style.backgroundImage = 'url(Images/BlackScreen.png)';
				document.getElementById("div_Menu").style.display ="none";
				setTimeout(function() {
    			// rest of code here
    			var score = (theGame[0].food +theGame[0].money + theGame[0].oxen+ theGame[0].wheels + theGame[0].axles +theGame[0].tongues+ theGame[0].clothes) * theGame[0].pointsMulti;

			saveDeath(theGame[0].game_family[0].p_name,score);
    				window.alert( "Your Family has all died, how careless of you. You are trash. I'm going to just refresh the page for you, you useless idiot....");
					location.reload();
				}, 300);

			}
		}
	}
	for (i = 0; i < myRocks.length; i+= 1){
		if (myGamePiece.crashWith(myRocks[i])){
			alert("You hit something m8, get rekt skrub");
			health += 50;
			myGamePiece.x += 34;
			if (health >=100){

				document.getElementsByTagName("body")[0].style.background = "#890808";
				document.getElementById("GameBox").style.backgroundImage = 'url(Images/BlackScreen.png)';
				document.getElementById("div_Menu").style.display ="none";
				setTimeout(function() {
    			// rest of code here
    			var score = (theGame[0].food +theGame[0].money + theGame[0].oxen+ theGame[0].wheels + theGame[0].axles +theGame[0].tongues+ theGame[0].clothes) * theGame[0].pointsMulti;

			saveDeath(theGame[0].game_family[0].p_name,score);
    				window.alert( "Your Family has all died, how careless of you. You are trash. I'm going to just refresh the page for you, you useless idiot....");
					location.reload();
				}, 300);
				
			}
		}
	}
	for (i = 0; i < myDock.length; i+= 1){
		if (myGamePiece.crashWith(myDock[i])){
			alert("You've made it to the dock ");
			myGameArea.stop();
			winGame();
			}
	}
	myGameArea.clear();
	myGameArea.frameNo += 1;
	if ((myGameArea.frameNo <= 950 && everyinterval(150)) || (myGameArea.frameNo >= 2000 && everyinterval(150))) {
		x = myGameArea.canvas.width;
		minHeight = 20;
		maxHeight = 200;
		height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
		minGap = 60;
		maxGap = 200;
		gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
		myLogs.push(new component(10, height, "Images/log.png", x, 0, "image"));
		myLogs.push(new component(10, x - height - gap, "Images/log.png", x, height + gap, "image"));
	}
	if (myGameArea.frameNo >= 1000 && everyinterval(50)){
		x = myGameArea.canvas.width;
		rockPlacement = Math.floor(Math.random()*200 + 50);
		myRocks.push(new component(10, 10, "Images/rock.png", x, rockPlacement, "image" ));
		rockPlacement = Math.floor(Math.random()*200 + 50);
		myRocks.push(new component(10, 10, "Images/rock.png", x, rockPlacement, "image" ));


	}
	if (everyinterval(1010)){
		x = myGameArea.canvas.width;
		myFlags.push(new component(40, 40, "Images/flag.png", x, 230, "image"));
	}
	if (myGameArea.frameNo == 3010){
		x = myGameArea.canvas.width;
		myDock.push(new component(140 , 100, "Images/dock.png" , x , 0, "image"));
	}
	for (i = 0; i < myDock.length; i+= 1){
		myDock[i].x += -1;
		myDock[i].update();
	}
	for (i = 0; i < myFlags.length; i+= 1){
		myFlags[i].x += -1;
		myFlags[i].update();
	}
	for (i = 0; i < myLogs.length; i+= 1){
		myLogs[i].x += -1;
		myLogs[i].update();
	}
	for (i = 0; i < myRocks.length; i+= 1){
		myRocks[i].x += -1;
		myRocks[i].update();
	}
	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0;
	if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; }
	if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; }
	if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; }
	if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; }
	myGamePiece.newPos();
	myGamePiece.update();

}

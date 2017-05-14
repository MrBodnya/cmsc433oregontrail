

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
		window.alert("Congratulations, you bought" + Number(numOfClothes).clothes+" Clothes!");
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
	// Just add a span that shows the town, like a picture of it
	document.getElementById("wrapper_MattsShop").style.display = "none";
	document.getElementById("wrapper_goToTown").style.display = "block";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/IndependenceTown.png)';
	document.getElementById("button_startTown").innerHTML = getDate(theGame[0].month) + "</br> Enter The Town";
	theGame[0].storeType = "Town";
	setRandomTradeValues();

}

function goTown1(){
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
	document.getElementById("location_town").innerHTML = "<u>"+theGame[0].location+"</u>";
	document.getElementById("health_town").innerHTML ="<u>Average Health:</u> "+ calcAverageHealth();
	document.getElementById("pace_town").innerHTML = "<u>Pace:</u> "+theGame[0].pace;
	document.getElementById("rations_town").innerHTML = "<u>Rations:</u> " + getRationStatus();

	//console.log("shop bill is "+mattsbill);
	mattsbill = 0; //resetting the bill counter for the shop, so that it starts at 0 again when you go to the store
	 //set store type variable so correct store & pricing is set
}

function supplyCheck(){
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

	document.getElementById("family1_status").innerHTML = "<u>" + theGame[0].game_family[0].p_name + "'s health:</u> " + theGame[0].game_family[0].health;
	document.getElementById("family2_status").innerHTML = "<u>" +  theGame[0].game_family[1].p_name + "'s health:</u> " + theGame[0].game_family[1].health;
	document.getElementById("family3_status").innerHTML = "<u>" + theGame[0].game_family[2].p_name + "'s health:</u> " + theGame[0].game_family[2].health;
	document.getElementById("family4_status").innerHTML = "<u>" + theGame[0].game_family[3].p_name + "'s health:</u> " + theGame[0].game_family[3].health;
	document.getElementById("family5_status").innerHTML = "<u>" + theGame[0].game_family[4].p_name + "'s health:</u> " + theGame[0].game_family[4].health;
}

function choosePace(pace){
	document.getElementById("wrapper_changepace").style.display="block";
	document.getElementById("wrapper_townMenu").style.display="none";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/IndependenceTown2.jpg)';

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
	document.getElementById("wrapper_changefoodrat").style.display="block";
	document.getElementById("wrapper_townMenu").style.display="none";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/IndependenceTown2.jpg)';

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
	document.getElementById("wrapper_townMenu").style.display="none";
	document.getElementById("wrapper_stoprest").style.display="block";
	document.getElementById("GameBox").style.backgroundImage = 'url(Images/BlackScreen.png)';
}

function rest(){
	var days = document.getElementById("input_restDays").value;
	window.alert("You Have Rested for "+days+" days.");
	theGame[0].day +=Number(days);
	
	if (days > 0){
		//ADD LOGIC FOR FOOD/HEALTH SUBTRACTION HERE	
		setRandomTradeValues(); //reset random trader after a day has passed
		theGame[0].traderPresent = true; //reset trader present so that the player can trade

		var peopleEating = 0; //the below loop will calc total amount of food eaten
		var healthReduxMultiplier = theGame[0].healthReductionMultiplier; //variable to hold health reduction multiplier

		if (theGame[0].storeType=="Town"){healthReduxMultiplier = 1;} //regardless of current pace, if player is in town, health reduction is set to 1
		console.log(days+" days have passed, the player is in "+theGame[0].storeType+" so health reduction multiplier is set from "+theGame[0].healthReductionMultiplier+" to "+healthReduxMultiplier);
		for (i = 0; i < theGame[0].game_family.length; i++){	
			if (theGame[0].game_family[i].health > 0){ //only people who have more than 0 health may eat
				theGame[0].game_family[i].health -= (5 * healthReduxMultiplier)*days; //a persons health decreases by 5,10 or 15 points per day due to hunger
				console.log(theGame[0].game_family[i].p_name +" has lost "+(5 * healthReduxMultiplier)*days+" hp points, health is now: "+ theGame[0].game_family[i].health);
				theGame[0].game_family[i].health += (theGame[0].foodperPerson * 4)*days //a person gains 4 points of health per lb of food, they gain this health for each day that passes
				if (theGame[0].game_family[i].health > 100) {theGame[0].game_family[i].health = 100;} //if a persons health exceeds 100, change it back to 100.
				peopleEating += 1; //increase the number of people who have eaten food by 1
				console.log(theGame[0].game_family[i].p_name +"has eaten"+(theGame[0].foodperPerson*days)+" lbs of food. and gained "+(theGame[0].foodperPerson * 4)*days+" hp points, health is now: "+theGame[0].game_family[i].health);
			}
		}
		theGame[0].food -= (peopleEating * theGame[0].foodperPerson)*days; //reduce food stock by the number people eating * lb of food per person
	}
	
	goTown1();
}

function attemptTrade(){
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
		case "Wagon Tonges":
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
	}
	
}


/******************************************************************END TOWN MENU CODE ****************************************************************************************/



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

	//console.log("Average health is: "+(HealthTotal/5) );
	
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
	}
	return "Invalid health amount";

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
			theGame[0].oxen = 200;
			theGame[0].food = 2000;
			theGame[0].clothes = 200;
			theGame[0].ammo = 200;
			theGame[0].wheels = 200;
			theGame[0].axles = 200;
			theGame[0].tongues = 200;
			theGame[0].pace = "steady";
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
	console.log("Months to add: "+monthsToAdd);
	console.log("Month after addition: "+intMonth);
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


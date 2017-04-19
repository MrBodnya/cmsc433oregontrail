		
		
window.onload = function() { document.getElementById("audio_menuTheme").play();}

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
//Functionality for the Turn Off/On Menu Option.
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

function learnTheTrail(){
	var menuHTML = document.getElementById("div_Menu").innerHTML; 
	var currMenu = document.getElementById("div_Menu").innerHTML = ("<center>BSDFSDFSDFSDFSDFSDFDF <br><button><</center>");
	
}
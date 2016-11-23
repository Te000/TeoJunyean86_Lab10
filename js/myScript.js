document.addEventListener("DOMContentLoaded", function() {
	// Reset Button
	var resetButton = document.getElementById("resetButton");

	resetButton.addEventListener("click", function(e){
		e.preventDefault();

		document.getElementById("burger").value=0;
		document.getElementById("bread").value=0;
		document.getElementById("size").value=0;
		var toppings = document.getElementsByName("toppings");
		for (var i=0; i<toppings.length; i++) {
			toppings[i].checked = 0;
		}
		
		var sauces = document.getElementsByName("sauces");
		for (var i=0; i<sauces.length; i++) {
			sauces[i].checked = 0;
		}

		document.getElementById("validate").value = "";
		document.getElementById("orderSummary").innerHTML = "<p></p>";
	});

	var addToCart = document.getElementById("addToCart");

	addToCart.addEventListener("click", function(e){
		e.preventDefault();

	document.getElementById("orderSummary").innerHTML = "<H3>This is what you have ordered</H3>";	

		var burger = document.getElementById("burger");
		if(burger.value == 0) {
			orderSummary.innerHTML += "<p class=\"error\">Please select a burger</p>";
		}
		else {
			orderSummary.innerHTML += "<p class=\"order\">Burger selected: " + document.getElementById("burger").value; + ".</p>";
		}

		var burger = document.getElementById("bread");
		if(bread.value == 0) {
			orderSummary.innerHTML += "<p class=\"error\">Please select a bread</p>";
		}
		else {
			orderSummary.innerHTML += "<p class=\"order\">Bread selected: " + document.getElementById("bread").value; + ".</p>";
		}

		var size = document.getElementById("size");
		if(size.value == 0) {
			orderSummary.innerHTML += "<p class=\"error\">Please select a size</p>";
		}
		else {
			orderSummary.innerHTML += "<p class=\"order\">Size selected: " + document.getElementById("size").value; + ".</p>";
		}

		var ketchup = document.getElementById("yesToKetchup")
		if(yesToKetchup.checked == true) {
			orderSummary.innerHTML += "<p class=\"order\">Ketchup: Yes</p>";
		}
		else {
			orderSummary.innerHTML += "<p class=\"order\">Ketchup: No </p>";
		}

		var mayo= document.getElementById("yesToMayo")
		if(yesToMayo.checked == true) {
			orderSummary.innerHTML += "<p class=\"order\">Mayo: Yes</p>";
		}
		else {
			orderSummary.innerHTML += "<p class=\"order\">Mayo: No </p>";
		}

		var mustard = document.getElementById("yesToMustard")
		if(yesToMustard.checked == true) {
			orderSummary.innerHTML += "<p class=\"order\">Mustard: Yes</p>";
		}
		else {
			orderSummary.innerHTML += "<p class=\"order\">Mustard: No </p>";
		}

		var toppings = document.getElementsByName("toppings");
			orderSummary.innerHTML += "<p class=\"order\">Toppings</p> ";
		for (var i=0; i<toppings.length; i++) {
			if(toppings[i].checked == true) {
				orderSummary.innerHTML += toppings[i].value + ", ";

			}
		}

		orderSummary.innerHTML += "and that's all!";

		var sauces = document.getElementsByName("sauces");
			orderSummary.innerHTML += "<p class=\"order\">Sauces</p> ";
		for (var i=0; i<sauces.length; i++) {
			if(sauces[i].checked == true) {
				orderSummary.innerHTML += sauces[i].value + ", ";

			}
			
		}

		orderSummary.innerHTML += "and that's all!";

		var fries = document.getElementById("yesToFries")
		if(yesToFries.checked == true) {
			orderSummary.innerHTML += "<p class=\"order\">Fries: Yes</p>";
		}
		else {
			orderSummary.innerHTML += "<p class=\"order\">Fries: No </p>";
		}

		var validate = document.getElementById("validate").value;
		if (validate == isNaN(validate)) {
			orderSummary.innerHTML += "<p class=\"error\">Please type in a number.</p>";
		}
		else {
			orderSummary.innerHTML += "<p class=\"order\">You have ordered " + validate + " of these burgers.</p>";
		}


});
	
});
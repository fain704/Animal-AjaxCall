

//display button for each index of the array
$("document").ready(function(event){
	var animalNames = ["Cat",
					"Dog",
					"Elephant", 
					"Donkey", 
					"Snake", 
					"Turkey", 
					"Fish", 
					"Griffin",
					"Unicorn",
					"Shark",
					"Alien" ];
	var animalSelect;

	function fillButtons(){

		$("#animal-buttons").empty();

		for (let i = 0; i < animalNames.length; i++) {
			let a = $('<button>');
			a.attr("id",animalNames[i]);
			a.text(animalNames[i]);
			a.addClass("btnAnimal btn-secondary btn-space");
			$("#animal-buttons").append(a);
			a.on("click", function(){
				animalSelect = $(this).text();
				console.log(this);
				ajaxCall();
			});	
		}
	};

	function addForm(){
		let form = $("<form>");
		let inputText = $("<input>");
		inputText.attr("type", "text");
		inputText.attr("name", "animalName");
		inputText.attr("id", "animalValue")

		let inputBtn =$("<button>");
		inputBtn.attr("type","button");
		inputBtn.attr("id","submit");
		inputBtn.addClass("btn-space btn-primary");
		inputBtn.text("Submit");

		form.append(inputText);
		form.append(inputBtn);

		$('#animal-form').append(form);
	};

	function ajaxCall(){

		$("#giphy-display").empty();

		let url = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + animalSelect;

		$.ajax({
	      url: url,
	      method: 'GET'
	    }).done(function(response) {
	    	response = response.data;
	    	

	    	for (let i = 0; i < response.length; i++) {

	    		let rating = $("<p>");

	    		rating.text("Rating: "+response[i].rating);

	    		let gif = $("<img>");

	    		gif.addClass("img-fluid imgClass");

	    		gif.attr("src", response[i].images.fixed_height_still.url);

	    		gif.attr("data-still", response[i].images.fixed_height_still.url);

	    		gif.attr("data-animate", response[i].images.fixed_height.url);

	    		gif.attr("data-state", "still");

	    		gif.addClass("gif");

	    		let div = $("<div>");

	    		div.addClass("gifdiv")

	    		div.append(rating, gif);

	    		$("#giphy-display").append(div);
	    	}

	    	$(".gif").on("click", function() {
				// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
				var state = $(this).attr("data-state");
				// If the clicked image's state is still, update its src attribute to what its data-animate value is.
				// Then, set the image's data-state to animate
				// Else set src to the data-still value
				if (state === "still") {
				$(this).attr("src", $(this).attr("data-animate"));
				$(this).attr("data-state", "animate");
				} else {
				$(this).attr("src", $(this).attr("data-still"));
				$(this).attr("data-state", "still");
		      	}
	    	});

	    	
	    });
	};


	fillButtons();
	addForm();

	

	$("#submit").on("click",function(event){
		let newAnimal = $("#animalValue").val().trim();
		$("#animalValue").val("");
		animalNames.push(newAnimal);
		fillButtons();
	});
});



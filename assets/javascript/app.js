

//\\//\\ CREATE VARIABLES //\\//\\//\\

var recipeChosen;
var recipeName;
var recipeImage;
var recipeIngredients;
var recipeNutritionals;

var recipeOne;
var recipeTwo;
var recipeThree;

var apiKey = "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16";

//\\//\\//\\ CREATE FUNCTIONS \\//\\//\\//

//First create an onclick listener to listen which button value is selected on first page
$("#recipe-container").hide();
$(".calorie-button").on("click", function(){

    console.log("You clicked a button");
    console.log($('#button-1').val());

    var calories = $('#button-1').val();

    console.log("The calories you've chosen to search are: " + calories);

    $.ajax({
      url:
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?targetCalories=" + calories + "&timeFrame=day",
      type: "GET",
      headers: {
        "X-RapidAPI-Key":
          "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    }).then(function(response) {
      console.log(response);

      var meal = response.meals
      recipeOne = meal[0].id;
      recipeOneName = meal[0].title;
      recipeOneImage = "https://webknox.com/recipeImages/" + meal[0].image;

      console.log(recipeOneImage);

      recipeTwo = meal[1].id;
      recipeTwoName = meal[1].title;
      recipeTwoImage = "https://webknox.com/recipeImages/" + meal[1].image;

      recipeThree = meal[2].id;
      recipeThreeName = meal[2].title;
      recipeThreeImage = "https://webknox.com/recipeImages/" + meal[2].image;

      console.log(recipeOne);

      postRecipeFunction1();
      postRecipeFunction2();
      postRecipeFunction3();
    });


   });  //closing click

   function postRecipeFunction1(){


    var titleDiv1 = $("<h4>");
    $(titleDiv1).text(recipeOneName);
    console.log(titleDiv1);
    $("#recipe-container1").append(titleDiv1);

    var imageDiv1 = $("<img>")
    $(imageDiv1).attr("src", recipeOneImage);
    $("#recipe-container1").append(imageDiv1);


    $.ajax({
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeOne+ "/ingredientWidget.json",
      type: "GET",
      headers: {
        "X-RapidAPI-Key":
          "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    }).then(function(resp1){

      console.log(resp1);
      $("#recipe-container1").show();
      // $("#recipe-container").html(resp1);
      
      console.log(resp1.ingredients)
      var ingredients = resp1.ingredients;

      for (i = 0; i < ingredients.length; i++) {
        // $("#recipe-container").text(ingredients[i].name);
        console.log(i);
        var newDiv = $("<div>");
        // $(newDiv).text(ingredients[i].name);

        var name = ingredients[i].name;
        var value = ingredients[i].amount.us.value.toFixed(2);
        var unit = ingredients[i].amount.us.unit;

        $(newDiv).html("<hr>" + value + " " +  unit + " " + name);

        // $(newDiv).addClass("col-4");

        $("#recipe-container1").append(newDiv);

        
      }
      

    })
  }


  function postRecipeFunction2(){

    var titleDiv2 = $("<h4>");
    $(titleDiv2).text(recipeTwoName);
    console.log(titleDiv2);
    $("#recipe-container2").append(titleDiv2);


    
    var imageDiv2 = $("<img>")
    $(imageDiv2).attr("src", recipeTwoImage);
    $("#recipe-container2").append(imageDiv2)

    $.ajax({
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeTwo+ "/ingredientWidget.json",
      type: "GET",
      headers: {
        "X-RapidAPI-Key":
          "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    }).then(function(resp2){

      console.log(resp2);
      $("#recipe-container2").show();
      // $("#recipe-container").html(resp1);
      
      console.log(resp2.ingredients)
      var ingredients = resp2.ingredients;

      for (i = 0; i < ingredients.length; i++) {
        // $("#recipe-container").text(ingredients[i].name);
        console.log(i);
        var newDiv = $("<div>");
        // $(newDiv).text(ingredients[i].name);

        var name = ingredients[i].name;
        var value = ingredients[i].amount.us.value.toFixed(2);
        var unit = ingredients[i].amount.us.unit;

        $(newDiv).html("<hr>" + value + " " +  unit + " " + name);

        // $(newDiv).addClass("col-4");

        $("#recipe-container2").append(newDiv);

        
      }
      

    })
  }


  function postRecipeFunction3(){

    
    var titleDiv3 = $("<h4>");
    $(titleDiv3).text(recipeThreeName);
    console.log(titleDiv3);
    $("#recipe-container3").append(titleDiv3);

    
    var imageDiv3 = $("<img>")
    $(imageDiv3).attr("src", recipeThreeImage);
    $("#recipe-container3").append(imageDiv3)


    $.ajax({
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeThree+ "/ingredientWidget.json",
      type: "GET",
      headers: {
        "X-RapidAPI-Key":
          "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    }).then(function(resp3){

      console.log(resp3);
      $("#recipe-container3").show();
      // $("#recipe-container").html(resp1);
      
      console.log(resp3.ingredients)
      var ingredients = resp3.ingredients;

      for (i = 0; i < ingredients.length; i++) {
        // $("#recipe-container").text(ingredients[i].name);
        console.log(i);
        var newDiv = $("<div>");
        // $(newDiv).text(ingredients[i].name);

        var name = ingredients[i].name;
        var value = ingredients[i].amount.us.value.toFixed(2);
        var unit = ingredients[i].amount.us.unit;

        $(newDiv).html("<hr>" + value + " " +  unit + " " + name);

        // $(newDiv).addClass("col-4");

        $("#recipe-container3").append(newDiv);

        
      }
      

    })
  }
//This will assign the value of that button to a variable


//This variable will be used in our AJAX call queryURL to pull the recipe

//Then we will go into the JSON object and grab the data we want #1:ingredients #2: nutritionals

//Assign these objects to a variable

//Create a new Div 

//Put the content of the JSON object variables into that Div

//Append that Div to the "recipes-chosen" container


///\\\///\\\///\ CALL FUNCTIONS \\\///\\\////\\\\///
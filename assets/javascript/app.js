

//\\//\\ CREATE VARIABLES //\\//\\//\\

var recipeChosen;
var recipeName;
var recipeImage;
var recipeIngredients;
var recipeNutritionals;

var recipeOne;
var recipeTwo;
var recipeThree;

var carlories;

// var nutritionGot1 = false;

/////////////////////////// API KEYS /////////////////////////////
var apiKey = "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16";
//////////////////////////////////////////////////////////////////

/////////////////////Initialized Functions////////////////////////
$("#recipe-container1").hide();
$("#recipe-container2").hide();
$("#recipe-container3").hide();
//////////////////////////////////////////////////////////////////


/////////////// FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
/////////////////////// rateYo Functions yo! /////////////////////////
////////////////// function for user stars rating/////////////////////
//////////////////////////////////////////////////////////////////////

$("#rateYo").rateYo({ 
  spacing: "10px", 
  starWidth: "25px",
  numStars: 5, 
  minValue: 0, 
  maxValue: 5, 
  normalFill: 'black', 
  ratedFill: 'yellow', 

})

$("#rateYo").on("click", function () {
  swal("Thanks for your review! We appreciate your feedback.");
})

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\


/////////////////////////////////////////////////////////////////////
///////////////// Text Input Ajax Call //////////////////////////////
/////////////////////////////////////////////////////////////////////

$("#submit-calorie").on("click", function(event) {
  event.preventDefault();
  // Get the input values
  var customCalories = $("#custom-calorie-count").val().trim();
  
  // Parses out the integer from the string gathered from val above, for our conditional below
  var calorieParsed = parseInt(customCalories);
  
  // Our conditional to determine if the user text input was a number between 0 and 3000
  if ((calorieParsed >= 0) && (calorieParsed <= 3000))
    {
      $.ajax({
    url:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?targetCalories=" + customCalories + "&timeFrame=day",
    type: "GET",
    headers: {
      "X-RapidAPI-Key":
        "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16",
      "X-RapidAPI-Host":
        "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    }
  }).then(function(response) {
    //We extract the meal key from the JSON and use that to get the id value which will be used to run our subsequent Ajax
    var meal = response.meals
    recipeOne = meal[0].id;
    //This will grab the title which we will append to the container in the next function
    recipeOneName = meal[0].title;
    //This will grab the image which we will append to the container in the next function 
    recipeOneImage = "https://webknox.com/recipeImages/" + meal[0].image;

    //We will repeat the above process for Recipe number Two
    recipeTwo = meal[1].id;
    recipeTwoName = meal[1].title;
    recipeTwoImage = "https://webknox.com/recipeImages/" + meal[1].image;
    //And repeat one more time for Recipe number Three
    recipeThree = meal[2].id;
    recipeThreeName = meal[2].title;
    recipeThreeImage = "https://webknox.com/recipeImages/" + meal[2].image;

    
    //Call the functions to gather the data for each recipe based on multiple API's and put to the browser
    postRecipeFunction1();
    postRecipeFunction2();
    postRecipeFunction3();
  });

} else{
  alert("You didnt enter a number between 0 and 3000");
}

}); //END OF AJAX TEXT INPUT CUSTOM CALORIE FUNCTION


////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

////////////////////////////////////////////////////////////////////
//////////////////Button Selection Ajax Call ///////////////////////
////////////////////////////////////////////////////////////////////

$(".calorie-button").on("click", function () {

  chosenCalories = $(this).val();
  console.log("The calories you've chosen to search are: " + chosenCalories);



  $.ajax({
    url:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?targetCalories=" + chosenCalories + "&timeFrame=day",
    type: "GET",
    headers: {
      "X-RapidAPI-Key":
        "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16",
      "X-RapidAPI-Host":
        "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    }
  }).then(function (response) {
    console.log(response);

    var meal = response.meals
    recipeOne = meal[0].id;
    recipeOneName = meal[0].title;
    recipeOneImage = "https://webknox.com/recipeImages/" + meal[0].image;

    // console.log(recipeOneImage);

    recipeTwo = meal[1].id;
    recipeTwoName = meal[1].title;
    recipeTwoImage = "https://webknox.com/recipeImages/" + meal[1].image;

    recipeThree = meal[2].id;
    recipeThreeName = meal[2].title;
    recipeThreeImage = "https://webknox.com/recipeImages/" + meal[2].image;

    // console.log(recipeOne);

    postRecipeFunction1();
    postRecipeFunction2();
    postRecipeFunction3();
  });


});  //closing click

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\/\\//\\//\\//\\//\\//

/////////////////////////////////////////////////////////////////////
/////////// This function will post Data to recipe container 1 //////
/////////////////////////////////////////////////////////////////////

function postRecipeFunction1() {

  var headDiv1 = $("<div>");
  //Assigns image to the recipe-container1 html div
  var imageDiv1 = $("<img>")
  $(imageDiv1).attr("src", recipeOneImage);
  $(headDiv1).prepend(imageDiv1);
  //Assigns title to the recipe-container1 image div
  var titleDiv1 = $("<h4>");
  $(titleDiv1).text(recipeOneName);
  $(headDiv1).prepend(titleDiv1);

  $("#recipe-container1").prepend(headDiv1);


  //This will gather the ingredients for Recipe #1
  $.ajax({
    url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeOne + "/ingredientWidget.json",
    type: "GET",
    headers: {
      "X-RapidAPI-Key":
        "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16",
      "X-RapidAPI-Host":
        "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    }
  }).then(function (resp1a) {
    //This will reveal the container that was previously hidden
    $("#recipe-container1").show();
    //This will make it easy to gather the information for the ingredients
    var ingredients = resp1a.ingredients;

 
    //This is a for loop to post each ingredient into our div
    for (i = 0; i < ingredients.length; i++) {

      var newDiv = $("<div>");

      var name = ingredients[i].name;
      var value = ingredients[i].amount.us.value.toFixed(2);
      var unit = ingredients[i].amount.us.unit;

      $(newDiv).html("<hr>" + value + " " + unit + " " + name);

      $("#button-ingr1").on("click", function () {
        $("#button-ingr1").append(newDiv);
      })
      
    }
    //This runs the next part of our function to post the details of the recipe
    getNutrition1();

  })


  function getNutrition1() {

    //This Ajax call will gather the Nutrion facts for the recipe
    $.ajax({
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeOne + "/nutritionWidget.json",
      type: "GET",
      headers: {
        "X-RapidAPI-Key":
          "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    }).then(function (resp1b) {

      var nutrition1 = $("<div>");

      $(nutrition1).append("<br>" + "<br>" + "<h4>" + "Nutrition Facts" + "</h4>")
      $(nutrition1).append("<br>" + "Calories: " + resp1b.calories + "<br>");
      $(nutrition1).append("Carbs: " + resp1b.carbs + "<br>");
      $(nutrition1).append("Fat: " + resp1b.fat + "<br>");
      $(nutrition1).append("Protein: " + resp1b.protein + "<br>");

      //This will show the nutrition facts once the button is clicked
      $("#button-nutr1").on("click", function () {
        $("#button-nutr1").append(nutrition1);
      })
    })
    //This will run the final step in our function, gathering the recipe instructions
    getInstructions1();

  }

  function getInstructions1() {

    //This Ajax call will get our ingredients for the recipe
    $.ajax({
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeOne + "/analyzedInstructions?stepBreakdown=false",
      type: "GET",
      headers: {
        "X-RapidAPI-Key":
          "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    }).then(function(resp1c){

      recipeSteps = resp1c[0].steps;

      for (i = 0; i < recipeSteps.length; i++) {

        instructionsDiv1 = $("<li>").addClass("ui-menu-item").attr('role', 'menuitem');
        
        $(instructionsDiv1).append("<br>" + "<br>" + "Step Number" + [i+1] + ": " + recipeSteps[i].step);

        $("#button-instr1").on("click", function () {
        $("#button-instr1").append(instructionsDiv1);
        })

      }


    })

  }


}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

////////////////////////////////////////////////////////////////////////////////
///////////////////////////// Recipe Two Information ///////////////////////////
////////////////////////////////////////////////////////////////////////////////

function postRecipeFunction2() {

  var imageDiv2 = $("<img>")
  $(imageDiv2).attr("src", recipeTwoImage);
  $("#recipe-container2").prepend(imageDiv2)

  var titleDiv2 = $("<h4>");
  $(titleDiv2).text(recipeTwoName);
  $("#recipe-container2").prepend(titleDiv2);


  $.ajax({
    url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeTwo + "/ingredientWidget.json",
    type: "GET",
    headers: {
      "X-RapidAPI-Key":
        "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16",
      "X-RapidAPI-Host":
        "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    }
  }).then(function (resp2) {


    $("#recipe-container2").show();

    var ingredients = resp2.ingredients;

    for (i = 0; i < ingredients.length; i++) {

      var newDiv = $("<div>");

      var name = ingredients[i].name;
      var value = ingredients[i].amount.us.value.toFixed(2);
      var unit = ingredients[i].amount.us.unit;

      $(newDiv).html("<hr>" + value + " " + unit + " " + name);

      $("#button-ingr2").on("click", function () {
      $("#button-ingr2").append(newDiv);
    })
    }
    getNutrition2();
  })

  function getNutrition2() {

    $.ajax({
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeTwo + "/nutritionWidget.json",
      type: "GET",
      headers: {
        "X-RapidAPI-Key":
          "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    }).then(function (resp2b) {
      console.log(resp2b);

      var nutrition2 = $("<div>");

      $(nutrition2).append("<br>" + "<br>" + "<h4>" + "Nutrition Facts" + "</h4>")
      $(nutrition2).append("<br>" + "Calories: " + resp2b.calories + "<br>");
      $(nutrition2).append("Carbs: " + resp2b.carbs + "<br>");
      $(nutrition2).append("Fat: " + resp2b.fat + "<br>");
      $(nutrition2).append("Protein: " + resp2b.protein + "<br>");

      $("#button-nutr2").on("click", function () {
        $("#button-nutr2").append(nutrition2);
    })
    })
  getInstructions2();
  }

  function getInstructions2() {

    $.ajax({
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeTwo + "/analyzedInstructions?stepBreakdown=false",
      type: "GET",
      headers: {
        "X-RapidAPI-Key":
          "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    }).then(function(resp2c){

      recipeSteps = resp2c[0].steps;

      for (i = 0; i < recipeSteps.length; i++) {

        instructionsDiv2 = $("<li>").addClass("ui-menu-item").attr('role', 'menuitem');
        
        $(instructionsDiv2).append("<br>" + "<br>" + "Step Number" + [i+1] + ": " + recipeSteps[i].step);


        $("#button-instr2").on("click", function () {
          $("#button-instr2").append(instructionsDiv2);
          })

      }
    })
  }
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\/\

///////////////////////////////////////////////////////////////////////////////
///////////////////////////// Recipe 3 Information Gather//////////////////////
///////////////////////////////////////////////////////////////////////////////

function postRecipeFunction3() {

  var imageDiv3 = $("<img>")
  $(imageDiv3).attr("src", recipeThreeImage);
  $("#recipe-container3").prepend(imageDiv3)

  var titleDiv3 = $("<h4>");
  $(titleDiv3).text(recipeThreeName);
  $("#recipe-container3").prepend(titleDiv3);

 
  $.ajax({
    url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeThree + "/ingredientWidget.json",
    type: "GET",
    headers: {
      "X-RapidAPI-Key":
        "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16",
      "X-RapidAPI-Host":
        "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    }
  }).then(function (resp3) {

    $("#recipe-container3").show();
    var ingredients = resp3.ingredients;

    for (i = 0; i < ingredients.length; i++) {

      var newDiv = $("<div>");

      var name = ingredients[i].name;
      var value = ingredients[i].amount.us.value.toFixed(2);
      var unit = ingredients[i].amount.us.unit;

      $(newDiv).html("<hr>" + value + " " + unit + " " + name);

      $("#button-ingr3").on("click", function () {
      $("#button-ingr3").append(newDiv);
      })
    }
    getNutrition3();
  })

  function getNutrition3() {

    $.ajax({
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeThree + "/nutritionWidget.json",
      type: "GET",
      headers: {
        "X-RapidAPI-Key":
          "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    }).then(function (resp3b) {
      var nutrition3 = $("<div>");

      $(nutrition3).append("<br>" + "<br>" + "<h4>" + "Nutrition Facts" + "</h4>")
      $(nutrition3).append("<br>" + "Calories: " + resp3b.calories + "<br>");
      $(nutrition3).append("Carbs: " + resp3b.carbs + "<br>");
      $(nutrition3).append("Fat: " + resp3b.fat + "<br>");
      $(nutrition3).append("Protein: " + resp3b.protein + "<br>");

      $("#button-nutr3").on("click", function () {
        $("#button-nutr3").append(nutrition3);
      })
    })
  getInstructions3();
  }

  function getInstructions3() {

    $.ajax({
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeThree + "/analyzedInstructions?stepBreakdown=false",
      type: "GET",
      headers: {
        "X-RapidAPI-Key":
          "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    }).then(function(resp3c){

      recipeSteps = resp3c[0].steps;

      for (i = 0; i < recipeSteps.length; i++) {

        instructionsDiv3 = $("<li>").addClass("ui-menu-item").attr('role', 'menuitem');
        
        $(instructionsDiv3).append("<br>" + "<br>" + "Step Number" + [i+1] + ": " + recipeSteps[i].step);
        $("#button-instr3").on("click", function () {
          $("#button-instr3").append(instructionsDiv3);
        })
      }
    })
  }
}
//This will assign the value of that button to a variable


//This variable will be used in our AJAX call queryURL to pull the recipe

//Then we will go into the JSON object and grab the data we want #1:ingredients #2: nutritionals

//Assign these objects to a variable

//Create a new Div 

//Put the content of the JSON object variables into that Div

//Append that Div to the "recipes-chosen" container


///\\\///\\\///\ CALL FUNCTIONS \\\///\\\////\\\\///
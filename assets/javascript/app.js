

//\\//\\ CREATE VARIABLES //\\//\\//\\

var recipeChosen;
var recipeName;
var recipeImage;
var recipeIngredients;
var recipeNutritionals;

var recipeOne;
var recipeTwo;
var recipeThree;

// var nutritionGot1 = false;

var apiKey = "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16";

//\\//\\//\\ CREATE FUNCTIONS \\//\\//\\//

//rateYo Functions yo! //
// function for user stars rating 
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

//First create an onclick listener to listen which button value is selected on first page
$("#recipe-container1").hide();
$("#recipe-container2").hide();
$("#recipe-container3").hide();

$(".calorie-button").on("click", function () {

  var calories = $('.calorie-button').val();

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

function postRecipeFunction1() {


  var titleDiv1 = $("<h4>");
  $(titleDiv1).text(recipeOneName);
  // console.log(titleDiv1);
  $("#recipe-container1").append(titleDiv1);


  var imageDiv1 = $("<img>")
  $(imageDiv1).attr("src", recipeOneImage);
  $("#recipe-container1").append(imageDiv1);

  // var ingredientsDiv1 = $("<h6>");
  // $(ingredientsDiv1).text("Ingredients");
  // $("recipe-container1").append(ingredientsDiv1);

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

    // console.log(resp1a);
    $("#recipe-container1").show();
    // $("#recipe-container").html(resp1);

    // console.log(resp1a.ingredients)
    var ingredients = resp1a.ingredients;

    for (i = 0; i < ingredients.length; i++) {
      // $("#recipe-container").text(ingredients[i].name);
      // console.log(i);
      var newDiv = $("<div>");
      // $(newDiv).text(ingredients[i].name);

      var name = ingredients[i].name;
      var value = ingredients[i].amount.us.value.toFixed(2);
      var unit = ingredients[i].amount.us.unit;

      $(newDiv).html("<hr>" + value + " " + unit + " " + name);

      // $(newDiv).addClass("col-4");

      $("#recipe-container1").append(newDiv);

      
    }

    getNutrition1();

  })


  function getNutrition1() {

    // if(nutritionGot1 === false) {

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
      console.log(resp1b);
      var nutrition1 = $("<div>");
      $(nutrition1).append("<br>" + "<br>" + "<h4>" + "Nutrition Facts" + "</h4>")
      $(nutrition1).append("<br>" + "Calories: " + resp1b.calories + "<br>");
      $(nutrition1).append("Carbs: " + resp1b.carbs + "<br>");
      $(nutrition1).append("Fat: " + resp1b.fat + "<br>");
      $(nutrition1).append("Protein: " + resp1b.protein + "<br>");
      console.log(nutrition1);
      $("#recipe-container1").append(nutrition1);

      // nutritionGot1 = true;
    })

    getInstructions1();

  }

  function getInstructions1() {

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
      console.log(resp1c);

        // instrTitle1 = $("<div>")
        // $(instrTitle1).html("<h4>" + "Recipe Instructions" + "</h4>");
      recipeSteps = resp1c[0].steps;

      for (i = 0; i < recipeSteps.length; i++) {

        instructionsDiv1 = $("<li>").addClass("ui-menu-item").attr('role', 'menuitem');
        
        $(instructionsDiv1).append("<br>" + "<br>" + "Step Number" + [i+1] + ": " + recipeSteps[i].step);
        $("#recipe-container1").append(instructionsDiv1);

      }


    })

  }


}


function postRecipeFunction2() {

  var titleDiv2 = $("<h4>");
  $(titleDiv2).text(recipeTwoName);
  // console.log(titleDiv2);
  $("#recipe-container2").append(titleDiv2);



  var imageDiv2 = $("<img>")
  $(imageDiv2).attr("src", recipeTwoImage);
  $("#recipe-container2").append(imageDiv2)

  // var ingredientsDiv2 = $("<h6>");
  // $(ingredientsDiv2).text("Ingredients");
  // $("recipe-container2").append(ingredientsDiv2);

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

    // console.log(resp2);
    $("#recipe-container2").show();
    // $("#recipe-container").html(resp1);

    // console.log(resp2.ingredients)
    var ingredients = resp2.ingredients;

    for (i = 0; i < ingredients.length; i++) {
      // $("#recipe-container").text(ingredients[i].name);
      // console.log(i);
      var newDiv = $("<div>");
      // $(newDiv).text(ingredients[i].name);

      var name = ingredients[i].name;
      var value = ingredients[i].amount.us.value.toFixed(2);
      var unit = ingredients[i].amount.us.unit;

      $(newDiv).html("<hr>" + value + " " + unit + " " + name);

      // $(newDiv).addClass("col-4");

      $("#recipe-container2").append(newDiv);


    }
    getNutrition2();

  })

  function getNutrition2() {

    // if(nutritionGot1 === false) {

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
      console.log(nutrition2);
      $("#recipe-container2").append(nutrition2);

      // nutritionGot1 = true;
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
      console.log(resp2c);

        // instrTitle1 = $("<div>")
        // $(instrTitle1).html("<h4>" + "Recipe Instructions" + "</h4>");
      recipeSteps = resp2c[0].steps;

      for (i = 0; i < recipeSteps.length; i++) {

        instructionsDiv2 = $("<li>").addClass("ui-menu-item").attr('role', 'menuitem');
        
        $(instructionsDiv2).append("<br>" + "<br>" + "Step Number" + [i+1] + ": " + recipeSteps[i].step);
        $("#recipe-container2").append(instructionsDiv2);

      }


    })

  }




}


function postRecipeFunction3() {


  var titleDiv3 = $("<h4>");
  $(titleDiv3).text(recipeThreeName);
  // console.log(titleDiv3);
  $("#recipe-container3").append(titleDiv3);


  var imageDiv3 = $("<img>")
  $(imageDiv3).attr("src", recipeThreeImage);
  $("#recipe-container3").append(imageDiv3)

  // var ingredientsDiv3 = $("<h6>");
  // $(ingredientsDiv3).text("Ingredients");
  // $("recipe-container3").append(ingredientsDiv3);


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

    // console.log(resp3);
    $("#recipe-container3").show();
    // $("#recipe-container").html(resp1);

    // console.log(resp3.ingredients)
    var ingredients = resp3.ingredients;

    for (i = 0; i < ingredients.length; i++) {
      // $("#recipe-container").text(ingredients[i].name);
      // console.log(i);
      var newDiv = $("<div>");
      // $(newDiv).text(ingredients[i].name);

      var name = ingredients[i].name;
      var value = ingredients[i].amount.us.value.toFixed(2);
      var unit = ingredients[i].amount.us.unit;

      $(newDiv).html("<hr>" + value + " " + unit + " " + name);

      // $(newDiv).addClass("col-4");

      $("#recipe-container3").append(newDiv);


    }

    getNutrition3();
  })

  
  function getNutrition3() {

    // if(nutritionGot1 === false) {

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
      console.log(resp3b);
      var nutrition3 = $("<div>");
      $(nutrition3).append("<br>" + "<br>" + "<h4>" + "Nutrition Facts" + "</h4>")
      $(nutrition3).append("<br>" + "Calories: " + resp3b.calories + "<br>");
      $(nutrition3).append("Carbs: " + resp3b.carbs + "<br>");
      $(nutrition3).append("Fat: " + resp3b.fat + "<br>");
      $(nutrition3).append("Protein: " + resp3b.protein + "<br>");
      console.log(nutrition3);
      $("#recipe-container3").append(nutrition3);

      // nutritionGot1 = true;
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
      console.log(resp3c);

        // instrTitle1 = $("<div>")
        // $(instrTitle1).html("<h4>" + "Recipe Instructions" + "</h4>");
      recipeSteps = resp3c[0].steps;

      for (i = 0; i < recipeSteps.length; i++) {

        instructionsDiv3 = $("<li>").addClass("ui-menu-item").attr('role', 'menuitem');
        
        $(instructionsDiv3).append("<br>" + "<br>" + "Step Number" + [i+1] + ": " + recipeSteps[i].step);
        $("#recipe-container3").append(instructionsDiv3);

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
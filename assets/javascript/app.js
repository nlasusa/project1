

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

var recipeShown = false;

// var nutritionGot1 = false;

var apiKey = "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16";



///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////RATE YO CDN /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

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

// sweet alert function 
$("#rateYo").on("click", function () {
  swal("Thanks for your review! We appreciate your feedback.");
  $("#rateYo").hide(); 
  $("#rate").hide(); 
})


///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//\\/\/\/\/\/\/\/\\/\/\/\\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/


///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////hIDDEN CONTAINERS ///////////////////////////
///////////////////////////////////////////////////////////////////////////////

// hidden containers 
$("#recipe-container1").hide();
$("#recipe-container2").hide();
$("#recipe-container3").hide();

$("#ingr-container1").hide();
$("#ingr-container2").hide();
$("#ingr-container3").hide();

$("#hidtitle1").hide();
$("#hidtitle2").hide();
$("#hidtitle3").hide();

$("#drink-title-container").hide();
$("#drink-ingredients-container").hide();
$("#drink-description-container").hide();

$("#recipe-instructions").hide()

// button clicks to remove containers once category is chosen:

//Weight Loss 
$("#button-1").on('click', function() {
  $("#card1").hide();
  $("#card2").hide();
  $("#card3").hide();
  $("#custom-calories-search").hide();
  $("p").hide();
  $("#hidtitle1").show();
});

//General
$("#button-2").on('click', function() {
  $("#card1").hide();
  $("#card2").hide();
  $("#card3").hide();
  $("#custom-calories-search").hide();
  $("p").hide();
  $("#hidtitle2").show();
});

//Weight Gain
$("#button-3").on('click', function() {
  $("#card1").hide();
  $("#card2").hide();
  $("#card3").hide();
  $("#custom-calories-search").hide();
  $("p").hide();
  $("#hidtitle3").show();
});

$("#button-4").on('click', function() {
  $("#card1").hide();
  $("#card2").hide();
  $("#card3").hide();
  $("#custom-calories-search").hide();
  $("p").hide();
  $("#hidtitle3").show();
});

$("#button-5").on('click', function() {
  $("#card1").hide();
  $("#card2").hide();
  $("#card3").hide();
  $("#custom-calories-search").hide();
  $("p").hide();
  $("#hidtitle3").show();
});

//Custom search

$("#submit-calorie").on('click', function() {
  $("#card1").hide();
  $("#card2").hide();
  $("#card3").hide();
  $("#custom-calories-search").hide();
  $("p").hide();
  $("#hidtitle3").show();
});

$(".fa-heart").on('click', function() {
      $(this).css('color', 'red');
});

// minimize function for ingredient containers
$(".fa-minus").on('click', function () {
  $("#ingr-container1").hide();
});

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\///\\//\\///\//\//\//\/\//\/

///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// RECIPE API CALL - VIA BUTTON PRESS /////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//First create an onclick listener to listen which button value is selected on first page
$(".calorie-button").on("click", function () {

  chosenCalories = $(this).val();
  console.log(chosenCalories);

//   calories = $('.calorie-button').val();
// console.log(calories )

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

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//\\//\\//\\//\\//\\//\\//\\//\\//\\\///\\//\\//\\//\\//\\//\\//\\//\\\//\\\/\\/\///\///\\

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// RECIPE API CALL - TEXT INPUT ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


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

////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\


///////////////////////////////////////////////////////////////////////////////////
///////////////// Random Drink API ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
$("#drink-button").on("click", function(event){
  event.preventDefault();

$("#drink-title-container").show();
$("#drink-ingredients-container").show();
$("#drink-description-container").show();

$.ajax({
  url:
    "https://the-cocktail-db.p.rapidapi.com/random.php",
  type: "GET",
  headers: {
    "X-RapidAPI-Key":
      "f580f78a4emshcd303cfd9f4f498p15acdajsnc358ed3e2963",
    "X-RapidAPI-Host":
    "the-cocktail-db.p.rapidapi.com"
  }
 }).then(function(response){

    console.log(response);
    drink = response.drinks[0];

////This puts the drink title into the drink-container card///
    var drinkTitle = drink.strDrink;
    $("#drink-title").html(drinkTitle);

/////This assigns and image to the drink-image element
    $("#drink-image").attr("src", drink.strDrinkThumb);
   
////This gathers the ingredients from the JSON and puts it into variables 
//// Those variables will then be used to add lines of text to the drink-container html/////////////////////
    ingredient1 = drink.strIngredient1;
    ingredient2 = drink.strIngredient2;
    ingredient3 = drink.strIngredient3;
    ingredient4 = drink.strIngredient4;
    ingredient5 = drink.strIngredient5;
    ingredient6 = drink.strIngredient6;
    
    measure1 = drink.strMeasure1;
    measure2 = drink.strMeasure2;
    measure3 = drink.strMeasure3;
    measure4 = drink.strMeasure4;
    measure5 = drink.strMeasure5;
    measure6 = drink.strMeasure6;

    drinkIngredients = $("<div>");
    
    $(drinkIngredients).append(measure1 + ingredient1);
    $(drinkIngredients).append("<br>" + measure2 + ingredient2);
    $(drinkIngredients).append("<br>" + measure3 + ingredient3);
    $(drinkIngredients).append("<br>" + measure4 + ingredient4);
    $(drinkIngredients).append("<br>" + measure5 + ingredient5);
    $(drinkIngredients).append("<br>" + measure6 + ingredient6);

    $("#drink-ingredients").html(drinkIngredients);

        //This is my broken for loop, something wrong with the scope where "drink.strIngredient + [i+1]" console.log's as undefined///
            // for (i = 0; i < 15; i++) {
            //   console.log(drink.strIngredient + [i+1]);
            //   console.log(drink.strMeasure + [i+1]);
            // }


////This will take the recommended cup and add it to the drink description element in our html//
  $("#drink-glass").html(drink.strGlass);
  
///This will display whether the drink is alcoholic or non-alcoholic
  $("#drink-type").html(drink.strAlcoholic)

////This will take the mixology process and describe the process to our user
  $("#drink-mixology").html(drink.strInstructions);


  })

});
  
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


//\\//\\//\\//\\//\\\///\\\///\\\//\/\//\//\///\\///\///\\///\\\////\\\////\\\////\\\\///\//\\


//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// POST RECIPE FUNCTIONS //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

function postRecipeFunction1() {


   var imageDiv1 = $("<img>")
  $(imageDiv1).attr("src", recipeOneImage);
  $("#recipe-container1").prepend(imageDiv1);

  var titleDiv1 = $("<h5>");
  $(titleDiv1).text(recipeOneName);
  // console.log(titleDiv1);
  $("#recipe-container1").prepend(titleDiv1);


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
    $("#ingr-container1").show();
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
    
        $("#ingr-container1").append(newDiv);
      
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
      $("#button-nutr1").on("click", function () {
        $("#button-nutr1").append(nutrition1);
        $("#mySpan1").hide();
      })
      
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


      var instructionsMasterDiv1 = $("<div>")
      for (i = 0; i < recipeSteps.length; i++) {
        
        instructionsDiv1 = $("<li>").addClass("ui-menu-item").attr('role', 'menuitem');
        console.log(instructionsDiv1);
        
        $(instructionsDiv1).append("Step Number " + [i+1] + ": " + recipeSteps[i].step);
        
        // $("#recipe-container-guide").append(instructionsDiv3);
        $(instructionsMasterDiv1).append(instructionsDiv1);

      }; 
     
      $("#button-instructions1").on("click", function(){
        if (recipeShown === false) {
          console.log("You've requested instructions for recipe 1")
        $("#recipe-instructions").show();
        $("#recipe-container-guide").html(instructionsMasterDiv1);
        recipeShown = true;
      }else {
        $("#recipe-instructions").hide();
        recipeShown = false;
      }
    });
    })
  }


}

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

function postRecipeFunction2() {

  var imageDiv2 = $("<img>")
  $(imageDiv2).attr("src", recipeTwoImage);
  $("#recipe-container2").prepend(imageDiv2)

  var titleDiv2 = $("<h5>");
  $(titleDiv2).text(recipeTwoName);
  // console.log(titleDiv2);
  $("#recipe-container2").prepend(titleDiv2);


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
    $("#ingr-container2").show();
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

      $("#ingr-container2").append(newDiv);
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

      $("#button-nutr2").on("click", function () {
        $("#button-nutr2").append(nutrition2);
        $("#mySpan2").hide();
    });

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

      
      var instructionsMasterDiv2 = $("<div>")
      for (i = 0; i < recipeSteps.length; i++) {
        
        instructionsDiv2 = $("<li>").addClass("ui-menu-item").attr('role', 'menuitem');
        console.log(instructionsDiv2);
        
        $(instructionsDiv2).append("Step Number " + [i+1] + ": " + recipeSteps[i].step);
        
        // $("#recipe-container-guide").append(instructionsDiv3);
        $(instructionsMasterDiv2).append(instructionsDiv2);

      }; 
     
      $("#button-instructions2").on("click", function(){
        if (recipeShown === false) {
          console.log("You've requested instructions for recipe 2")
        $("#recipe-instructions").show();
        $("#recipe-container-guide").html(instructionsMasterDiv2);
        recipeShown = true;

      }else {
        $("#recipe-instructions").hide();
        recipeShown = false;
      }
    });
    })
  }




}


function postRecipeFunction3() {

  var imageDiv3 = $("<img>")
  $(imageDiv3).attr("src", recipeThreeImage);
  $("#recipe-container3").prepend(imageDiv3)

  var titleDiv3 = $("<h5>");
  $(titleDiv3).text(recipeThreeName);
  // console.log(titleDiv3);
  $("#recipe-container3").prepend(titleDiv3);

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
    $("#ingr-container3").show();
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


      $("#ingr-container3").append(newDiv);

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

      $("#button-nutr3").on("click", function () {
        $("#button-nutr3").append(nutrition3);
        $("#mySpan3").hide();
      })


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
      var instructionsMasterDiv3 = $("<div>")
      for (i = 0; i < recipeSteps.length; i++) {
        
        instructionsDiv3 = $("<li>").addClass("ui-menu-item").attr('role', 'menuitem');
        console.log(instructionsDiv3);
        
        $(instructionsDiv3).append("Step Number " + [i+1] + ": " + recipeSteps[i].step);
        
        // $("#recipe-container-guide").append(instructionsDiv3);
        $(instructionsMasterDiv3).append(instructionsDiv3);

      }; 
     
      $("#button-instructions3").on("click", function(){
        if (recipeShown === false) {
          console.log("You've requested instructions for recipe 3")
        $("#recipe-instructions").show();
        $("#recipe-container-guide").html(instructionsMasterDiv3);
        recipeShown = true;

      }else {
        $("#recipe-instructions").hide();
        recipeShown = false;
      }
    });
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
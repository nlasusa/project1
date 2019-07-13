//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\///\\\//\\\///\\/

/////////////////////////////////////////////////////////////////////////////////
////////////////////////   INITIALIZE VARIABLES   ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

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
var nutr1Showing = false;
var nutr2Showing = false;
var nutr3Showing = false;


var spoonacularApiKey = "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16";
var cocktaildbApiKey = "f580f78a4emshcd303cfd9f4f498p15acdajsnc358ed3e2963";

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
/////////////////////  INITIALIZE HIDDEN CONTAINERS ///////////////////////////
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

$("#recipe-instructions").hide();
$("#refresh-button").hide();

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\///\\\//\\\///\\/

/////////////////////////////////////////////////////////////////////////////////
///////////////////// HIDE ELEMENTS BASED ON CLICKS /////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


//Weight Loss 
$("#button-1a").on('click', function() {
  $("#card1").hide();
  $("#card2").hide();
  $("#card3").hide();
  $("#card4").hide();
  $("#custom-calories-search").hide();
  $("p").hide();
  $("#hidtitle1").show();
  $("#refresh-button").show();
});

$("#button-1b").on('click', function() {
  $("#card1").hide();
  $("#card2").hide();
  $("#card3").hide();
  $("#card4").hide();
  $("#custom-calories-search").hide();
  $("p").hide();
  $("#hidtitle1").show();
  $("#refresh-button").show();
});

$("#button-1c").on('click', function() {
  $("#card1").hide();
  $("#card2").hide();
  $("#card3").hide();
  $("#card4").hide();
  $("#custom-calories-search").hide();
  $("p").hide();
  $("#hidtitle1").show();
  $("#refresh-button").show();
});

//General
$("#button-2").on('click', function() {
  $("#card1").hide();
  $("#card2").hide();
  $("#card3").hide();
  $("#card4").hide();
  $("#custom-calories-search").hide();
  $("p").hide();
  $("#hidtitle2").show();
  $("#refresh-button").show();
});

//Weight Gain
$("#button-3a").on('click', function() {
  $("#card1").hide();
  $("#card2").hide();
  $("#card3").hide();
  $("#card4").hide();
  $("#custom-calories-search").hide();
  $("p").hide();
  $("#hidtitle3").show();
  $("#refresh-button").show();
});

$("#button-3b").on('click', function() {
  $("#card1").hide();
  $("#card2").hide();
  $("#card3").hide();
  $("#card4").hide();
  $("#custom-calories-search").hide();
  $("p").hide();
  $("#hidtitle3").show();
  $("#refresh-button").show();
});

$("#button-3c").on('click', function() {
  $("#card1").hide();
  $("#card2").hide();
  $("#card3").hide();
  $("#card4").hide();
  $("#custom-calories-search").hide();
  $("p").hide();
  $("#hidtitle3").show();
  $("#refresh-button").show();
});

//Custom search

$("#submit-calorie").on('click', function() {
  $("#card1").hide();
  $("#card2").hide();
  $("#card3").hide();
  $("#card4").hide();
  $("#custom-calories-search").hide();
  $("p").hide();
  $("#refresh-button").show();
  $("#hidtitle3").show();
});

// favorites - hearts
$(".fa-heart").on('click', function() {
  $(this).css('color', 'red');
    if (window.sidebar && window.sidebar.addPanel) {
        // Mozilla Firefox Bookmark
        window.sidebar.addPanel(document.title,window.location.href,'');
    }
    else if(window.sidebar && jQuery.browser.mozilla){
        //for other version of FF add rel="sidebar" to link like this:
        //<a id="bookmarkme" href="#" rel="sidebar" title="bookmark this page">Bookmark This Page</a>
        jQuery(this).attr('rel', 'sidebar');
    }
    else if(window.external && ('AddFavorite' in window.external)) {
        // IE Favorite
        window.external.AddFavorite(location.href,document.title);
    } else if(window.opera && window.print) {
        // Opera Hotlist
        this.title=document.title;
        return true;
    } else {
        // webkit - safari/chrome
        swal('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this recipe.');

    }
});

// minimize function for ingredient containers
$(".fa-minus").on('click', function () {
  $("#ingr-container1").hide();
});

//Refresh page button 
$("#refresh-button").on("click", function(){
  location.reload();
})


//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\///\\//\\///\//\//\//\/\//\/

///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// RECIPE API CALL - VIA BUTTON PRESS /////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

//First create an onclick listener to listen TO which button value is selected on first page
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

    //Pulls meal array from JSON
    var meal = response.meals
    //Captures Meal ID#, to be used in subsequent API Calls
    recipeOne = meal[0].id;
    //Captures Meal Title, to be put in our container
    recipeOneName = meal[0].title;
    //Captures Meal Image, to be put in our container
    recipeOneImage = "https://webknox.com/recipeImages/" + meal[0].image;

    //These variable initializers mimic the above for the other 2 recipes
    recipeTwo = meal[1].id;
    recipeTwoName = meal[1].title;
    recipeTwoImage = "https://webknox.com/recipeImages/" + meal[1].image;

    recipeThree = meal[2].id;
    recipeThreeName = meal[2].title;
    recipeThreeImage = "https://webknox.com/recipeImages/" + meal[2].image;

    //This calls the functions which will run our API calls getting the ingredients, nutrition facts, and recipes for each of the recipes
    postRecipeFunction1();
    postRecipeFunction2();
    postRecipeFunction3();
  });


}); 

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

/// When the Random Drink button is selected it will populate a random drink for you!

$( "#drink-button1" ).one( "click", function() {
  swal("You must be 21 years or over to drink.");
});

$("#drink-button1").on("click", function(event){
  event.preventDefault();
$("#drink-title-container").show();
$("#drink-ingredients-container").show();
$("#drink-description-container").show();

//This is the Ajax call using the Cocktail-db
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

  //This will put the image grabbed earlier into the main recipe container
   var imageDiv1 = $("<img>")
  $(imageDiv1).attr("src", recipeOneImage);
  $("#recipe-container1").prepend(imageDiv1);

  //This will put the title grabbed earlier into the main recipe container
  var titleDiv1 = $("<h5>");
  $(titleDiv1).text(recipeOneName);
  $("#recipe-container1").prepend(titleDiv1);

  ///This is the Ajax call that used the meal ID# to get the ingredients
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

    //This will display the recipe container cards
    $("#recipe-container1").show();
    $("#ingr-container1").show();

    //This will assign ingredient array to a variable from the JSON object
    var ingredients = resp1a.ingredients;

    //This is a for loop that will gather all of the ingredients and put them to a Div
    for (i = 0; i < ingredients.length; i++) {

      var newDiv = $("<div>");

      var name = ingredients[i].name;
      var value = ingredients[i].amount.us.value.toFixed(2);
      var unit = ingredients[i].amount.us.unit;

      $(newDiv).html("<hr>" + value + " " + unit + " " + name);

        $("#ingr-container1").append(newDiv);
      
    }
    //This will call the next API that will gather the Nutrition facts
    getNutrition1();

  })


  function getNutrition1() {

    //This Ajax call will get the nutrition facts based on the 1st Recipe ID#
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

      //Create Div to put our nutrition facts in
      var nutrition1 = $("<div>");
      $(nutrition1).addClass("nutrition-1")
      
      //Pushing the nutrition facts into the aforementioned Div
      $(nutrition1).append("<br>" + "<br>" + "<h4>" + "Nutrition Facts" + "</h4>")
      $(nutrition1).append("<br>" + "Calories: " + resp1b.calories + "<br>");
      $(nutrition1).append("Carbs: " + resp1b.carbs + "<br>");
      $(nutrition1).append("Fat: " + resp1b.fat + "<br>");
      $(nutrition1).append("Protein: " + resp1b.protein + "<br>");
      
      //This will allow us to expand the details for the Nutrition facts as well as close it
      //Note the conditionals which is how you can get the button/description to revert back to normal
      $("#button-nutr1").on("click", function () {
        
        if (nutr1Showing === false) {
        
        $("#button-nutr1").append(nutrition1);
        $("#mySpan1").hide();
        nutr1Showing = true;
        console.log(nutr1Showing)
        
        } else {
          
          $(".nutrition-1").remove();
          $("#mySpan1").show();
          nutr1Showing = false;
          console.log(nutr1Showing);
        }
      })
      
      
      // nutritionGot1 = true;
    })

    //This will call the final API call of this Recipe, to gather the intructions
    getInstructions1();

  }

  function getInstructions1() {

    //This will use the Meal ID# to call an API that will provide us with the recipe instructions
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

      //This creates a Master Div that we will append the recipe steps to, 
      //This is necessary to then be added to the recipe-instruction-container without needing to append the individual elements
      var instructionsMasterDiv1 = $("<div>")
      
      //This is our For Loop to gather the recipe instructions
      for (i = 0; i < recipeSteps.length; i++) {
        
        instructionsDiv1 = $("<li>").addClass("ui-menu-item").attr('role', 'menuitem');
        console.log(instructionsDiv1);
        
        $(instructionsDiv1).append("Step Number " + [i+1] + ": " + recipeSteps[i].step);
        
        // $("#recipe-container-guide").append(instructionsDiv3);
        $(instructionsMasterDiv1).append(instructionsDiv1);

      }; 
     
      //This click listener will listen for when the users request the Recipe Information
      $("#button-instructions1").on("click", function(){

        if (recipeShown === false) {
          console.log("You've requested instructions for recipe 1")
        $("#recipe-instructions-title").text(" " + recipeOneName);
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


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


//\\//\\//\\//\\//\\\///\\\///\\\//\/\//\//\///\\///\///\\///\\\////\\\////\\\////\\\\///\//\\

 /// PLEASE NOTE THAT ALL CODE FOR POST RECIPE FUNCTIONS NUMBER 2 AND 3 WILL HAVE LIMITED PSUEDOCODE
 /// AS THE CODE IN THESE FUNCTIONS MIMICS THE EXACT CODE FROM THE postRecipeFunction1() CODE SECTION


/////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// POST RECIPE FUNCTIONS NUMBER 2 ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////


function postRecipeFunction2() {

  //Image Div
  var imageDiv2 = $("<img>")
  $(imageDiv2).attr("src", recipeTwoImage);
  $("#recipe-container2").prepend(imageDiv2)

  //Title Div
  var titleDiv2 = $("<h5>");
  $(titleDiv2).text(recipeTwoName);
  $("#recipe-container2").prepend(titleDiv2);

  //Ingredients API Call
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
    $("#ingr-container2").show();

    //Set variable ingredients
    var ingredients = resp2.ingredients;

    //For loop to gather ingredients
    for (i = 0; i < ingredients.length; i++) {
 
      var newDiv = $("<div>");

      var name = ingredients[i].name;
      var value = ingredients[i].amount.us.value.toFixed(2);
      var unit = ingredients[i].amount.us.unit;

      $(newDiv).html("<hr>" + value + " " + unit + " " + name);

      //Appends ingredient list to container
      $("#ingr-container2").append(newDiv);
    }

    //Calls #2 of the 3 functions
    getNutrition2();

  })

  function getNutrition2() {

    //API Call to get Nutrition from Recipe 2
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
     $(nutrition2).addClass("nutrition-2")
     
     //Pushing the nutrition facts into the aforementioned Div
     $(nutrition2).append("<br>" + "<br>" + "<h4>" + "Nutrition Facts" + "</h4>")
     $(nutrition2).append("<br>" + "Calories: " + resp2b.calories + "<br>");
     $(nutrition2).append("Carbs: " + resp2b.carbs + "<br>");
     $(nutrition2).append("Fat: " + resp2b.fat + "<br>");
     $(nutrition2).append("Protein: " + resp2b.protein + "<br>");
     
     //Creates click listener to expand/shrink nutrition facts
     $("#button-nutr2").on("click", function () {
       
       if (nutr2Showing === false) {
       
       $("#button-nutr2").append(nutrition2);
       $("#mySpan2").hide();
       nutr2Showing = true;
       console.log(nutr2Showing)
       
       } else {
         
         $(".nutrition-2").remove();
         $("#mySpan2").show();
         nutr2Showing = false;
         console.log(nutr2Showing);
       }
     })
     

    })
    //Call API to get recipe instructions
  getInstructions2();

  }

  function getInstructions2() {

    //Recipe instrucitons API
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

      recipeSteps = resp2c[0].steps;

      //Master Div
      var instructionsMasterDiv2 = $("<div>");

      //For Loop to add instruction steps
      for (i = 0; i < recipeSteps.length; i++) {
        
        instructionsDiv2 = $("<li>").addClass("ui-menu-item").attr('role', 'menuitem');
        console.log(instructionsDiv2);
        
        $(instructionsDiv2).append("Step Number " + [i+1] + ": " + recipeSteps[i].step);
        
        // $("#recipe-container-guide").append(instructionsDiv3);
        $(instructionsMasterDiv2).append(instructionsDiv2);

      }; 
     
      //Adds on click listener which will display this recipe's instructions to recipe-instruction-container
      $("#button-instructions2").on("click", function(){
        if (recipeShown === false) {
          console.log("You've requested instructions for recipe 2")
        $("#recipe-instructions-title").text(" " + recipeTwoName);
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


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////



//\\//\\//\\//\\//\\\///\\\///\\\//\/\//\//\///\\///\///\\///\\\////\\\////\\\////\\\\///\//\\



//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////    POST RECIPE FUNCTION # 3    /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

function postRecipeFunction3() {

  //Image div
  var imageDiv3 = $("<img>")
  $(imageDiv3).attr("src", recipeThreeImage);
  $("#recipe-container3").prepend(imageDiv3)

  //Title div
  var titleDiv3 = $("<h5>");
  $(titleDiv3).text(recipeThreeName);
  $("#recipe-container3").prepend(titleDiv3);

  //API Call for ingredients
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
    $("#ingr-container3").show();

    var ingredients = resp3.ingredients;

    for (i = 0; i < ingredients.length; i++) {

      var newDiv = $("<div>");

      var name = ingredients[i].name;
      var value = ingredients[i].amount.us.value.toFixed(2);
      var unit = ingredients[i].amount.us.unit;

      $(newDiv).html("<hr>" + value + " " + unit + " " + name);

      $("#ingr-container3").append(newDiv);

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
     $(nutrition3).addClass("nutrition-3")
     
     $(nutrition3).append("<br>" + "<br>" + "<h4>" + "Nutrition Facts" + "</h4>")
     $(nutrition3).append("<br>" + "Calories: " + resp3b.calories + "<br>");
     $(nutrition3).append("Carbs: " + resp3b.carbs + "<br>");
     $(nutrition3).append("Fat: " + resp3b.fat + "<br>");
     $(nutrition3).append("Protein: " + resp3b.protein + "<br>");
     
     $("#button-nutr3").on("click", function () {
       
       if (nutr3Showing === false) {
       
       $("#button-nutr3").append(nutrition3);
       $("#mySpan3").hide();
       nutr3Showing = true;
       
       } else {
         
         $(".nutrition-3").remove();
         $("#mySpan3").show();
         nutr3Showing = false;

       }
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
      console.log(resp3c);

      recipeSteps = resp3c[0].steps;
      var instructionsMasterDiv3 = $("<div>")
      for (i = 0; i < recipeSteps.length; i++) {
        
        instructionsDiv3 = $("<li>").addClass("ui-menu-item").attr('role', 'menuitem');
        
        $(instructionsDiv3).append("Step Number " + [i+1] + ": " + recipeSteps[i].step);
        
        $(instructionsMasterDiv3).append(instructionsDiv3);

      }; 
     
      $("#button-instructions3").on("click", function(){
        
        if (recipeShown === false) {
        
          $("#recipe-instructions-title").text(" " + recipeThreeName);
          $("#recipe-instructions").show();
          $("#recipe-container-guide").html(instructionsMasterDiv3);
             recipeShown = true;

      } else {
        $("#recipe-instructions").hide();
           recipeShown = false;
      }
    });
    })
  }


}


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


//\\//\\//\\//\\//\\\///\\\///\\\//\/\//\//\///\\///\///\\///\\\////\\\////\\\////\\\\///\//\\


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////



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

$("#button-1").on("click", function(){

    console.log("You clicked a button");
    console.log($('#button-1').val());

    var calories = $('#button-1').val();

    console.log("The calories you've chosen to search are: " + calories);

    // unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?targetCalories=2000&timeFrame=day")
    // .header("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
    // .header("X-RapidAPI-Key", "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16")
    // .end(function (result) {
    //   console.log(result);
    // });

    // $.ajax({
    //   method: 'GET',
    //   url: 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-RapidAPI-Key": "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16"
    //   }
    // })

    // var question = "How much vitamin c is in 2 apples";
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
      recipeTwo = meal[1].id;
      recipeThree = meal[2].id;

      console.log(recipeOne);

      postRecipeFunction1();
    });


   });

  function postRecipeFunction1(){

    console.log(recipeOne);
    console.log(recipeTwo);
    console.log(recipeThree);

    $.ajax({
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeOne + "/ingredientWidget",
      type: "GET",
      headers: {
        "X-RapidAPI-Key":
          "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    }).then(function(resp1){

      // console.log(resp1);
      $("#recipe-container").html(resp1);
    
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
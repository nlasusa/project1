

//\\//\\ CREATE VARIABLES //\\//\\//\\

var recipeChosen;
var recipeName;
var recipeImage;
var recipeIngredients;
var recipeNutritionals;

var apiKey = "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16";

//\\//\\//\\ CREATE FUNCTIONS \\//\\//\\//

//First create an onclick listener to listen which button value is selected on first page

$("#button-1").on("click", function(){

    console.log("You clicked a button");
    console.log($('#button-1').val());

    var calories = $('#button-1').val();

    console.log("The calories you've chosen to search are: " + calories);

    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?targetCalories=2000&timeFrame=day")
    .header("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", "583e89ac2fmsh3176bf5e7b70170p19a52cjsn4591ad6ecf16")
    .end(function (result) {
      console.log(result);
    });


    // $.ajax({
        
    //     url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate",
    //     method: 'GET',

    // }).then( function(response){
    //     console.log(response);
    // })
    

})


//This will assign the value of that button to a variable


//This variable will be used in our AJAX call queryURL to pull the recipe

//Then we will go into the JSON object and grab the data we want #1:ingredients #2: nutritionals

//Assign these objects to a variable

//Create a new Div 

//Put the content of the JSON object variables into that Div

//Append that Div to the "recipes-chosen" container


///\\\///\\\///\ CALL FUNCTIONS \\\///\\\////\\\\///
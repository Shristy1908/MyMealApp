const searchBtn=document.getElementById("search-btn");
const body=document.getElementById("body");
const mealList=document.getElementById("meal");
const mealDetailsContent=document.querySelector(".meal-details-content");
const recipeCloseBtn=document.getElementById("recipe-close-btn");
const favourite=document.getElementById("fa-heart")

// Event Listeners

searchBtn.addEventListener('click',getMealList);

mealList.addEventListener('click',getmealRecipe);

recipeCloseBtn.addEventListener('click',()=>{
    mealList.style.visibility="visible";
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});



// get meal list that matches with ingredients

function getMealList(){
    let searchInputText=document.getElementById('search-input').value.trim();
    console.log(searchInputText);

    url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputText}`;
    
    fetch(url)

    .then(response=>response.json())

    .then(data=>{
         let html='';
         if(data.meals){
            data.meals.forEach(meal => {
                html+=` <div class="meal" data-id= '${meal.idMeal}'>
                      <div class="meal-img">
                          <img src="${meal.strMealThumb}" alt="food">
                      </div>
                      <div class="meal-name">
                          <h3>${meal.strMeal}</h3>
                          <a href="#" class="recipe-btn">Get Recipe</a>
                          <i class="fa fa-solid fa-heart" ></i>
                      </div>
                  </div>`;
            });
            mealList.classList.remove("not-found");
          }else{
            html=`Sorry, We didn't find your meal!`;
            mealList.classList.add("not-found");
         }
      
         mealList.innerHTML=html;
    })
}

//whenever we click on button get recipe getmealRecipe funtion will be called

function getmealRecipe(e){

    e.preventDefault();

    if(e.target.classList.contains('recipe-btn')){

        let mealItem=e.target.parentElement.parentElement;

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data=>mealRecipeModel(data.meals))
    }
}



//showing recipe description after clicking on button get recipe

function mealRecipeModel(meal){

    mealList.style.visibility='hidden';
    meal=meal[0];

    html=`  
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
    <img src="${meal.strMealThumb}" alt="food image">
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">Watch video</a>
    </div>`;

    mealDetailsContent.innerHTML=html;

    mealDetailsContent.parentElement.classList.add("showRecipe");
}

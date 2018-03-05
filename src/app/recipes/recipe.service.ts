import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>()

   private recipes: Recipe[] = [
        new Recipe('Tasty Schnitzel',
        'This is simple a test',
        'http://maxpixel.freegreatpicture.com/static/photo/1x/Schnitzel-Eat-Schnitzel-With-Fries-Schnipo-Lunch-1837703.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]),
        new Recipe('Big fat burger',
        'This is simple a test',
        'https://images.pexels.com/photos/161674/appetite-beef-big-bread-161674.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
        [
            new Ingredient('Meat', 1),
            new Ingredient('Buns', 2)
        ])
      ];
    constructor(private shoppingListService: ShoppingListService){}
    

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index:number){
        return this.recipes[index]
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients)
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1)
        this.recipesChanged.next(this.recipes.slice())
    }
}
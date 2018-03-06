import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

import 'rxjs/Rx'
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService){}

    storeRecipes(){
        const token = this.authService.getToken()
        return this.http.put('https://ng-recipe-book-78b02.firebaseio.com/recipes.json?auth='+token,
        this.recipeService.getRecipes());
    }

    getRecipes(){
        const token = this.authService.getToken()
        return this.http.get('https://ng-recipe-book-78b02.firebaseio.com/recipes.json?auth='+token)
            // .map(ß
            //     (response:Response) => {
            //         const recipes: Recipe[] = response.json();
            //         for (const recipe of recipes) {
            //             if(!recipe['ingredients']) {
            //                 console.log(recipe);
            //                 recipe['ingredients'] = []
            //             }
            //         }ßß
            //         return recipes;
            //     }
            // )
            .map((response: Response) => response.json())
            .map((recipes: Recipe[])=> recipes.map(({ingredients=[], ...recipe}) =>({ingredients, ...recipe})))
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes)
                }
            )
    }
}
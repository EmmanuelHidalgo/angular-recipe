import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx'

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService){}

    storeRecipes(){
        // return this.httpClient.put('https://ng-recipe-book-78b02.firebaseio.com/recipes.json',
        // this.recipeService.getRecipes(), {
        //     observe: 'body',
        //     params: new HttpParams().set('auth', token)
        //     //headers: new HttpHeaders().set('Authorization', 'some token')
        // });
        const req = new HttpRequest(
            'PUT',
            'https://ng-recipe-book-78b02.firebaseio.com/recipes.json',
            this.recipeService.getRecipes(),
            {
                reportProgress: true
            }
        )

        return this.httpClient.request(req)
    }

    getRecipes(){
        //return this.httpClient.get<Recipe[]>('https://ng-recipe-book-78b02.firebaseio.com/recipes.json?auth='+token)
        return this.httpClient.get<Recipe[]>('https://ng-recipe-book-78b02.firebaseio.com/recipes.json',{
            observe:'body',
            responseType: 'json' //usually this obj we dont have to make it, we just left the code as in the upper line
        })
            .map((recipes)=> recipes.map(({ingredients=[], ...recipe}) =>({ingredients, ...recipe})))
            .subscribe(
                (recipes) => {
                    this.recipeService.setRecipes(recipes)
                }
            )
    }
}
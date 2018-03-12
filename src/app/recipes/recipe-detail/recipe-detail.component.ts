import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";
import * as fromShoppingList from "../../shopping-list/store/shopping-list.reducer"
import * as fromRecipe from "../store/recipe.reducers"
import * as RecipeActions from "../store/recipe.actions"
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>
  id: number;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.recipeState = this.store.select('recipes')
      }
    )
  }

  onAddToShoppingList(){
    this.store.select('recipes')
      .take(1)
      .subscribe((recipeState: fromRecipe.State)=> {
        this.store.dispatch(new ShoppingListActions.AddIngredients(
          recipeState.recipes[this.id].ingredients))
      })
  }

  onEditRecipe(){
    //right now our route is /recipes/1 just need to the edit in order to match to /1/edit
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe(){
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id))
    this.router.navigate(['/recipes']);
  }

}

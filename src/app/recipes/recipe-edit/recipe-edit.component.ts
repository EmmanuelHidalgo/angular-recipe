import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducers'
import * as RecipeActions from '../store/recipe.actions'
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']
          //here when I check that params has an id id means that I am on route ':id/edit'
          //so this route means that I am editing a recipe, BUT if the id does NOT exists
          //it means that I am on a new recipe so editMode will be false
          this.editMode = params['id'] != null;
          this.initForm();
        }
      )
  }

  onSubmit(){
    const recipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'])

    if (this.editMode){
      //this.recipeService.updateRecipe(this.id,recipe)
      this.store.dispatch(new RecipeActions.UpdateRecipe({index: this.id, updatedRecipe: recipe}))
      //this.editMode = false;
    } else {
      //this.recipeService.addRecipe(recipe)
      this.store.dispatch(new RecipeActions.AddRecipe(recipe))
    }
    this.onCancel()
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  onCancel(){
    this.recipeForm.reset()
    this.editMode = false;
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath= '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([])

    if(this.editMode){
      this.store.select('recipes')
        .take(1)
        .subscribe((recipeState: fromRecipe.State)=> {
          const recipe = recipeState.recipes[this.id];
          recipeName = recipe.name
          recipeImagePath = recipe.imagePath
          recipeDescription = recipe.description

          if(recipe['ingredients']){
            for(let ingredient of recipe.ingredients){
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount,[
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              )
            }
          }
        })
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}

import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
    recipes: [
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
      ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch(action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case RecipeActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.index]
            const updatedRecipe = {
                ... recipe,
                ...action.payload.updatedRecipe
            }
            const recipes = [...state.recipes]
            recipes[action.payload.index] = updatedRecipe;

            return {
                ...state,
                recipes: recipes
            };
        case RecipeActions.DELETE_RECIPE:
            const recipesCopy = [...state.recipes];
            recipesCopy.splice(action.payload, 1);

            return {
                ...state,
                recipes: recipesCopy
            };
        
        default:
            return {
                ...state
            };
    }
}
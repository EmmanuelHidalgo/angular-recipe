import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from "../../shared/ingredient.model";

export interface AppState {
    shoppingList: State
}

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

const initialState: State = {
    ingredients: [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10)
      ],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export function shoppingListReducer(state = initialState, action:ShoppingListActions.ShoppingListActions) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex]
            const updateIngredient = { //basically here I overwrite the old ingredient with the new one
                //have in mind, that it overwrites just the same keys 
                ...ingredient,
                ...action.payload.ingredient
            }
            const ingredients = [...state.ingredients]
            ingredients[state.editedIngredientIndex] = updateIngredient

            return {
                ...state,
                ingredients: ingredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        case ShoppingListActions.DELETE_INGREDIENT: 
            const ingredientsCopy = [...state.ingredients]
            ingredientsCopy.splice(state.editedIngredientIndex,1)

            return {
                ...state,
                ingredients: ingredientsCopy,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        case ShoppingListActions.START_EDIT:
            const editedIngredient = state.ingredients[action.payload]

            return{
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: action.payload
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        default:
            return state;
    }
}
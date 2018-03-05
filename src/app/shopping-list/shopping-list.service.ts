import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs/Subject";

//using a subject is a better way to send packages to the subscribers
//thas way we removed the eventEmmiter fomr here
//remeber that subject is an observable and a orbserver at the same time
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>()
    startedEditing = new Subject<number>()
    private ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10)
      ]
    
      getIngredients(){
          return this.ingredients.slice()
      }

      getIngredient(index: number){
        return this.ingredients[index]
      }

      addIgredient(ingredient:Ingredient){
        this.ingredients.push(ingredient)
        this.ingredientsChanged.next(this.ingredients.slice())
      }

      updateIngredient(index:number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient
        this.ingredientsChanged.next(this.ingredients.slice())
      }

      addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients)
        this.ingredientsChanged.next(this.ingredients.slice())
      }

      deleteIngredient(index:number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice())

      }
}
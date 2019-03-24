import {Injectable} from '@angular/core';
import {Recipe} from "./recipes.model";

@Injectable({
    providedIn: 'root'
})
export class RecipesService {

    private recipes: Recipe[] = [
        {
            id: 'id1',
            title: 'Schnitzel',
            imageUrl: 'https://media.blueapron.com/recipes/3376/square_newsletter_images/1539899508-366-0053-3616/1119_2PRE07_Schnitzel_0033_WEB_SQ_hi_res.jpg',
            ingredients: ['French Fries', 'Pork Meat', 'Salad']
        },
        {
            id: 'id2',
            title: 'Spaghetti',
            imageUrl: 'https://www.cookingclassy.com/wp-content/uploads/2018/01/instant-pot-spaghetti-7.jpg',
            ingredients: ['Pasta', 'Meat', 'Tomatoes']
        }
    ];

    constructor() {
    }

    public getAllRecipes(): Recipe[] {
        return [...this.recipes];
    }

    public getRecipe(id: string): Recipe {
        return {
            ...this.recipes.find(recipe => recipe.id === id)
        };
    }
}

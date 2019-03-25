import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipesService} from "../recipes.service";
import {Recipe} from "../recipes.model";
import {AlertController} from "@ionic/angular";

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.page.html',
    styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {

    recipe: Recipe;

    constructor(private recipesService: RecipesService,
                private activatedRoute: ActivatedRoute,
                private alertCtrl: AlertController,
                private route: Router) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(paramMap => {
            if (!paramMap.has('recipeId')) {
                return;
            }

            const recipeId = paramMap.get('recipeId');
            this.recipe = this.recipesService.getRecipe(recipeId);
        });
    }

    onDeleteRecipe() {
        this.alertCtrl.create({
            header: 'Are you sure?',
            message: 'Do you really want to delete the recipe?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Delete',
                    handler: () => {
                        this.recipesService.deleteRecipe(this.recipe.id);
                        this.route.navigate(['/recipes']);
                    }
                }
            ]
        }).then(alertEl => {
            alertEl.present();
        });
    }
}

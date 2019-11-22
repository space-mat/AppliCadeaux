import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ItemService } from '../../services/item.service';

import { Item } from'../../models/Item.models';

@Component({
  selector: 'app-item-single',
  templateUrl: './item-single.component.html',
  styleUrls: ['./item-single.component.scss']
})
export class ItemSingleComponent implements OnInit, OnDestroy {

	singleItem : Item;

	ItemX : Item[];
	itemSubscription : Subscription;

	constructor(private itemService : ItemService, private router : Router, private route : ActivatedRoute) { }

	ngOnInit() {
		this.singleItem = new Item("","","","","",false,0,"");

		const id = this.route // on regarde la route active
				  		.snapshot // à l'instant t
				  		.params["id"]; // on en sort le paramètre id

		this.itemService.getSingleItem(+id).then(
			(item : Item) => {
				this.singleItem = item;
			}
		);

		this.initSubscription();
		
	}

	initSubscription(){
		this.itemSubscription = this.itemService.itemsSubject.subscribe(
			(itemY : Item[]) => {
				this.ItemX = itemY;
			}
		);

		this.itemService.emitItems();
	}

	onEditItem(){
		const id = this.route // on regarde la route active
				  		.snapshot // à l'instant t
				  		.params["id"]; // on en sort le paramètre id

		this.router.navigate(['/self', 'list-edit', id]);
	}

	onDeleteItem(){
		this.itemService.deleteItem(this.singleItem);
		this.router.navigate(['/self', 'list-cadeau']);
	}

	onToggleFav(){

		//Début commentaire
		this.itemService.toggleFav(this.ItemX[this.route.snapshot.params["id"]]);

		this.itemService.getSingleItem(this.route.snapshot.params["id"]).then(
			(item : Item) => {
				this.singleItem = item;
			}
		);
		//Fin commentaire

		//Décommente 
		//this.itemService.toggleFav(this.singleItem);

		//Le "favoris" en question est dans le service item.service.ts


	}

	ngOnDestroy(){
		this.itemSubscription.unsubscribe();
	}
}






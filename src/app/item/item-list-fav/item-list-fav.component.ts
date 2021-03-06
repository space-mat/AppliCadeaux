import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { Router } from '@angular/router';

import { ItemService } from '../../services/item.service';

import { Item } from'../../models/Item.models';


@Component({
  selector: 'app-item-list-fav',
  templateUrl: './item-list-fav.component.html',
  styleUrls: ['./item-list-fav.component.scss']
})
export class ItemListFavComponent implements OnInit, OnDestroy {

	itemsX : Item[];
	itemsSubscription : Subscription ;

	constructor(private itemService : ItemService, private router : Router) { }

	ngOnInit() {
		this.itemsSubscription = this.itemService.itemsSubject.subscribe(
			(itemY : Item[]) => {
				this.itemsX = itemY;
			}
		);

		this.itemService.emitItems();
	}




	onToggleFav(item : Item){
		this.itemService.toggleFav(item);
	}

	onDeleteItem(item : Item){
		this.itemService.deleteItem(item);
	}

	onNewItem(){
		this.router.navigate(['/self', 'new-cadeau']);
	}

	onItemSingle(id : number){
		this.router.navigate(['/self', 'list-cadeau', id]);
	}


	ngOnDestroy(){
		this.itemsSubscription.unsubscribe();
	}

}

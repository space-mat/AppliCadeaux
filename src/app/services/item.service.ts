import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

import { Item } from'../models/Item.models';



@Injectable({
  providedIn: 'root'
})
export class ItemService {

	private items: Item[] = [];
	itemsSubject = new Subject<Item[]>();

	constructor() { 
		this.getItemList();
		this.emitItems();

	}

	emitItems(){
		this.itemsSubject.next(this.items);
	}

	toggleFav(item : Item){
		const itemIndexToToggle = this.items.findIndex(
			(postEl) => {
				if(postEl === item){
					return true;
				}
			}
		);
		//$$$ ici
		if(this.items[itemIndexToToggle].favoris){
			this.items[itemIndexToToggle].favoris = false;
		}
		else{
			this.items[itemIndexToToggle].favoris = true;
		}

		this.saveItemList();
		this.emitItems();
	}

	saveItemList(){
		firebase.database().ref('/itemList').set(this.items);
	}

	getItemList() {
		firebase.database().ref('/itemList').on(
			'value', (data : DataSnapshot) => {
				this.items = data.val() ? data.val() : [];
				this.emitItems();
			}
		);
	}

	getSingleItem(id: number){
		return new Promise(
	  		(resolve, reject) => {
	  			firebase.database().ref('/itemList/'+id).once('value').then(  // Once evenement de type value qui permet de retourner une fois la valeur demandée, à la différence de 'on' qui retourne la valeur à chaque chanchement dans la base
	  				(data) => {
	  					resolve(data.val());
	  				},
	  				(error) => {
	  					reject(error);
	  				}
	  			);
	  		}
	  	);
	}





	deleteItem(item : Item){
		const itemIndexToDelete = this.items.findIndex(
			(postEl) => {
				if(postEl === item){
					return true;
				}
			}
		);

		this.items.splice(itemIndexToDelete, 1);

		this.saveItemList();
		this.emitItems();
	}

	createNewItem(newItem : Item){
		this.items.push(newItem);

		this.saveItemList();
		this.emitItems();
	}



	editItem(id : number, newItem : Item){

		this.items[id] = newItem;

		this.saveItemList();
		this.emitItems();
	}



}



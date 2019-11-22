import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ItemService } from '../../services/item.service';
import { GroupService } from '../../services/group.service';


import { Item } from'../../models/Item.models';
import { Group } from '../../models/Group.models';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit, OnDestroy {

	groupsList : Group[];
	groupsSubscription : Subscription;

	singleItemToEdit : Item;

	itemEditForm : FormGroup;
	errorMessage : string;


	constructor(
				private formBuilder : FormBuilder,
				private itemService : ItemService, 
				private groupService : GroupService,
				private router : Router, 
				private route : ActivatedRoute) { }

	ngOnInit() {
		this.singleItemToEdit = new Item("","","","","",false,0,"");

		const id = this.route // on regarde la route active
				  		.snapshot // à l'instant t
				  		.params["id"]; // on en sort le paramètre id

		this.itemService.getSingleItem(+id).then(
			(item : Item) => {
				this.singleItemToEdit = item;
			}
		);


		this.itemEditForm = this.formBuilder.group(
			{
				name : "",
				notes : "",
				links : "",
				photos : "",
				group : "",
				favoris : false
			}
		);

		this.groupsSubscription = this.groupService.groupsSubject.subscribe(
			(groupY : Group[]) => {
				this.groupsList = groupY;
			}
		);

		this.groupService.emitGroups();
		
	}






	onSaveItem(){
		let name : string;
		if(this.itemEditForm.get("name").value != ""){ name = this.itemEditForm.get("name").value;}
		else{ name = this.singleItemToEdit.name;}

		let notes : string
		if(this.itemEditForm.get("notes").value != ""){notes = this.itemEditForm.get("notes").value;}
		else{notes = this.singleItemToEdit.notes;}

		let links : string
		if(this.itemEditForm.get("links").value != ""){ links = this.itemEditForm.get("links").value;}
		else{ links = this.singleItemToEdit.links;}

		/*if(this.itemEditForm.get("photos").value != ""){const photos = this.itemEditForm.get("photos").value;}
		else{const photos = this.singleItemToEdit.photos;}*/

		let group : string
		if(this.itemEditForm.get("group").value != ""){ group = this.itemEditForm.get("group").value;}
		else{ group = this.singleItemToEdit.group;}

		const photos = "";
		
		const favoris = this.singleItemToEdit.favoris;
		const priority = 0;
		const reservedID = '';

		const itemEdited = new Item(name, notes, links, photos, group, favoris, priority, reservedID);

		this.itemService.editItem(this.route.snapshot.params["id"],itemEdited)
		this.router.navigate(["/self", "list-cadeau", this.route.snapshot.params["id"]]);

	}


	goBack(){
		this.router.navigate(["/self", "list-cadeau", this.route.snapshot.params["id"]]);
	}
	



	ngOnDestroy(){
		this.groupsSubscription.unsubscribe();
	}



}

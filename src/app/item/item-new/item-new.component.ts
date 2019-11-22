import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { ItemService } from '../../services/item.service';
import { GroupService } from '../../services/group.service';


import { Item } from'../../models/Item.models';
import { Group } from '../../models/Group.models';


@Component({
  selector: 'app-item-new',
  templateUrl: './item-new.component.html',
  styleUrls: ['./item-new.component.scss']
})
export class ItemNewComponent implements OnInit, OnDestroy {

	groupsList : Group[];
	groupsSubscription : Subscription;

	itemForm : FormGroup;
	errorMessage : string;

	

	constructor(	
					private formBuilder : FormBuilder, 
					private itemService : ItemService, 
					private groupService : GroupService,
					private router : Router
				) { }

	ngOnInit() {
		this.initListGroup();
		this.initForm();
		
	}

	initForm(){
		this.itemForm = this.formBuilder.group(
			{
				name : ['', Validators.required],
				notes : '',
				links : '',
				photos : '',
				group : 'Autres',
				favoris : false
			}
		);
	}



	initListGroup(){
		this.groupsSubscription = this.groupService.groupsSubject.subscribe(
			(groupY : Group[]) => {
				this.groupsList = groupY;
			}
		);

		this.groupService.emitGroups();
	}



	onSaveItem(){
		const name = this.itemForm.get("name").value;
		const notes = this.itemForm.get("notes").value;
		const links = this.itemForm.get("links").value;
		const photos = this.itemForm.get("photos").value;
		const group = this.itemForm.get("group").value;
		const favoris = this.itemForm.get("favoris").value;
		const priority = 0;
		const reservedID = '';

		const newItem = new Item(name, notes, links, photos, group, favoris, priority, reservedID);

		//console.log(newItem);

		this.itemService.createNewItem(newItem);
		this.router.navigate(["/self", "list-cadeau"]);
	}






	ngOnDestroy(){
		this.groupsSubscription.unsubscribe();
	}
}



  
 
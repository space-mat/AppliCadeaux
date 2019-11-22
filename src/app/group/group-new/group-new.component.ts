import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { GroupService } from '../../services/group.service';

import { Group } from '../../models/Group.models';

@Component({
  selector: 'app-group-new',
  templateUrl: './group-new.component.html',
  styleUrls: ['./group-new.component.scss']
})
export class GroupNewComponent implements OnInit {

	groupForm : FormGroup;
	errorMessage : string;

	constructor(	
					private formBuilder : FormBuilder, 
					private groupService : GroupService, 
					private router : Router
				) { }

	ngOnInit() {
		this.initForm();
	}

	initForm(){
		this.groupForm = this.formBuilder.group(
			{
				name : ['', Validators.required],
				notes : ''
			}
		);
	}

	onSaveGroup(){
		const name = this.groupForm.get("name").value;
		const notes = this.groupForm.get("notes").value;

		const newGroup = new Group(name, notes);

		this.groupService.createNewGroup(newGroup);
		this.router.navigate(["/self", "list-cadeau"]);
	}

}



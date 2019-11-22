import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

import { Group } from '../models/Group.models';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

	private groups : Group[] = [];
	groupsSubject = new Subject<Group[]>();


	constructor() { 
		this.getGroupsList();
		this.emitGroups();
	}

	emitGroups(){
		this.groupsSubject.next(this.groups);
	}

	createNewGroup(newGroup : Group){
		this.groups.push(newGroup);

		this.saveGroupsList();
		this.emitGroups();
	}

	saveGroupsList(){
		firebase.database().ref('/groupsList').set(this.groups);
	}

	getGroupsList() {
		firebase.database().ref('/groupsList').on(
			'value', (data : DataSnapshot) => {
				this.groups = data.val() ? data.val() : [];
				this.emitGroups();
			}
		);
	}

	deleteGroup(group : Group){
		const itemIndexToDelete = this.groups.findIndex(
			(postEl) => {
				if(postEl === group){
					return true;
				}
			}
		);

		this.groups.splice(itemIndexToDelete, 1);

		this.saveGroupsList();
		this.emitGroups();
	}


}



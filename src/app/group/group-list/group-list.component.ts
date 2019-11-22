import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { Router } from '@angular/router';

import { GroupService } from '../../services/group.service';

import { Group } from '../../models/Group.models';


@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})

export class GroupListComponent implements OnInit, OnDestroy {

	groupsX : Group[];
	groupsSubscription : Subscription;

	constructor(private groupService : GroupService, private router : Router) { }

	ngOnInit() {
		this.groupsSubscription = this.groupService.groupsSubject.subscribe(
			(groupY : Group[]) => {
				this.groupsX = groupY;
			}
		);

		this.groupService.emitGroups();
	}

	onNewGroup(){
		this.router.navigate(['/self', 'new-groupe']);
	}

	onDeleteGroup(group : Group){
		this.groupService.deleteGroup(group);
	}


	ngOnDestroy(){
		this.groupsSubscription.unsubscribe();
	}
}









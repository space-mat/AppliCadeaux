import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ItemListFavComponent } from './item/item-list-fav/item-list-fav.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemSingleComponent } from './item/item-single/item-single.component';
import { ItemEditComponent } from './item/item-edit/item-edit.component';
import { ItemNewComponent } from './item/item-new/item-new.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupSingleComponent } from './group/group-single/group-single.component';
import { GroupNewComponent } from './group/group-new/group-new.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FriendInvitComponent } from './friend/friend-invit/friend-invit.component';
import { FriendListComponent } from './friend/friend-list/friend-list.component';
import { HeaderComponent } from './header/header.component';


import { FriendService } from './services/friend.service';
import { GroupService } from './services/group.service';
import { ItemService } from './services/item.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';


const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'self/list-cadeau', canActivate: [AuthGuardService], component: GroupListComponent },
  { path: 'self/list-cadeau/:id', canActivate: [AuthGuardService], component: ItemSingleComponent },
  { path: 'self/list-edit/:id', canActivate: [AuthGuardService], component: ItemEditComponent },
  { path: 'self/new-cadeau', canActivate: [AuthGuardService], component: ItemNewComponent },
  { path: 'self/new-groupe', canActivate: [AuthGuardService], component: GroupNewComponent },
  { path: '', redirectTo: 'self/list-cadeau', pathMatch: 'full' },
  { path: '**', redirectTo: 'self/list-cadeau' }
];


@NgModule({
  declarations: [
  	AppComponent,
    ItemListComponent,
    ItemSingleComponent,
    ItemNewComponent,
    GroupListComponent,
    GroupSingleComponent,
    GroupNewComponent,
    SigninComponent,
    SignupComponent,
    FriendInvitComponent,
    FriendListComponent,
    HeaderComponent,
    ItemListFavComponent,
    ItemEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
  	FriendService,
  	GroupService,
  	ItemService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

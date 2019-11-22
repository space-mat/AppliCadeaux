import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendInvitComponent } from './friend-invit.component';

describe('FriendInvitComponent', () => {
  let component: FriendInvitComponent;
  let fixture: ComponentFixture<FriendInvitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendInvitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendInvitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

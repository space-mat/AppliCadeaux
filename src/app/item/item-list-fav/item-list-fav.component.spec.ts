import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListFavComponent } from './item-list-fav.component';

describe('ItemListFavComponent', () => {
  let component: ItemListFavComponent;
  let fixture: ComponentFixture<ItemListFavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemListFavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

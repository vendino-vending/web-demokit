import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemMenuPage } from './item-menu.page';

describe('ItemMenuPage', () => {
  let component: ItemMenuPage;
  let fixture: ComponentFixture<ItemMenuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

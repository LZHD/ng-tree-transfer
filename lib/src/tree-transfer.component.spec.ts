import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeTransferComponent } from './tree-transfer.component';

describe('TreeTransferComponent', () => {
  let component: TreeTransferComponent;
  let fixture: ComponentFixture<TreeTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

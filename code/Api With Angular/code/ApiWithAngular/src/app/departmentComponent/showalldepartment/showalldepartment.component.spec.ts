import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowalldepartmentComponent } from './showalldepartment.component';

describe('ShowalldepartmentComponent', () => {
  let component: ShowalldepartmentComponent;
  let fixture: ComponentFixture<ShowalldepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowalldepartmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowalldepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

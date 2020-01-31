import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoItemsPage } from './no-items.page';

describe('NoItemsPage', () => {
  let component: NoItemsPage;
  let fixture: ComponentFixture<NoItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoItemsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

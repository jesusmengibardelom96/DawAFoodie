import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginMailPage } from './login-mail.page';

describe('LoginMailPage', () => {
  let component: LoginMailPage;
  let fixture: ComponentFixture<LoginMailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginMailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

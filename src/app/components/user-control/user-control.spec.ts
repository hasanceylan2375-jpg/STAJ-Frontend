import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserControl, UserControlModel } from './user-control';

@Component({
  standalone: true,
  imports: [UserControl],
  template: '<app-user-control [user]="user" [editable]="true" (save)="saved = $event" />'
})
class HostComponent {
  user: UserControlModel = { name: 'Test User', email: 'test@example.com', role: 'User', status: 'active' };
  saved: UserControlModel | undefined;
}

describe('UserControl', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the reusable component', () => {
    expect(fixture.nativeElement.querySelector('.user-control')).toBeTruthy();
  });

  it('should enter edit mode and emit valid data on save', () => {
    const editButton = fixture.nativeElement.querySelector('button');
    editButton.click();
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll('input');
    inputs[0].value = 'Updated User';
    inputs[0].dispatchEvent(new Event('input'));
    fixture.nativeElement.querySelector('.primary').click();
    fixture.detectChanges();
    expect(component.saved?.name).toBe('Updated User');
  });

  it('should show validation error for an invalid email', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[0].click();
    fixture.detectChanges();
    const email = fixture.nativeElement.querySelectorAll('input')[1];
    email.value = 'invalid-email';
    email.dispatchEvent(new Event('input'));
    fixture.nativeElement.querySelector('.primary').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.error')?.textContent).toContain('Geçerli');
  });
});

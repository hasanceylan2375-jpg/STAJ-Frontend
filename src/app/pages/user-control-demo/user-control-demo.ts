import { Component } from '@angular/core';
import { UserControl, UserControlModel } from '../../components/user-control/user-control';

@Component({
  selector: 'app-user-control-demo',
  standalone: true,
  imports: [UserControl],
  templateUrl: './user-control-demo.html',
  styleUrl: './user-control-demo.css'
})
export class UserControlDemo {
  user: UserControlModel = {
    name: 'Hasan Ceylan',
    email: 'hasan@example.com',
    role: 'User',
    status: 'active'
  };

  lastAction = 'Henüz işlem yapılmadı.';

  onSave(value: UserControlModel): void {
    this.user = value;
    this.lastAction = `Kullanıcı güncellendi: ${value.name}`;
  }

  onCancel(): void {
    this.lastAction = 'Düzenleme iptal edildi.';
  }

  onLogout(): void {
    this.lastAction = 'Çıkış işlemi tetiklendi.';
  }
}

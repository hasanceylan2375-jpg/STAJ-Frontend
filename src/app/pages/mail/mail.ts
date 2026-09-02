import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-mail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mail.html',
  styleUrl: './mail.css'
})
export class Mail {
  to = '';
  subject = '';
  body = '';
  message = '';
  sending = false;

  constructor(private mailService: MailService) {}

  send(): void {
    if (!this.to || !this.subject || !this.body) {
      this.message = 'Lütfen tüm alanları doldurun.';
      setTimeout(() => this.message = '', 3000);
      return;
    }

    this.sending = true;
    this.message = '';

    this.mailService.sendMail({ to: this.to, subject: this.subject, body: this.body }).subscribe({
      next: () => {
        this.message = 'Mail başarıyla gönderildi.';
        this.to = '';
        this.subject = '';
        this.body = '';
        this.sending = false;
        setTimeout(() => this.message = '', 3000);
      },
      error: () => {
        this.message = 'Mail gönderilirken bir hata oluştu.';
        this.sending = false;
        setTimeout(() => this.message = '', 3000);
      }
    });
  }
}

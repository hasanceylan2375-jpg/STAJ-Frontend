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
      this.showMessage('Lütfen tüm alanları doldurun.');
      return;
    }

    this.sending = true;
    this.message = '';

    this.mailService.sendMail({ to: this.to, subject: this.subject, body: this.body }).subscribe({
      next: () => {
        this.to = '';
        this.subject = '';
        this.body = '';
        this.sending = false;
        this.showMessage('Mail başarıyla gönderildi.');
      },
      error: () => {
        this.sending = false;
        this.showMessage('Mail gönderilirken bir hata oluştu.');
      }
    });
  }

  private showMessage(text: string): void {
    this.message = text;
    setTimeout(() => this.message = '', 3000);
  }
}

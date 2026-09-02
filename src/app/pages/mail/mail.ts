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
  private messageTimer?: ReturnType<typeof setTimeout>;

  constructor(private mailService: MailService) {}

  send(): void {
    if (this.sending) return;

    if (!this.to || !this.subject || !this.body) {
      this.showMessage('Lütfen tüm alanları doldurun.');
      return;
    }

    const request = { to: this.to, subject: this.subject, body: this.body };
    this.sending = true;
    this.message = '';

    this.mailService.sendMail(request).subscribe({
      error: () => {
        this.sending = false;
        this.showMessage('Mail gönderilirken bir hata oluştu.');
      }
    });

    setTimeout(() => {
      this.to = '';
      this.subject = '';
      this.body = '';
      this.sending = false;
      this.showMessage('Mail başarıyla gönderildi.');
    }, 2000);
  }

  private showMessage(text: string): void {
    if (this.messageTimer) clearTimeout(this.messageTimer);
    this.message = text;
    this.messageTimer = setTimeout(() => this.message = '', 3000);
  }
}

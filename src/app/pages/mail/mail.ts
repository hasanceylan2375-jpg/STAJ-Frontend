import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, timeout } from 'rxjs';
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

    this.sending = true;
    this.message = '';

    this.mailService.sendMail({ to: this.to, subject: this.subject, body: this.body })
      .pipe(
        timeout(60000),
        finalize(() => this.sending = false)
      )
      .subscribe({
        next: () => {
          this.to = '';
          this.subject = '';
          this.body = '';
          this.showMessage('Mail başarıyla gönderildi.');
        },
        error: () => {
          this.showMessage('Mail gönderilirken bir hata oluştu.');
        }
      });
  }

  private showMessage(text: string): void {
    if (this.messageTimer) clearTimeout(this.messageTimer);
    this.message = text;
    this.messageTimer = setTimeout(() => this.message = '', 3000);
  }
}

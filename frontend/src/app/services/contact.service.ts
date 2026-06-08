import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import emailjs from '@emailjs/browser';
import { environment } from 'src/environments/environment';

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
  recaptchaToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  sendEmail(contactData: ContactRequest): Observable<any> {
    const templateParams = {
      from_name: contactData.name,
      reply_to: contactData.email,
      message: contactData.message,
      // Extra fields depending on how the template is configured
      name: contactData.name,
      email: contactData.email,
      'g-recaptcha-response': contactData.recaptchaToken
    };

    const promise = emailjs.send(
      environment.emailjs.serviceId,
      environment.emailjs.templateId,
      templateParams,
      environment.emailjs.publicKey
    );

    return from(promise);
  }
}
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService, ContactRequest } from 'src/app/services/contact.service';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone : true,
  imports: [ReactiveFormsModule, CommonModule, RecaptchaModule, RecaptchaFormsModule]
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitted = false;
  isLoading = false;
  siteKey = environment.recaptcha.siteKey;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    public el: ElementRef
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      recaptchaToken: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields in the template
  get formControls() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.contactForm.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    const formData: ContactRequest = this.contactForm.value;

    this.contactService.sendEmail(formData).subscribe({
      next: () => {
        alert('Message sent successfully!');
        this.contactForm.reset();
        this.isSubmitted = false;
      },
      error: () => {
        alert('Failed to send message. Please try again later.');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
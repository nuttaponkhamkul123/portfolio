import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  isSubmitted = false;
  constructor(public el: ElementRef, private fb: FormBuilder) { }



  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Getter for easy access to form controls in the template
  get formControls() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    console.log('Form Submitted!', this.contactForm.value);
    // Here you would typically send the form data to a backend service
    // For example: this.http.post('api/contact', this.contactForm.value).subscribe();

    alert('Thank you for your message!');
    this.contactForm.reset();
    this.isSubmitted = false;
  }
}

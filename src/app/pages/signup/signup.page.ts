import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  formData: { [key: string]: string } = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  errors: any = {};

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  updateFormData(field: string, value: string) {
    this.formData[field] = value;
    if (this.errors[field]) {
      this.errors[field] = '';
    }
  }

  validateForm() {
    this.errors = {};

    if (!this.formData.displayName.trim()) {
      this.errors.displayName = 'Display name is required';
    } else if (this.formData.displayName.trim().length < 2) {
      this.errors.displayName = 'Display name must be at least 2 characters';
    }

    if (!this.formData.email.trim()) {
      this.errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(this.formData.email)) {
      this.errors.email = 'Please enter a valid email';
    }

    if (!this.formData.password.trim()) {
      this.errors.password = 'Password is required';
    } else if (this.formData.password.length < 6) {
      this.errors.password = 'Password must be at least 6 characters';
    }

    if (!this.formData.confirmPassword.trim()) {
      this.errors.confirmPassword = 'Please confirm your password';
    } else if (this.formData.password !== this.formData.confirmPassword) {
      this.errors.confirmPassword = 'Passwords do not match';
    }

    return Object.keys(this.errors).length === 0;
  }

  async handleSignup() {
    if (!this.validateForm()) return;

    const loading = await this.loadingController.create({
      message: 'Creating your account...',
    });
    await loading.present();

    try {
      // TODO: Implement Firebase authentication
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await loading.dismiss();
      
      const alert = await this.alertController.create({
        header: 'Account Created!',
        message: 'Your account has been created successfully.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/room-selection']);
            }
          }
        ]
      });
      await alert.present();
    } catch (error) {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Failed to create account. Please try again.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  errors: any = {};

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  validateForm() {
    this.errors = {};

    if (!this.email.trim()) {
      this.errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(this.email)) {
      this.errors.email = 'Please enter a valid email';
    }

    if (!this.password.trim()) {
      this.errors.password = 'Password is required';
    } else if (this.password.length < 6) {
      this.errors.password = 'Password must be at least 6 characters';
    }

    return Object.keys(this.errors).length === 0;
  }

  async handleLogin() {
    if (!this.validateForm()) return;

    const loading = await this.loadingController.create({
      message: 'Signing you in...',
    });
    await loading.present();

    try {
      // TODO: Implement Firebase authentication
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await loading.dismiss();
      this.router.navigate(['/room-selection']);
    } catch (error) {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Failed to sign in. Please try again.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async handleForgotPassword() {
    const alert = await this.alertController.create({
      header: 'Forgot Password',
      message: 'Password reset functionality will be implemented with Firebase.',
      buttons: ['OK']
    });
    await alert.present();
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

}

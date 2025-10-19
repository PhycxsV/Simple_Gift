import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-room-selection',
  templateUrl: './room-selection.page.html',
  styleUrls: ['./room-selection.page.scss'],
})
export class RoomSelectionPage implements OnInit {
  roomName: string = '';
  roomCode: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async handleCreateRoom() {
    if (!this.roomName.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please enter a room name',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Creating room...',
    });
    await loading.present();

    try {
      // TODO: Implement Firebase room creation
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      await loading.dismiss();
      
      const alert = await this.alertController.create({
        header: 'Room Created!',
        message: `Your room "${this.roomName}" has been created.\n\nRoom Code: ${generatedCode}\n\nShare this code with your partner to join the room.`,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.roomName = '';
              this.router.navigate(['/room-dashboard'], {
                queryParams: {
                  roomName: this.roomName,
                  roomCode: generatedCode,
                  isOwner: true
                }
              });
            }
          }
        ]
      });
      await alert.present();
    } catch (error) {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Failed to create room. Please try again.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async handleJoinRoom() {
    if (!this.roomCode.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please enter a room code',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Joining room...',
    });
    await loading.present();

    try {
      // TODO: Implement Firebase room joining
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await loading.dismiss();
      
      const alert = await this.alertController.create({
        header: 'Room Joined!',
        message: 'You have successfully joined the room.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.roomCode = '';
              this.router.navigate(['/room-dashboard'], {
                queryParams: {
                  roomName: 'Love Room',
                  roomCode: this.roomCode,
                  isOwner: false
                }
              });
            }
          }
        ]
      });
      await alert.present();
    } catch (error) {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Invalid room code or room not found.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async handleLogout() {
    const alert = await this.alertController.create({
      header: 'Sign Out',
      message: 'Are you sure you want to sign out?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Sign Out',
          role: 'destructive',
          handler: () => {
            this.router.navigate(['/welcome']);
          }
        }
      ]
    });
    await alert.present();
  }

}

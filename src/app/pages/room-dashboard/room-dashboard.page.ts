import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-dashboard',
  templateUrl: './room-dashboard.page.html',
  styleUrls: ['./room-dashboard.page.scss'],
})
export class RoomDashboardPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/room-selection']);
  }

}

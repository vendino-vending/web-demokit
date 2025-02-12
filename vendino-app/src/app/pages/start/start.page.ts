import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: false
})
export class StartPage {
  constructor(private router: Router) {}

  navigateToItemMenu(event: MouseEvent) {
    const buffer = 50; // Corner buffer zone (50px from each edge)
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const x = event.clientX;
    const y = event.clientY;

    if (x > buffer && x < screenWidth - buffer && y > buffer && y < screenHeight - buffer) {
      this.router.navigate(['/item-menu']);
    }
  }
}

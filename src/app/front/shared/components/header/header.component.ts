import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    MatAnchor
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}

import { Component } from '@angular/core';
import {HeaderComponent} from "./shared/components/header/header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-front',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './front.component.html',
  styleUrl: './front.component.scss'
})
export class FrontComponent {

}

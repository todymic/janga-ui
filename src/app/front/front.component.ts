import {Component, OnChanges, signal, SimpleChanges, WritableSignal} from '@angular/core';
import {HeaderComponent} from "./shared/components/header/header.component";
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "@shared/components/footer/footer.component";

@Component({
  selector: 'app-front',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './front.component.html',
  styleUrl: './front.component.scss'
})
export class FrontComponent {

}

import { Component } from '@angular/core';
import {HeaderComponent} from "./shared/components/header/header.component";
import {FooterComponent} from "./shared/components/footer/footer.component";
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "./shared/components/sidebar/sidebar.component";
import {LoaderComponent} from "@admin/features/loader/loader.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    SidebarComponent,
    LoaderComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  opened!: boolean;

  constructor() {
  }

  onToggleMenuClicked($event: boolean) {
    this.opened = $event;
  }
}

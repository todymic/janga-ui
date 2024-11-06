import {Component, inject, ViewEncapsulation} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {LoaderService} from "@admin/core/services/loader.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LoaderComponent {
  constructor(protected loading: LoaderService) {
  }

}

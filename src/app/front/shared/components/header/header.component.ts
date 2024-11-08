import {Component, computed, inject, model, OnChanges, signal, SimpleChanges} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatAnchor} from "@angular/material/button";
import {PatientAuthService} from "@core/services/patient-auth.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    MatAnchor,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  // private _authService = inject(PatientAuthService);

  constructor(private _authService: PatientAuthService) {
  }

  showLoginLink = computed(() => !this._authService.isAuthenticated())

  logout() {
    this._authService.logout();
  }


}

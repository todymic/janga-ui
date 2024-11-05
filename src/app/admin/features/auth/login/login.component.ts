import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardTitle
} from "@angular/material/card";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BaseFormService} from "@admin/core/services/base-form.service";
import {PatientAuthService} from "@core/services/patient-auth.service";
import {Router, RouterLink} from "@angular/router";
import {Control} from "@core/utilities/type";
import {Login} from "@core/models";
import {LoginRequest} from "@core/services/interface/login-request";
import {AdminAuthService} from "@admin/core/services/admin-auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  protected formService: BaseFormService = inject(BaseFormService);
  private _authService = inject(AdminAuthService);
  private _router = inject(Router);

  isHide: boolean  = true;

  loginGroup!: FormGroup<Control<Login>>;

  ngOnInit(): void {

    this.loginGroup = this.formService.formBuilder.group<Control<Login>>({
      email: this.formService.formBuilder.control<string>('', [Validators.required, Validators.email]),
      password: this.formService.formBuilder.control<string>('', [Validators.required]),
    })

    this.formService.formGroup = this.loginGroup;

  }

  async onSubmit($event: any) {

    const formValues: Partial<LoginRequest> = this.loginGroup.value;

    this._authService.login(formValues as LoginRequest)
      .subscribe((response) => {
        if(this._authService.isAuthenticated()) {
          this._router.navigate(['admin', 'index'])
        }
      });

  }

}

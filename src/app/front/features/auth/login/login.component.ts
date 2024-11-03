import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {BaseFormService} from "../../../../admin/core/services/base-form.service";
import {Login} from "@core/models";
import {Control} from "@core/utilities/type";
import {AuthService} from "@core/services/auth.service";
import {LoginRequest} from "@core/services/interface/login-request";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  protected formService: BaseFormService = inject(BaseFormService);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  // private _hide: WritableSignal<boolean> = signal<boolean>(true);
  // isHide = computed(() => this._hide());

  isHide: boolean  = true;

  loginGroup!: FormGroup<Control<Login>>;

  ngOnInit(): void {

    this.loginGroup = this.formService.formBuilder.group<Control<Login>>({
      email: this.formService.formBuilder.control<string>('', [Validators.required, Validators.email]),
      password: this.formService.formBuilder.control<string>('', [Validators.required]),
    })

    this.formService.formGroup = this.loginGroup;

  }

  // onHide() {
  //   // his._hide.set(!this._hide());
  //   this
  // }


  async onSubmit($event: any) {

    const formValues: Partial<LoginRequest> = this.loginGroup.value;
    this._authService.login(formValues as LoginRequest)
      .subscribe((response) => {
        if(this._authService.isAuthenticated()) {
          this._router.navigate(['/'])
        }
      });

  }
}

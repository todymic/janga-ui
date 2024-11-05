import {Component, inject, OnInit} from '@angular/core';
import {BaseFormService} from "@admin/core/services/base-form.service";
import {AdminAuthService} from "@admin/core/services/admin-auth.service";
import {Router} from "@angular/router";
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
import {Control} from "@core/utilities/type";
import {Login} from "@core/models";
import {User} from "@admin/core/interfaces/user.interface";
import {EditorComponent} from "@tinymce/tinymce-angular";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-register',
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
    EditorComponent,
    MatCheckbox
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  protected _formService: BaseFormService = inject(BaseFormService);
  protected _authService = inject(AdminAuthService);
  protected _router = inject(Router);
  registerGroup!: FormGroup<Control<User>>;
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount'
  };

  ngOnInit(): void {

    this.registerGroup = this._formService.formBuilder.group<Control<User>>({
      firstname: this._formService.formBuilder.control<string>('', [Validators.required]),
      lastname: this._formService.formBuilder.control<string>('', [Validators.required]),
      email: this._formService.formBuilder.control<string>('', [Validators.required, Validators.email]),
      description: this._formService.formBuilder.control<string>(''),
      password: this._formService.formBuilder.control<string>('', [Validators.required])
    })
    this._formService.formGroup = this.registerGroup;

  }


  onSubmit($event: any) {

    const register = this.registerGroup.value;
    this._authService.register(register).subscribe(() => {
      this._router.navigate(['admin', 'dashboard']).then();
    });
  }
}

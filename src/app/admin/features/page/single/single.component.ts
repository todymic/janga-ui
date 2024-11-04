import {Component, inject, OnInit} from '@angular/core';
import {BaseFormService} from "../../../core/services/base-form.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {SinglePageInterface} from "../../../core/interfaces/single_page.interface";
import {Practitioner} from "@admin/core/interfaces/practitioner.interface";
import {Control} from "@core/utilities/type";
import {Login} from "@core/models";
import {Model} from "@core/models/interface/model.interface";

@Component({
  selector: 'app-single',
  standalone: true,
  imports: [],
  templateUrl: './single.component.html',
  styleUrl: './single.component.scss'
})
export class SingleComponent<T extends Model> implements OnInit {
  protected formService: BaseFormService = inject(BaseFormService);
  protected singleFormGroup!: FormGroup<Control<T>>;

  protected _route: ActivatedRoute = inject(ActivatedRoute);
  protected _router: Router = inject(Router);
  protected _initialValue: any = {}

  isEditContext: boolean = false;

  currentId!: number;

  ngOnInit(): void {
    this.singleFormGroup = this.formService.formGroup;
    // Edit Context - get current id
    this.currentId = this._route.snapshot.params['id'] as number;

  }

}

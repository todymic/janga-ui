import {Component, inject, OnInit} from '@angular/core';
import {BaseFormService} from "../../../core/services/base-form.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {SinglePageInterface} from "../../../core/interfaces/single_page.interface";

@Component({
  selector: 'app-single',
  standalone: true,
  imports: [],
  templateUrl: './single.component.html',
  styleUrl: './single.component.scss'
})
export class SingleComponent implements OnInit {
  protected formService: BaseFormService = inject(BaseFormService);
  protected singleFormGroup!: FormGroup;

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

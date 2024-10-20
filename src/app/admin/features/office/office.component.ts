import {Component, inject, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule, Validators} from "@angular/forms";
import {OfficeService} from "../../core/services/office.service";
import {MatButton} from "@angular/material/button";
import {SingleComponent} from "../page/single/single.component";

@Component({
  selector: 'app-office',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButton,
  ],
  templateUrl: './office.component.html',
  styleUrl: './office.component.scss'
})
export class OfficeComponent extends SingleComponent implements OnInit {

  officeService: OfficeService = inject(OfficeService);

  override ngOnInit(): void {

    // form group
    this.formService.formGroup = this.formService.formBuilder.group({
      name: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      country: ['', Validators.required]
    });

    super.ngOnInit();

    if (this.currentId) {
      this.officeService.getOne(this.currentId).subscribe((office) => {
        this.singleFormGroup.patchValue(office);
        this.isEditContext = true;
        this._initialValue = office;
      });
    }

  }

  onSubmit($event: Event) {

    let office = this.singleFormGroup.value;

    if (!this.isEditContext) { // CREATE context

      this.officeService.create(office).subscribe(() => {

        this.formService.snackBar.open({
          content: 'Office successfully created!!'
        });

        this._router.navigate(['admin', 'offices']).then();
      })

    } else {

      // EDIT context
      office.id = this.currentId;

      this.officeService.update(office).subscribe(() => {

        this.formService.snackBar.open({
          content: 'Office successfully updated!!'
        });

        this._router.navigate(['admin', 'offices']).then();
      })

    }
  }

  onReset(): void {
    this.singleFormGroup.reset(this._initialValue)
  }

  onRemove() {

    this.formService.dialog.confirm({
      title: 'Confirm delete',
      content: 'Are you really sure to delete this item?'
    })
      .subscribe((confirm: boolean) => {

        if (confirm) {
          this.officeService.delete(this.currentId).subscribe(() => {

            this.formService.snackBar.open({
              content: 'Office successfully deleted'
            });

            this._router.navigate(['admin', 'offices']).then();
          })
        }

      })


  }


}

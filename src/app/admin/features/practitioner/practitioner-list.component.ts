import {AfterViewInit, Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource, MatTableModule} from "@angular/material/table";
import {PractitionerService} from "../../core/services/practitioner.service";
import {Practitioner, Practitioner as IPractitioner} from "../../core/interfaces/practitioner.interface";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {ListComponent} from "../page/list/list.component";

@Component({
  selector: 'app-practitioner',
  standalone: true,
  imports: [
    MatTable,
    MatInput,
    MatSortModule,
    MatSort,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule, MatPaginator, MatButton, MatAnchor, RouterLink, MatIconButton, MatIcon
  ],
  templateUrl: '../page/list/list.component.html',
  styleUrl: './practitioner-list.component.scss'
})

export class PractitionerListComponent extends ListComponent {
  override displayedColumns: string[] = ['id', 'lastname', 'firstname', 'email', 'active', 'action'];
  private _practitionerService = inject(PractitionerService);

  constructor(private route: Router) {
    super()
    this._practitionerService.getAll().subscribe({
      next: (practitioner: Practitioner[]) => this.dataSource.data = practitioner,
      error: err => console.log(err)
    })
  }

  override onEdit(id: number) {
    this.route.navigate(['admin', 'practitioners', 'edit', id]).then();
  }

  override onRemove(id: number) {
    this._dialog.confirm({
      title: "Confirm delete",
      content: "Are you sure to delete this practitioner"
    }).subscribe({
      next: (confirm: boolean) => {

        if (confirm) {

          this._practitionerService.delete(id).subscribe({
            next: () => {
              this._snackBar.open({content: "Practitioner was successfully deleted"})
              this.route.navigate(['admin', 'practitioners']).then();
            }
          })
        }

      }
    })
  }

  override onCreate() {
    this.route.navigate(['admin', 'practitioners', 'new']).then();
  }
}

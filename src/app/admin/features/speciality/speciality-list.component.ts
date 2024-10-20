import {Component, inject, OnInit} from '@angular/core';
import {ListComponent} from "../page/list/list.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTable, MatTableModule} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {SpecialityService} from "../../core/services/speciality.service";
import {Speciality} from "../../core/interfaces/speciality.interface";

@Component({
  selector: 'app-speciality-list',
  standalone: true,
  imports: [
    MatButton,
    MatTableModule,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatPaginator,
    MatSort,
    MatSortHeader,
    MatTable
  ],
  templateUrl: '../page/list/list.component.html',
  styleUrl: './speciality-list.component.scss'
})
export class SpecialityListComponent extends ListComponent implements OnInit {
  override displayedColumns: string[] = ['id', 'name', 'action'];
  private _specialityService: SpecialityService = inject(SpecialityService)

  ngOnInit(): void {
    this.getAllData();
  }

  private getAllData() {
    this._specialityService.getAll().subscribe((specialities: Speciality[]) => this.dataSource.data = specialities);
  }

  override onEdit(id: number) {
    this._router.navigate(["admin", "specialities", "edit", id]).then()
  }

  override onCreate() {
    this._router.navigate(["admin", "specialities", "new"]).then()
  }

  override onRemove(id: number) {
    this._dialog.confirm({
      title: "Confirm delete",
      content: "Are you sure to delete this speciality?"
    }).subscribe((confirm: boolean) => {

      if (confirm) {

        this._specialityService
          .delete(id)
          .subscribe(() => {
            this._snackBar.open({content: "Speciality successfully deleted!"});
            this.getAllData();
          })

      }

    })
  }

}

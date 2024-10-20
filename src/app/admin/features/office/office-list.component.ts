import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {OfficeService} from "../../core/services/office.service";
import {ListComponent} from "../page/list/list.component";

@Component({
  selector: 'app-office-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTable,
    MatInput,
    MatSortModule,
    MatSort,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginator,
    MatButton,
    MatAnchor,
    RouterLink, MatIconButton, MatIcon],
  templateUrl: '../page/list/list.component.html',
  styleUrl: './office-list.component.scss',

})

export class OfficeListComponent extends ListComponent {
  override displayedColumns: string[] = ['id', 'name', 'street', 'city', 'country', 'action'];
  officeService: OfficeService = inject(OfficeService);

  constructor() {
    super();
    this.officeService.getAll().subscribe(offices => this.dataSource.data = offices)
  }
  override onCreate() {
    this._router.navigate(['admin', 'offices', 'new']).then();
  }

  override onEdit(id: number) {
    this._router.navigate(['admin', 'offices', 'edit', id]).then();
  }

  override onRemove(id: number) {
    this._dialog.confirm({
      title: "Confirm delete?",
      content: "Are you sur to delete this office?"
    }).subscribe((confirm: boolean) => {
      if (confirm) {
        this.officeService
          .delete(id)
          .subscribe(() => {
            this._snackBar.open({content: "office successfully deleted!!"});
            this.officeService.getAll().subscribe(offices => this.dataSource.data = offices)

          })
      }
    })
  }

}

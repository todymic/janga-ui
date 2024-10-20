import {AfterViewInit, Component, inject, input, ViewChild} from "@angular/core";
import {
  MatTable, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {ConfirmDialogService} from "../../../core/services/confirm-dialog.service";
import {SnackbarService} from "../../../core/services/snackbar.service";
import {Router, RouterOutlet} from "@angular/router";
import {ListPageInterface} from "../../../core/interfaces/list_page.interface";



@Component({
  selector: 'app-list',
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
    MatTable,
    RouterOutlet
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements AfterViewInit, ListPageInterface {
  displayedColumns!: string[];
  dataSource = new MatTableDataSource();
  protected _dialog: ConfirmDialogService = inject(ConfirmDialogService);
  protected _snackBar: SnackbarService = inject(SnackbarService);
  protected _router: Router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onCreate(): void {
  }

  onEdit(id: number): void {
  }

  onRemove(id: number): void {
  }

  protected readonly input = input;
}

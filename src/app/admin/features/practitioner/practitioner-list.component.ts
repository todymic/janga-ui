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
  templateUrl: './practitioner-list.component.html',
  styleUrl: './practitioner-list.component.scss'
})

export class PractitionerListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'email', 'active', 'action'];
  dataSource: MatTableDataSource<IPractitioner> = new MatTableDataSource();
  practitionerService = inject(PractitionerService);
  @Input() linkDetail: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private route: Router) {
    this.practitionerService.getAll().subscribe({
      next: res => this.dataSource.data = res,
      error: err => console.log(err)
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onEditingPractitioner(practitioner: Practitioner) {
    this.route.navigate(['admin', 'practitioners', 'edit', practitioner.id]).then();
  }

  onRemovingPractitioner(practitioner: Practitioner){

  }
}

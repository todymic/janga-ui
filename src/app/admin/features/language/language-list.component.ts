import {Component, inject, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatTable, MatTableModule
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {Language} from "../../core/interfaces/language.interface";
import {LanguageService} from "../../core/services/language.service";
import {ListComponent} from "../page/list/list.component";

@Component({
  selector: 'app-language-list',
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
  styleUrl: './language-list.component.scss'
})
export class LanguageListComponent extends ListComponent implements OnInit {
  override displayedColumns: string[] = ['id', 'name', 'code', 'action'];
  private _languageService: LanguageService = inject(LanguageService);

  ngOnInit(): void {
    this._languageService.getAll().subscribe((languages: Language[]) => this.dataSource.data = languages)
  }

  override onEdit(id: number) {
    this._router.navigate(["admin", "languages", "edit", id]).then();
  }

  override onRemove(id: number) {

    this._dialog.confirm({
      title: "Confirm delete",
      content: "Are you sure to delete this language?"
    }).subscribe((confirm: boolean) => {

      if (confirm) {
        this._languageService.delete(id).subscribe(() => {
          this._snackBar.open({content: "Language successfully deleted"})
          this._languageService.getAll().subscribe((languages: Language[]) => this.dataSource.data = languages);
        })
      }
    })
  }

  override onCreate() {
    this._router.navigate(["admin", "languages", "new"]).then();
  }
}

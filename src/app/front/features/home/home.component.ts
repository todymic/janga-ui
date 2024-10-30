import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {SearchComponent} from "../../shared/components/search/search.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    SearchComponent,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
  }


}

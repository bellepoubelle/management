import { Component, OnInit } from '@angular/core';
import { Addresse } from "./addresse";
import { AddresseService } from "../addresse.service";


@Component({
  selector: 'app-addresse',
  templateUrl: './addresse.component.html',
  styleUrls: ['./addresse.component.scss']
})
export class AddresseComponent implements OnInit {
  addresse: Addresse;
  constructor(private addresseService: AddresseService) { }

  ngOnInit() {

  }

  getAddresseById(id: number): void {
    this.addresseService.getAddresseById(id).subscribe(addresse => this.addresse = addresse)
  }
}

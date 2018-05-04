import { Component, Input } from '@angular/core';
import { Addresse } from '../addresse/addresse';
import { AddresseService } from "../addresse.service";

@Component({
  selector: 'app-adresse-by-id',
  templateUrl: './adresse-by-id.component.html',
  styleUrls: ['./adresse-by-id.component.scss']
})
export class AdresseByIdComponent {
  @Input() id: number;
  f = Array(4000);
  addresse;
  constructor(private addresseService: AddresseService) { }

  showAddresse(id: number) {
    if (this.f[id] != 1) {
      this.f[id] = 1;
      var addr = this.addresseService.getAddresseById(id).subscribe(addresse => {
        this.addresseService.log('showAddresse : ' + id);
        if (addresse.roadNumber == '')
          this.addresse = addresse.road
        else
          this.addresse = addresse.roadNumber + ' ' + addresse.road;
      })

    }

  }
}
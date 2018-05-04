import { Component, OnInit } from '@angular/core';
import { Alerte } from "./alerte";
import { AlerteService } from "../alerte.service";

@Component({
  selector: 'app-alerte',
  templateUrl: './alerte.component.html',
  styleUrls: ['./alerte.component.scss']
})
export class AlerteComponent implements OnInit {

  alertes: Alerte[];
  constructor(private alerteService: AlerteService) { }

  ngOnInit() {
    this.getAlertes();
  }

  getAlertes(): void {
    this.alerteService.getAlertes().subscribe(alertes => this.alertes = alertes)
  }

  changeDeleted(alerte: Alerte): void {
    this.alerteService.log("deleted");
    alerte.deleted = !alerte.deleted;
    this.alerteService.changeAlertes(alerte);
  }
  changeFavorite(alerte: Alerte): void {
    this.alerteService.log("favorite");
    alerte.favored = !alerte.favored;
    this.alerteService.changeAlertes(alerte);
  }
  changeChecked(alerte: Alerte): void {
    this.alerteService.log("checked");
    alerte.checked = !alerte.checked;
    this.alerteService.changeAlertes(alerte);
  }

}

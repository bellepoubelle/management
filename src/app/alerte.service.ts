import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { MessageService } from "./message.service";
import { Alerte } from "./alerte/alerte";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { of } from 'rxjs/observable/of';

@Injectable()
export class AlerteService {

    private alertesUrl = 'https://api.bellepoubelle.fr/rest/v1.0/alerts';

    constructor(private http: HttpClient,
        private messageService: MessageService) { }

    getAlertes(): Observable<Alerte[]> {
        this.log("Alerteget: je ne sais pas quoi ecrire");
        return this.http.get<Alerte[]>(this.alertesUrl)
    }

    changeAlertes(alerte: Alerte): void {
        this.messageService.add("Alertechangeessaie");

        this.http.put('https://api.bellepoubelle.fr/rest/v1.0/alerts/' + alerte.id, alerte, {
            headers: { 'Content-Type': 'application/json' }
        }).subscribe(data => {
            this.messageService.add("Successfully changed.");
        },
            error => {
                this.messageService.add("Oops! Problem with changing." + error.error.message + error + error);
            }
        )
    }

    log(message: string) {
        this.messageService.add('AlerteService: ' + message);
    }

}

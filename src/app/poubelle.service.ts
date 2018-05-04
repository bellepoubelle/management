import { Injectable } from '@angular/core';
import { Poubelle } from "./poubelle/poubelle";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class PoubelleService {

    private poubellesUrl = 'https://api.bellepoubelle.fr/rest/v1.0/poubelles';

    constructor(private http: HttpClient,
        private messageService: MessageService) { }

    getPoubelles(): Observable<Poubelle[]> {
        this.log("Poubelle: je ne sais pas quoi ecrire");
        return this.http.get<Poubelle[]>(this.poubellesUrl)
    }

    log(message: string) {
        this.messageService.add('PoubelleService: ' + message);
    }

}

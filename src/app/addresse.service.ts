import { Injectable } from '@angular/core';
import { Addresse } from './addresse/addresse';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AddresseService {

    private addresseUrl = 'https://api.bellepoubelle.fr/rest/v1.0/addresses/';

    constructor(private http: HttpClient,
        private messageService: MessageService) { }

    getAddresseById(id: number): Observable<Addresse> {
        this.log("get Addresse by ID" + id);
        return this.http.get<Addresse>(this.addresseUrl + id.toString())
    }


    log(message: string) {
        this.messageService.add('addresse service: ' + message);
    }

}

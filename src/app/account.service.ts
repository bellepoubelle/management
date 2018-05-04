import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

import {Observable} from 'rxjs';
//import Events = NodeJS.Events;
//import {Storage} from "googleapis/build/src/apis/storage/v1";

import {Account} from "./account/account";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";

@Injectable()
export class AccountService {

    private HAS_LOGGED_IN: string = 'hasLoggedIn';
    private ENDPOINT: string = "accounts/";

    private URL: string = 'https://api.bellepoubelle.fr/rest/v1.0/';

    constructor(
       // public events: Events,
     //   public storage: $window.localStorage,
        public http: HttpClient,
       // public api: API,
        private messageService: MessageService
    ) {
    }

    /*public getAll(): Observable<Account[]> {
        return this.api.get(this.ENDPOINT).map((response) => response); //TODO here json g=for the second yaya
            }
*/

    public get(id?: number): /*Observable<Account>*/void {
        if (id) {
      //      return this.api.get(this.ENDPOINT + id).map((response) => response);
        } else {
      //      return this.api.get(this.ENDPOINT + "me").map((response) => response);
        }
    }

    create(account: Account) {
        this.messageService.add("tryingtocreate");
        var token = window.btoa(account.email + ":" + account.password);
        this.http.post('https://api.bellepoubelle.fr/rest/v1.0/accounts/', account, {
            headers: { 'Content-Type':  'application/json'}
        }).subscribe(data => {
                this.messageService.add("Successfully created.");
            },
            error => {
                this.messageService.add("Oops! Problem with creating."+error.error.message+error+error);
            }
        );
    }

    update(reading: Account) {
    /*    this.api.put(this.ENDPOINT + reading.id, JSON.stringify(reading)).subscribe((data) => {
                console.log("Successfully updated.");
            },
            (err: Error) => {
                console.log("Oops! Problem with updating.");
            }
        );*/
    }

    delete(id: number) {
        /*this.api.delete(this.ENDPOINT + id).subscribe((data: Response) => { //TODO i deleted the map hehe                console.log("Successfully deleted.");
            },
            (err: Error) => {
                console.log("Oops! Problem with deleting.");
            }
        );*/
    }

    public hasLoggedIn(): Promise<boolean> {
        return localStorage.get(this.HAS_LOGGED_IN).then((value: boolean) => {
            return value === true;
        });
    };

    public login(email: string, password: string): void {
        this.messageService.add("tryingtologin");
        var token = window.btoa(email + ":" + password);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Basic ${token}'
            })
        };
        this.http.get('https://api.bellepoubelle.fr/rest/v1.0/accounts/',{
            headers: { 'Content-Type':  'application/json',
                'Authorization': 'Basic '+token}
        }).subscribe(data => {
                this.messageService.add("couldtologin");
                localStorage.set(this.HAS_LOGGED_IN, true);
                localStorage.set('token', token);
                localStorage.publish('accout:login');
            },
            error => {
                this.messageService.add("failedtologin"+error.error.message+error.error);
                localStorage.publish('account:loginfail');
            }
        );
    };

    public logout(): void {
        localStorage.remove(this.HAS_LOGGED_IN);
        localStorage.remove('token');
        localStorage.publish('account:logout');
    };

}

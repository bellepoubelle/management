import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Account } from "../account/account";
import { AccountService } from "../account.service";
import { MessageService } from "../message.service";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

    HAS_LOGGED_IN: string = 'hasLoggedIn';

    account: Account = {
        email: "fatima.mezidi@gmail.com",
        password: 'HAHAHAhahaha!1',
        operator: 1,
        role: "regUser"
    };

    submitted: boolean = false;
    constructor(
        public accountService: AccountService,
        private messageService: MessageService
    ) {
    }

    ionViewDidEnter() {
        this.accountService.hasLoggedIn().then((hasLoggedIn) => {
            if (hasLoggedIn) {
                //this.navCtrl.push(TabsPage);
            }
        });
    }

    onLogin(email: string, pwd: string) {
        this.messageService.add("onlogin" + email + pwd);
        this.submitted = true;
        this.accountService.login(email, pwd);
    }

    onSignup() {
        this.messageService.add("onsignup" + this.account.email);
        this.submitted = true;
        this.accountService.create(this.account);
    }

    ngOnInit(): void {
    }
}

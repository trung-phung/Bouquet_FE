import { Component, Inject } from "@angular/core";

import { DOCUMENT } from "@angular/common";
import { FormBuilder } from '@angular/forms';
import { error } from "console";
import { MessageService } from "./message";


@Component({
    selector: 'message',
    templateUrl: './message.component.html',
    // styleUrls: ['./auth.component.scss'],
})
export class MessageComponent {
    constructor(private service: MessageService, private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document) { };
    data: any

    checkoutForm = this.formBuilder.group({
        message: '',

    });
    user: any;
    submitted: boolean;
    rememberMe: boolean;

    ngOnInit(): void {
        this.getRole()
        this.getAll()
    }
    getRole() {
        if (JSON.parse(window.atob(localStorage.getItem("token").split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] != "Admin") {
            this.document.location.href = "http://localhost:4200/pages/bouquet"
        };
    }


    getAll() {
        // Process checkout data here
        this.service.getAll().subscribe(
            data => {
                console.log(data)
                this.data = data
            }, error => {
                if (error.status == 401 || error.status == 403) {
                    localStorage.setItem("token", null)
                    this.document.location.href = "http://localhost:4200/auth/login"
                }
            }

        )
    }
    create() {
        // Process checkout data here
        this.service.create(this.checkoutForm.value).subscribe(
            data => {
                this.ngOnInit();
            }, error => {
                if (error.status == 401 || error.status == 403) {
                    localStorage.setItem("token", null)
                    this.document.location.href = "http://localhost:4200/auth/login"
                }
            }, () => {
                this.ngOnInit();
            }

        )
    }

    delete(id) {
        this.service.delete(id).subscribe(
            data => {
                this.ngOnInit();
            }, error => {
                if (error.status == 401 || error.status == 403) {
                    localStorage.setItem("token", null)
                    this.document.location.href = "http://localhost:4200/auth/login"
                }
            }, () => {
                this.ngOnInit();
            }
        )
    }


}

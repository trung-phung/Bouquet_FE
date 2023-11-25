import { Component, Inject } from "@angular/core";

import { DOCUMENT } from "@angular/common";
import { FormBuilder } from '@angular/forms';
import { error } from "console";
import { OrderService } from "./order";


@Component({
    selector: 'order',
    templateUrl: './order.component.html',
    // styleUrls: ['./auth.component.scss'],
})
export class OrderComponent {
    constructor(private service: OrderService, private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document) { };
    data: any
    isAdmin = false;
    checkoutForm = this.formBuilder.group({
        message: '',

    });
    user: any;
    submitted: boolean;
    rememberMe: boolean;

    ngOnInit(): void {
        this.getRole()
        if (this.isAdmin) {
            this.adminGetAll()
        } else {
            this.userGetAll()
        }

    }
    getRole() {
        if (JSON.parse(window.atob(localStorage.getItem("token").split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "Admin") {
            this.isAdmin = true;
        }
    }


    userGetAll() {
        // Process checkout data here
        this.service.userGetAll().subscribe(
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
    adminGetAll() {
        // Process checkout data here
        this.service.adminGetAll().subscribe(
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
    // create() {
    //     // Process checkout data here
    //     this.service.create(this.checkoutForm.value).subscribe(
    //         data => {
    //             console.log(data)
    //             this.ngOnInit();
    //         }, error => {
    //             if (error.status == 401 || error.status == 403) {
    //                 localStorage.setItem("token", null)
    //                 this.document.location.href = "http://localhost:4200/auth/login"
    //             }
    //         }

    //     )
    // }

    approve(id) {
        this.service.approve(id).subscribe(
            data => {
                this.ngOnInit()
            }, error => {
                if (error.status == 401 || error.status == 403) {
                    localStorage.setItem("token", null)
                    this.document.location.href = "http://localhost:4200/auth/login"
                }
            }
        )
    }
    cancel(id) {
        this.service.cancel(id).subscribe(
            data => {
                this.ngOnInit()
            }, error => {
                if (error.status == 401 || error.status == 403) {
                    localStorage.setItem("token", null)
                    this.document.location.href = "http://localhost:4200/auth/login"
                }
            }
        )
    }


}

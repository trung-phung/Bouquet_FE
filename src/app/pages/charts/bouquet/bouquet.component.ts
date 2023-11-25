import { Component, Inject } from "@angular/core";

import { DOCUMENT } from "@angular/common";
import { FormBuilder } from '@angular/forms';
import { error } from "console";
import { BouquetService } from "./bouquet";
import { NbDialogModule } from "@nebular/theme";


@Component({
    selector: 'bouquet',
    templateUrl: './bouquet.component.html',
    // styleUrls: ['./auth.component.scss'],
})
export class BouquetComponent {
    constructor(private service: BouquetService, private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document, public dialog: NbDialogModule) { };
    data: any
    isAdmin: boolean = false
    photo: any
    checkoutForm = this.formBuilder.group({
        bouquet: '',
        price: 0,
        photo: ['']
    });
    user: any;
    submitted: boolean;
    rememberMe: boolean;

    getRole() {
        if (JSON.parse(window.atob(localStorage.getItem("token").split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "Admin") {
            this.isAdmin = true;
        };
    }
    ngOnInit(): void {
        this.getRole()
        this.getAll()

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
    buy(id: any) {
        this.document.location.href = "http://localhost:4200/pages/create_order?id=" + id
    }
    delete(id) {
        this.service.delete(id).subscribe(
            data => {
                this.ngOnInit()
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

    file(e) {

        let files: FileList = e.target.files;
        let file: File = files[0];
        this.photo = file;
        console.log(this.photo)
    }
    create(e) {
        console.log(e)

        // Process checkout data here
        this.service.create(this.checkoutForm.value, this.photo).subscribe(
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

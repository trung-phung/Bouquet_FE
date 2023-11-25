import { Component, Inject } from "@angular/core";

import { DOCUMENT } from "@angular/common";
import { FormBuilder } from '@angular/forms';
import { error } from "console";
import { OrderService } from "../order";
import { BouquetService } from "../../bouquet/bouquet";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "../../message/message";


@Component({
    selector: 'create_order',
    templateUrl: './create_order.component.html',

})
export class CreateOrderComponent {
    constructor(private bouquetService: BouquetService, private messageService: MessageService, private orderService: OrderService, private route: ActivatedRoute, private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document) { };
    data: any
    message: any
    isAdmin = false;
    checkoutForm = this.formBuilder.group({
        receiverName: '',
        deliveryAddress: '',
        occasion: '',
        occasionID: 1000000,
        phone: 0,
        date: new Date(),
        customMessage: 0,
    });
    bouquetId: any
    user: any;
    submitted: boolean;
    rememberMe: boolean;

    ngOnInit(): void {
        this.route.queryParams.subscribe(a =>
            this.bouquetId = a["id"]
        )
        this.getBouquet(this.bouquetId)
        this.getAllMess()

    }

    getAllMess() {
        // Process checkout data here
        this.messageService.getAll().subscribe(
            data => {

                this.message = data
            }, error => {
                if (error.status == 401 || error.status == 403) {
                    localStorage.setItem("token", null)
                    this.document.location.href = "http://localhost:4200/auth/login"
                }
            }

        )
    }

    getBouquet(id: any) {
        // Process checkout data here
        this.bouquetService.get(id).subscribe(
            data => {
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
        let occasion_ID = null;
        console.log(this.message)
        if (this.checkoutForm.value.occasion || this.checkoutForm.value.occasion != '') {
            occasion_ID = this.message.filter(a => a.message == this.checkoutForm.value.occasion)[0].occasion_ID
            this.checkoutForm.controls['occasionID'].setValue(occasion_ID);

        }
        this.orderService.create(this.checkoutForm.value, this.bouquetId).subscribe(
            data => {
                console.log(data)
                this.document.location.href = "http://localhost:4200/pages/bouquet"
            }, error => {
                if (error.status == 401 || error.status == 403) {
                    localStorage.setItem("token", null)
                    this.document.location.href = "http://localhost:4200/auth/login"
                }
            }

        )
    }


}

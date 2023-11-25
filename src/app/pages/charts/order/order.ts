import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private http: HttpClient) { }
    userGetAll() {
        let url = "http://localhost:5112/api/Order/get_my_orders"
        return this.http.get(url, { headers: this.getHeader() })
    }
    adminGetAll() {
        let url = "http://localhost:5112/api/Order/admin_get_orders"
        return this.http.get(url, { headers: this.getHeader() })
    }
    getHeader() {
        let header = new HttpHeaders()
        return header.set("Authorization", "Bearer " + localStorage.getItem("token"))
    }
    create(order: any, bouquetId?: any) {
        let url = "http://localhost:5112/api/Order/create_order"
        return this.http.post(url, { bouquet_ID: bouquetId, receiver_Name: order.receiverName, delivery_Address: order.deliveryAddress, phone: order.phone, date: order.date, occasion_ID: order.occasionID, custom_Message: order.customMessage }, { headers: this.getHeader() })
    }
    approve(id: any) {
        let url = "http://localhost:5112/api/Order/approve_order"
        return this.http.get(url, { headers: this.getHeader(), params: new HttpParams().set('id', id) })
    }
    cancel(id: any) {
        let url = "http://localhost:5112/api/Order/cancel"
        return this.http.get(url, { headers: this.getHeader(), params: new HttpParams().set('id', id) })
    }

}
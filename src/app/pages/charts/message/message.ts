import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor(private http: HttpClient) { }
    getAll() {

        let url = "http://localhost:5112/api/Message/get_messages"
        return this.http.get(url, { headers: this.getHeader() })
    }
    getHeader() {
        let header = new HttpHeaders()
        return header.set("Authorization", "Bearer " + localStorage.getItem("token"))
    }
    create(message: any) {
        let url = "http://localhost:5112/api/Message/create_message"
        return this.http.post(url, { Message: message.message }, { headers: this.getHeader() })
    }
    delete(id: any) {
        let url = "http://localhost:5112/api/Message/delete_message"
        return this.http.get(url, { headers: this.getHeader(), params: new HttpParams().set('id', id) })
    }

}
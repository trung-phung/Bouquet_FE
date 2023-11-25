import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }
    getHeader() {
        let header = new HttpHeaders()
        return header.set("Authorization", "Bearer " + localStorage.getItem("token"))
    }
    getAll() {
        let url = "http://localhost:5112/api/User/get_users"
        return this.http.get(url, { headers: this.getHeader() })
    }
    create(FName: any, LName: any, Phone: any, Address: any, username: any, password: any) {
        let url = "http://localhost:5112/api/User/create_user"
        return this.http.post(url, { FName: FName, LName: LName, Phone: Phone, Address: Address, username: username, password: password }, { headers: this.getHeader() })
    }
    delete(id: any) {
        let url = "http://localhost:5112/api/User/delete"
        return this.http.get(url, { headers: this.getHeader(), params: new HttpParams().set('id', id) })
    }

}
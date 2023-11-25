import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) { }
    login(username: any, password: any) {
        let url = "http://localhost:5112/api/Auth/login"
        return this.http.post(url, { username: username, password: password })
    }
    register(FName: any, LName: any, Phone: any, Address: any, username: any, password: any) {
        let url = "http://localhost:5112/api/Auth/register"
        return this.http.post(url, { FName: FName, LName: LName, Phone: Phone, Address: Address, username: username, password: password })
    }

}
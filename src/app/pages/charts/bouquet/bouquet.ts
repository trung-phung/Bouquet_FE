import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class BouquetService {
    constructor(private http: HttpClient) { }
    getAll() {
        let url = "http://localhost:5112/api/Bouquet/get_bouquets"
        return this.http.get(url, { headers: this.getHeader() })
    }
    get(id) {
        let url = "http://localhost:5112/api/Bouquet/get_bouquet"
        return this.http.get(url, { headers: this.getHeader(), params: new HttpParams().set('id', id) })
    }
    getHeader() {
        let header = new HttpHeaders()
        return header.set("Authorization", "Bearer " + localStorage.getItem("token"))
    }
    create(bouquet?: any, photo?: any) {
        let url = "http://localhost:5112/api/Bouquet/create_bouquet"
        const data = new FormData();
        data.append('formfile', photo)
        return this.http.post(url, data, { headers: this.getHeader(), params: new HttpParams().set('name', bouquet.bouquet).set('price', bouquet.price) })
    }
    delete(id: any) {
        let url = "http://localhost:5112/api/Bouquet/delete"
        return this.http.get(url, { headers: this.getHeader(), params: new HttpParams().set('id', id) })
    }

}
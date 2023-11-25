import { Component, Inject } from "@angular/core";
import { LoginService } from "../login";
import { DOCUMENT } from "@angular/common";
import { FormBuilder } from '@angular/forms';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    constructor(private loginService: LoginService, private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document) { };
    checkoutForm = this.formBuilder.group({
        fname: '',
        lname: '',
        phone: '',
        address: '',
        username: '',
        password: ''
    });
    user: any;
    submitted: boolean;

    rememberMe: boolean;


    register() {
        // Process checkout data here
        this.loginService.register(this.checkoutForm.value.fname, this.checkoutForm.value.lname, this.checkoutForm.value.phone.toString(), this.checkoutForm.value.address, this.checkoutForm.value.username, this.checkoutForm.value.password).subscribe(
            data => {
                console.warn(data["token"])
                localStorage.setItem("token", data["token"])
                this.document.location.href = "http://localhost:4200/auth/login"
            }

        )
    }


}

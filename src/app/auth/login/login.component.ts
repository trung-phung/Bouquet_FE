import { Component, Inject } from "@angular/core";
import { LoginService } from "../login";
import { DOCUMENT } from "@angular/common";
import { FormBuilder } from '@angular/forms';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class LoginComponent {
    constructor(private loginService: LoginService, private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document) { };
    checkoutForm = this.formBuilder.group({
        email: '',
        password: ''
    });
    user: any;
    submitted: boolean;
    rememberMe: boolean;
    test() {

        // Process checkout data here
        this.loginService.login(this.checkoutForm.value.email, this.checkoutForm.value.password).subscribe(
            data => {
                localStorage.setItem("token", data["token"])
                this.document.location.href = "http://localhost:4200/pages/bouquet"
            }

        )
    }


}

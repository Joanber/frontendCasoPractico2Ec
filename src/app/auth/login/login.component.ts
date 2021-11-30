import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2: any;
  public loginForm = this.fb.group({
    email: [
      localStorage.getItem("email") || "",
      [Validators.required, Validators.email],
    ],
    password: ["", Validators.required],
    remember: [false],
  });
  constructor(private router: Router, private fb: FormBuilder) {}
  ngOnInit(): void {}

  login() {
    this.router.navigateByUrl("/");
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AutenticacionService } from '../servicios/autenticacion.service'

@Component({ 
    templateUrl: 'registro.component.html' ,
    styleUrls: ['./registro.component.css']
})

export class registroComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AutenticacionService
    ) { 
        
 
    }

    ngOnInit() {
        if(this.authenticationService.estaLogueado()){
            this.authenticationService.logout();
        }
        this.registerForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.userName.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                   // console.log('holaaaaa');
                    this.error = error;
                    this.loading = false;
                });
    }
}

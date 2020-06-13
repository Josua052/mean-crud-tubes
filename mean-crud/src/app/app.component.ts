import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // tslint:disable-next-line: variable-name
  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }
/*  pesan = '';
  pesan2 = [];
  pengguna = '';
  constructor(private http: HttpClient){}

   async ngOnInit(){
     this.pesan2 = (await this.http.get('http://localhost:3000/api/pesan').toPromise()) as any[];
    // console.log(this.pesan2);
  }
  kirim(){
    var db = {
      pengguna : this.pengguna,
      pesan : this.pesan
    };
    console.log(db);
    this.http.post('http://localhost:3000/api/pesan', db).toPromise();
    this.ngOnInit();
  } */
}

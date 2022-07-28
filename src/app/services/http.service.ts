import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private readonly api_url: string = 'http://150.65.59.82:4869/';
  // private readonly api_url: string = 'http://127.0.0.1:5000/';


  private httpOptions = {
    // headers: new HttpHeaders().set('Content-Type','application/json'),
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    }).set('Content-Type','application/json')
  };

  public get_mesh(data: any) {
    let url = this.api_url + 'get-mesh';
    return this.httpClient.post(url, data, this.httpOptions);
  }

  public optimize_mesh(data: any) { 
    let url = this.api_url + 'optimize-mesh';
    return this.httpClient.post(url, data, this.httpOptions);
  }

  public get_rendered_sketch(data: any) {
    let url = this.api_url + 'get-rendered-sketch';
    return this.httpClient.post(url, data, this.httpOptions);
  }
}

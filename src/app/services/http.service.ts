import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private readonly api_url: string = environment.api_url + '/';


  private httpOptions = {
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

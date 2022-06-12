import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private readonly api_url: string = 'http://localhost:5000/';

  public post_sketch(data: string) {
    return this.httpClient.post(this.api_url, data);
  }

  public post_stroke(data: string) {
    return this.httpClient.post(this.api_url, data);
  }

  public post_exsit_mesh(data: any) {
    return this.httpClient.post(this.api_url, data);
  }
}

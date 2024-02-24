import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/enviroment/environment';
@Injectable()
export class Service {
  Api: String;
  constructor(private http: HttpClient) {
    this.Api = environment.apiUrl
  }


  apiCall(model: any, mode: any, url: any): any {
    const httpHeaders: any = new HttpHeaders();
    if (mode == "GET") {
      return this.http.get(this.Api + url, { headers: httpHeaders })

    } else if (mode == 'POST') {
      let body = this.serializeObj(model);

      return this.http.post(this.Api + url, body, { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) })

    }
  }

  private serializeObj(obj: any) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// export interface getDetail{

// }

@Injectable({
  providedIn: 'root'
})
export class GetDetailService {

  // constructor(private _http:HttpClient) { }

  // getOne(){
  //   const headers = {}
  //   return this._http.get('',headers).subscribe(data=>{

  //   })
  // }


  private baseUrl = `http://training-otmm.acheron-tech.com:11090/otmmapi/v6/assets`;
  constructor(private http: HttpClient) {}

  // getDetails(keyword: string): Observable<getDetail> {
  //   const url = `${this.baseUrl}keyword_query=${keyword}`;

  //   const headers = new HttpHeaders({
  //     'X-Requested-By': localStorage.getItem('sessionId')!,
      
  //   });

  //   return this.http.get<getDetail>(url, { headers });
  // }

  getOne(id: any){
    const url = `${this.baseUrl}/${id}?load_type=metadata`

    
    
    const headers = new HttpHeaders({

      'X-Requested-By': localStorage.getItem('sessionId')!,
      OTDSToken: localStorage.getItem('OTDSTicket')!,
      
    });
   
    return this.http.get(url,{headers})
  }
}

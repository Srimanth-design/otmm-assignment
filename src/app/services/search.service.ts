import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private baseUrl = `http://training-otmm.acheron-tech.com:11090/otmmapi/v6/search/text?`;
  constructor(private http: HttpClient) {}

  search(keyword: string) {
    const url = `${this.baseUrl}keyword_query=${keyword}`;

    const headers = new HttpHeaders({
      'X-Requested-By': localStorage.getItem('session_id')!,
      OTDSToken: localStorage.getItem('otds_ticket')!,
    });

    return this.http.get(url, { headers, withCredentials: true });
  }
}

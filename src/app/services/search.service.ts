import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SearchResult {
  search_result_resource: {
    asset_list: AssetList[];
  };
}

export interface AssetList {
  asset_content_info: {
    master_content: {
      name: string;
    };
  };
  rendition_content: {
    thumbnail_content: {
      url: string;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private baseUrl = `http://training-otmm.acheron-tech.com:11090/otmmapi/v6/search/text?`;
  constructor(private http: HttpClient) {}

  search(keyword: string): Observable<SearchResult> {
    const url = `${this.baseUrl}keyword_query=${keyword}`;

    const headers = new HttpHeaders({
      'X-Requested-By': localStorage.getItem('sessionId')!,
      OTDSToken: localStorage.getItem('OTDSTicket')!,
    });

    return this.http.get<SearchResult>(url, { headers });
  }
}

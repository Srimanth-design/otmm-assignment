import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface LoginResponse {
  session_resource: {
    session: {
      domain_name: string;
      id: string;
      local_session: boolean;
      login_name: string;
      message_digest: string;
      role_name: string;
      user_full_name: string;
      user_id: string;
      user_role_id: string;
      validation_key: number;
    };
  };
}

export interface OTDSResponse {
  token: string;
  userId: string;
  ticket: string;
  resourceID: string;
  passwordExpirationTime: number;
  continuation: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private otdsUrl = `http://training-otmm.acheron-tech.com:8080/otdsws/rest/authentication/credentials`;
  private retrieveSessionUrl = `http://training-otmm.acheron-tech.com:11090/otmmapi/v6/sessions`;
  private resourceUrl = `http://training-otmm.acheron-tech.com:8080/otdsws/rest/authentication/resource/ticketforresource`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    this.getOTDSTicket(username, password)
      .pipe(
        map((data) => data.ticket),
        map((data) =>
          this.getResourceTicket(data).pipe(map((value) => value.ticket))
        ),
        map((data) =>
          data.pipe(
            map((d) => {
              localStorage.setItem('ResourceTicket', d);
              return this.getSession(d).pipe(
                map((ddd) =>
                  localStorage.setItem(
                    'sessionId',
                    ddd.session_resource.session.id
                  )
                )
              );
            })
          )
        )
      )
      .subscribe((login) => login.subscribe((ticket) => ticket.subscribe()));
  }

  private getOTDSTicket(username: string, password: string) {
    return this.http.post<OTDSResponse>(this.otdsUrl, {
      userName: username,
      password,
      ticketType: 'OTDSTICKET',
    });
  }

  private getSession(ticket: string) {
    const headers = new HttpHeaders({
      OTDSToken: ticket,
    });

    return this.http.get<LoginResponse>(this.retrieveSessionUrl, {
      headers,
      withCredentials: true,
    });
  }

  private getResourceTicket(ticket: string): Observable<OTDSResponse> {
    const headers = new HttpHeaders({
      OTDSToken: ticket,
    });

    const body = {
      ticket,
      targetResourceId: 'e1332625-4b8e-4e40-94a8-012f81846665',
    };

    return this.http.post<OTDSResponse>(this.resourceUrl, body, { headers });
  }
}

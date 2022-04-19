import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

interface OTDSResponse {
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

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    this.getOTDSTicket(username, password).subscribe((data) => {
      localStorage.setItem('otds_ticket', data.ticket);
      this.getSession(data.ticket).subscribe((value) => {
        localStorage.setItem('session_id', value.session_resource.session.id);
      });
    });
  }

  private getOTDSTicket(username: string, password: string) {
    return this.http.post<OTDSResponse>(this.otdsUrl, {
      userName: username,
      password,
      targetResourceId: 'e1332625-4b8e-4e40-94a8-012f81846665',
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
}

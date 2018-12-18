import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthService {

    constructor(public http : HttpClient){
    }

    authenticate(creds : CredenciaisDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response', //Especifica que a req vai retornar um obj do tipo response
                responseType: 'text' //O endpoint /login retorna uma resposta de texto vazio e não um JSON

            });
    }
}
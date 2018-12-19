import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {

    jwtHelper : JwtHelper = new JwtHelper();

    constructor(public http : HttpClient, public storage : StorageService){
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

    refreshToken(){
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`,
            {},
            {
                observe: 'response', //Especifica que a req vai retornar um obj do tipo response
                responseType: 'text' //O endpoint /auth/refresh_token retorna uma resposta de texto vazio e não um JSON. Colocando isso, evita o de parse.

            });
    }

    successfulLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }

     logout() {
        this.storage.setLocalUser(null);
    }
}
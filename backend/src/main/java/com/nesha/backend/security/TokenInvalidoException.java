package com.nesha.backend.security;

import com.nesha.backend.exception.ApiException;
import org.springframework.http.HttpStatus;

public class TokenInvalidoException extends ApiException {

    public TokenInvalidoException() {
        super(HttpStatus.UNAUTHORIZED, "TOKEN_INVALIDO", "Token ausente, malformado ou assinatura inválida.");
    }
}

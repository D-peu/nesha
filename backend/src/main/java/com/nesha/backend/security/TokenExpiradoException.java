package com.nesha.backend.security;

import com.nesha.backend.exception.ApiException;
import org.springframework.http.HttpStatus;

public class TokenExpiradoException extends ApiException {

    public TokenExpiradoException() {
        super(HttpStatus.UNAUTHORIZED, "TOKEN_EXPIRADO", "Token vencido.");
    }
}

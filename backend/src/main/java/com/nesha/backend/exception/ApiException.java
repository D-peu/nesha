package com.nesha.backend.exception;

import java.util.Map;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiException extends RuntimeException {

    private final HttpStatus status;
    private final String codigo;
    private final Map<String, String> campos;

    public ApiException(HttpStatus status, String codigo, String mensagem) {
        this(status, codigo, mensagem, null);
    }

    public ApiException(HttpStatus status, String codigo, String mensagem, Map<String, String> campos) {
        super(mensagem);
        this.status = status;
        this.codigo = codigo;
        this.campos = campos;
    }
}

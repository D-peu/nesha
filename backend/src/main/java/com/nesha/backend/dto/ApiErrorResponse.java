package com.nesha.backend.dto;

import java.util.Map;

public record ApiErrorResponse(String codigo, String mensagem, Map<String, String> campos) {

    public ApiErrorResponse(String codigo, String mensagem) {
        this(codigo, mensagem, null);
    }
}

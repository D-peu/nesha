package com.nesha.backend.dto;

public record LoginResponse(
        String accessToken, String tokenType, long expiresIn, UsuarioResponse usuario) {}

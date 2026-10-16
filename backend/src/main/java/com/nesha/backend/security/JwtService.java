package com.nesha.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.util.UUID;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private final SecretKey chave;
    private final long validadeSegundos;

    public JwtService(
            @Value("${nesha.jwt.secret}") String segredo,
            @Value("${nesha.jwt.expiracao-segundos:3600}") long validadeSegundos) {
        this.chave = Keys.hmacShaKeyFor(segredo.getBytes());
        this.validadeSegundos = validadeSegundos;
    }

    public long getValidadeSegundos() {
        return validadeSegundos;
    }

    public String gerarToken(UUID usuarioId) {
        Date agora = new Date();
        Date expiracao = new Date(agora.getTime() + validadeSegundos * 1000);
        return Jwts.builder()
                .subject(usuarioId.toString())
                .issuedAt(agora)
                .expiration(expiracao)
                .signWith(chave)
                .compact();
    }

    public UUID validarEExtrairUsuarioId(String token) {
        try {
            Claims claims = Jwts.parser().verifyWith(chave).build().parseSignedClaims(token).getPayload();
            return UUID.fromString(claims.getSubject());
        } catch (ExpiredJwtException e) {
            throw new TokenExpiradoException();
        } catch (JwtException | IllegalArgumentException e) {
            throw new TokenInvalidoException();
        }
    }
}

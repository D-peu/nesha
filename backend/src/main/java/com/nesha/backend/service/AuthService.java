package com.nesha.backend.service;

import com.nesha.backend.dto.LoginRequest;
import com.nesha.backend.dto.LoginResponse;
import com.nesha.backend.dto.UsuarioResponse;
import com.nesha.backend.entity.Usuario;
import com.nesha.backend.exception.ApiException;
import com.nesha.backend.repository.UsuarioRepository;
import com.nesha.backend.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository
                .findByEmailIgnoreCase(request.email())
                .orElseThrow(this::credenciaisInvalidas);

        if (!passwordEncoder.matches(request.senha(), usuario.getSenhaHash())) {
            throw credenciaisInvalidas();
        }

        String token = jwtService.gerarToken(usuario.getId());

        return new LoginResponse(
                token, "Bearer", jwtService.getValidadeSegundos(), UsuarioResponse.from(usuario));
    }

    private ApiException credenciaisInvalidas() {
        return new ApiException(HttpStatus.UNAUTHORIZED, "CREDENCIAIS_INVALIDAS", "E-mail ou senha incorretos.");
    }
}

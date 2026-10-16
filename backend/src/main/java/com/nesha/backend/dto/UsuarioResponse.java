package com.nesha.backend.dto;

import com.nesha.backend.entity.Perfil;
import com.nesha.backend.entity.Usuario;

public record UsuarioResponse(String id, String nome, String email, Perfil perfil) {

    public static UsuarioResponse from(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId().toString(), usuario.getNome(), usuario.getEmail(), usuario.getPerfil());
    }
}

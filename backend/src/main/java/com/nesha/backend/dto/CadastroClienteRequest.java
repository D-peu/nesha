package com.nesha.backend.dto;

import com.nesha.backend.validation.CpfValido;
import com.nesha.backend.validation.TelefoneValido;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CadastroClienteRequest(
        @NotBlank(message = "Nome é obrigatório.")
                @Pattern(regexp = "\\S+\\s+\\S+.*", message = "Informe nome e sobrenome.")
                String nome,
        @NotBlank @CpfValido String cpf,
        @NotBlank @TelefoneValido String telefone,
        @NotBlank @Email(message = "E-mail inválido.") String email,
        @NotBlank
                @Pattern(
                        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,}$",
                        message =
                                "Senha deve ter ao menos 8 caracteres, com maiúscula, minúscula, número e caractere especial.")
                String senha,
        @Valid EnderecoRequest endereco) {}

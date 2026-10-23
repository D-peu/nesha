package com.nesha.backend.dto;

import com.nesha.backend.validation.UfValida;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record EnderecoRequest(
        @NotBlank @Pattern(regexp = "\\d{8}", message = "CEP inválido.") String cep,
        @NotBlank String logradouro,
        @NotBlank @Size(max = 10) String numero,
        String complemento,
        @NotBlank String bairro,
        @NotBlank String cidade,
        @NotBlank @UfValida String uf) {}

package com.nesha.backend.service;

import com.nesha.backend.dto.CadastroClienteRequest;
import com.nesha.backend.dto.CadastroClienteResponse;
import com.nesha.backend.dto.UsuarioResponse;
import com.nesha.backend.entity.Endereco;
import com.nesha.backend.entity.Perfil;
import com.nesha.backend.entity.Usuario;
import com.nesha.backend.exception.ApiException;
import com.nesha.backend.repository.UsuarioRepository;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public ClienteService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public CadastroClienteResponse cadastrar(CadastroClienteRequest request) {
        if (usuarioRepository.existsByEmailIgnoreCase(request.email())) {
            throw new ApiException(
                    HttpStatus.CONFLICT,
                    "EMAIL_JA_CADASTRADO",
                    "Este e-mail já está cadastrado.",
                    Map.of("email", "Este e-mail já está cadastrado."));
        }

        if (usuarioRepository.existsByCpf(request.cpf())) {
            throw new ApiException(
                    HttpStatus.CONFLICT,
                    "CPF_JA_CADASTRADO",
                    "Este CPF já está cadastrado.",
                    Map.of("cpf", "Este CPF já está cadastrado."));
        }

        var enderecoRequest = request.endereco();
        Endereco endereco = new Endereco(
                enderecoRequest.cep(),
                enderecoRequest.logradouro(),
                enderecoRequest.numero(),
                enderecoRequest.complemento(),
                enderecoRequest.bairro(),
                enderecoRequest.cidade(),
                enderecoRequest.uf());

        Usuario usuario = Usuario.builder()
                .nome(request.nome())
                .cpf(request.cpf())
                .telefone(request.telefone())
                .email(request.email().toLowerCase())
                .senhaHash(passwordEncoder.encode(request.senha()))
                .perfil(Perfil.CLIENTE)
                .endereco(endereco)
                .build();

        usuario = usuarioRepository.save(usuario);

        return new CadastroClienteResponse(UsuarioResponse.from(usuario));
    }
}

package com.nesha.backend.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class TelefoneValidador implements ConstraintValidator<TelefoneValido, String> {

    @Override
    public boolean isValid(String telefone, ConstraintValidatorContext context) {
        if (telefone == null || !telefone.matches("\\d{10,11}")) {
            return false;
        }
        int ddd = Integer.parseInt(telefone.substring(0, 2));
        if (ddd < 11) {
            return false;
        }
        if (telefone.length() == 11 && telefone.charAt(2) != '9') {
            return false;
        }
        return true;
    }
}

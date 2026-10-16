package com.nesha.backend.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UfValidador.class)
public @interface UfValida {

    String message() default "UF inválida.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

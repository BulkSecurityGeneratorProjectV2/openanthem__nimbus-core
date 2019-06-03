/**
 *  Copyright 2016-2019 the original author or authors.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.antheminc.oss.nimbus.domain.cmd.exec;

import java.util.Set;

import javax.validation.ConstraintViolation;

import com.antheminc.oss.nimbus.FrameworkRuntimeException;

import lombok.Getter;

/**
 * @author Soham Chakravarti
 *
 */
public class ValidationException extends FrameworkRuntimeException {

	private static final long serialVersionUID = 1L;

	
	@Getter private final ValidationResult validationResult;
	
	
	public ValidationException(Set<ConstraintViolation<Object>> violations) {
		this.validationResult = new ValidationResult(violations);
	}

	public ValidationException(Set<ConstraintViolation<Object>> violations, String message) {
		super(message);
		this.validationResult = new ValidationResult(violations);
	}
	
	public ValidationException(ValidationResult result) {
		this.validationResult = result;
	}
	
	public ValidationException(ValidationResult result, String message) {
		super(message);
		this.validationResult = result;
	}
	
}

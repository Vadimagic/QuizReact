export function createControl (config, validation) {
	return {
		...config,
		validation,
		valid: !validation,
		touched: false,
		value: ''
	}
}

export function validate(value, validation = null) {
	if (!validation) {
		return true
	}

	let isValid = true;
	value = value.trim()

	if (validation.required) {
		isValid = value !== '' && isValid
	}

	if (validation.email) {
		return /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i.test(value) && isValid
	}

	if (validation.minLength) {
		isValid = value.length >= 6 && isValid
	}

	if (validation.maxLength) {
		isValid = value.length <= 20 && isValid
	}

	return isValid;
}

export function validateForm(formControls) {
	return !Object.keys(formControls).reduce((valid, item) => {
		return valid || !formControls[item].valid
	} , false)
}
export function checkPasswordStrength(pass) {
	const length = pass.length
	const hasLowerCase = /[a-z]/.test(pass)
	const hasUpperCase = /[A-Z]/.test(pass)
	const hasNumber = /\d/.test(pass)
	const hasSpecialCharacter = /[!"#$%&'()*+,-./:;=?@[^_{}~]/.test(pass)

	if (length < 5) {
		return 'Bardzo słabe'
	} else if (length < 13) {
		return 'Słabe'
	} else if (
		hasLowerCase &&
		hasUpperCase &&
		hasNumber &&
		hasSpecialCharacter &&
		length < 20
	) {
		return 'Dobre'
	} else if (length > 30) {
		return 'Bardzo dobre'
	}
	return 'Dobre'
}

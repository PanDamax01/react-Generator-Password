import styles from './GeneratorInput.module.scss'

export function GeneratorInput({
	password,
	hidePass,
	generatePassword,
	rotatingAnimation,
	passStrength,
}) {
	const classImg = `${styles.btn}  ${rotatingAnimation && styles.active}`

	function getBackgroundColor() {
		switch (passStrength) {
			case 'Bardzo słabe':
				return 'red'
			case 'Słabe':
				return 'orange'
			case 'Dobre':
				return 'green'
			case 'Silne':
				return '#0070f6'
			default:
				return '#0070f6'
		}
	}

	const backgroundColor = getBackgroundColor()

	return (
		<div className={styles['generator-input']}>
			<p className={styles.password}>{hidePass ? '*****' : password}</p>
			<span className={styles.badge} style={{ backgroundColor }}>
				{passStrength}
			</span>
			<button
				className={classImg}
				onClick={generatePassword}
				disabled={rotatingAnimation}></button>
		</div>
	)
}

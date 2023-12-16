import styles from './LenghtSettings.module.scss'

export function LenghtSettings({
	passLength,
	increaseLength,
	decreaseLength,
	handleRangeChange,
}) {

	const gradientProcent = (1 - passLength / 50) * 100
	const trackStyle = {
		backgroundImage: `linear-gradient(270deg, transparent ${gradientProcent}%, rgb(0, 112, 246) ${gradientProcent}%)`,
	}

	return (
		<div className={styles['lenght-settings']}>
			
			<label htmlFor='length' className={styles.label}>
				Długość hasła:
			</label>
			<strong>{passLength}</strong>

			<div className={styles.box}>
				<button className={styles.btn} onClick={decreaseLength}>
					-
				</button>
				<input
					type='range'
					min='1'
					max='50'
					id='length'
					value={passLength}
					onChange={handleRangeChange}
					style={trackStyle}
					className={`${styles.range} ${styles.customRange}`}></input>
				<button className={styles.btn} onClick={increaseLength}>
					+
				</button>
			</div>

		</div>
	)
}

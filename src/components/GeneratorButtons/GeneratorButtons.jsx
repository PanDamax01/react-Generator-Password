import styles from './GeneratorButtons.module.scss'

export function GeneratorButtons({
	hidePass,
	handleHidePass,
	copyPass,
	disabledCopyBtn,
}) {
	return (
		<div className={styles.box}>
			<button className={styles.btn} onClick={handleHidePass}>
				{hidePass ? 'Pokaż' : 'Schowaj'}
			</button>
			<button
				className={styles.btn}
				onClick={copyPass}
				disabled={disabledCopyBtn}>
				Kopiuj
			</button>
		</div>
	)
}

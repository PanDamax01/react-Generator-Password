import styles from './AlertMessage.module.scss'

export function AlertMessage({ message, backgroundColor }) {
	return (
		<span className={styles.alert} style={{ backgroundColor }}>
			{message}
		</span>
	)
}

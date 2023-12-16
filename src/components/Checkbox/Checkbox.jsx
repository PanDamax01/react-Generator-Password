import styles from './Checkbox.module.scss'

export function Checkbox({ id, text, checked, isDisabled, onChange }) {
	const classChecked = checked ? `${styles.checked}` : ''
	const classDisabled = isDisabled ? `${styles.disabled}` : ''

	return (
		<label
			htmlFor={id}
			className={`${styles['label-control']} ${classChecked} ${classDisabled}`}>
			<input
				type='checkbox'
				id={id}
				onChange={onChange}
				checked={checked}
				disabled={isDisabled}
				className={styles.checkbox}
			/>
			{text}
		</label>
	)
}

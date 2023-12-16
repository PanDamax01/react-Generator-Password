import styles from './SignsSettings.module.scss'
import { Checkbox } from '../Checkbox/Checkbox'

export function SignsSettings({ checkboxState, handleCheckboxChange }) {
	const checkBoxes = [
		{ id: 'uppercase', text: 'ABC' },
		{ id: 'lowercase', text: 'abc' },
		{ id: 'numbers', text: '123' },
		{ id: 'specials', text: '#$&' },
	]

	const numberTrue = Object.values(checkboxState).filter(
		(value) => value === true
	).length


	return (
		<div className={styles.signs}>
			<span className={styles.span}>Użyte znaki:</span>

			<div className={styles.control}>
				{checkBoxes.map(({ id, text }) => (
					<Checkbox
						key={id}
						id={id}
						text={text}
						checked={checkboxState[id]}
						isDisabled={numberTrue === 1 && checkboxState[id]}
						onChange={handleCheckboxChange}
					/>
				))}
			</div>
		</div>
	)
}

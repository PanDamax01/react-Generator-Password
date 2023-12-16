import { useState } from 'react'
import styles from './App.module.scss'
import { GeneratorButtons } from './components/GeneratorButtons/GeneratorButtons'
import { GeneratorInput } from './components/GeneratorInput/GeneratorInput'
import { LenghtSettings } from './components/LenghtSettings/LenghtSettings'
import { SignsSettings } from './components/SignsSettings/SignsSettings'
import { AlertMessage } from './components/AlertMessage/AlertMessage'
import { checkPasswordStrength } from './utils/checkPasswordStrength'

const chars = {
	uppercase: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
	lowercase: 'abcdefghjkmnpqrstuvwxyz',
	numbers: '0123456789',
	specials: `!"#$%&'()*+,-./:;=?@[]^_{}~`,
}

function App() {
	const [password, setPassword] = useState('2137')
	const [hidePass, setHidePass] = useState(true)
	const [rotatingAnimation, setRotatingAnimation] = useState(false)
	const [passStrength, setPassStrength] = useState('Naciśnij strzałkę')
	const [passLength, setPassLength] = useState(11)
	const [checkboxState, setCheckboxState] = useState({
		uppercase: true,
		lowercase: true,
		numbers: true,
		specials: true,
	})
	const [showModal, setShowModal] = useState({
		view: false,
		message: 'Succes! Udało się skopiować.',
		backgroundColor: 'green',
	})

	function generatePassword() {
		if (rotatingAnimation) return
		setRotatingAnimation(true)

		let allChars = ''
		for (const checkbox in checkboxState) {
			if (checkboxState[checkbox]) {
				allChars += chars[checkbox]
			}
		}

		let generatePass = ''
		for (let i = 0; i < passLength; i++) {
			const randomChar = allChars[Math.floor(Math.random() * allChars.length)]
			generatePass += randomChar
		}
		setPassword(generatePass)
		const strength = checkPasswordStrength(generatePass)
		setPassStrength(strength)

		setTimeout(() => {
			setRotatingAnimation(false)
		}, 600)
	}

	function handleHidePass() {
		setHidePass((prev) => !prev)
	}
	async function copyPass() {
		let message, backgroundColor

		try {
			const permissions = await navigator.permissions.query({
				name: 'clipboard-write',
			})

			if (permissions.state === 'granted' || permissions.state === 'prompt') {
				await navigator.clipboard.writeText(password)
				message = 'Success! Udało się skopiować.'
				backgroundColor = 'green'
			} else {
				message = 'Info! Brak zezwolenia na kopiowanie.'
				backgroundColor = '#ed9819'
			}
		} catch (error) {
			message = 'Warning! Błąd podczas kopiowania.'
			backgroundColor = 'red'
		} finally {
			setShowModal({ view: true, message, backgroundColor })

			setTimeout(() => {
				setShowModal({ view: false })
			}, 1600)
		}
	}

	function handleIncreaseLength() {
		if (passLength < 50) {
			setPassLength((prev) => prev + 1)
		}
	}
	function handleDecreaseLength() {
		if (passLength > 1) {
			setPassLength((prev) => prev - 1)
		}
	}
	function handleRangeChange(e) {
		const newLength = parseInt(e.target.value, 10)
		setPassLength(newLength)
	}

	function handleCheckboxChange(e) {
		const id = e.target.id

		setCheckboxState((prev) => ({
			...prev,
			[id]: !prev[id],
		}))
	}

	return (
		<>
			<div className={styles.app}>
				<h1>Generator haseł</h1>

				<GeneratorInput
					password={password}
					hidePass={hidePass}
					generatePassword={generatePassword}
					rotatingAnimation={rotatingAnimation}
					passStrength={passStrength}
				/>
				<GeneratorButtons
					hidePass={hidePass}
					handleHidePass={handleHidePass}
					copyPass={copyPass}
					disabledCopyBtn={showModal.view}
				/>

				<LenghtSettings
					passLength={passLength}
					increaseLength={handleIncreaseLength}
					decreaseLength={handleDecreaseLength}
					handleRangeChange={handleRangeChange}
				/>
				<SignsSettings
					checkboxState={checkboxState}
					handleCheckboxChange={handleCheckboxChange}
				/>
			</div>
			{showModal.view && (
				<AlertMessage
					message={showModal.message}
					backgroundColor={showModal.backgroundColor}
				/>
			)}
		</>
	)
}

export default App
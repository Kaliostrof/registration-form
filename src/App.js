import styles from './App.module.css';
import { useRef, useState } from 'react';

const sendDataonServer = (registrationData) => {
	console.log(registrationData);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [error, setError] = useState(null);
	const buttonRef = useRef(null);

	let newError = null;

	const validationForm = (target) => {
		if (!/^[\w_%-^*]*$/.test(target.value)) {
			newError =
				'Неверная почта или пароль. Допустимые символы: буквы, цифры и _%-^*';
			setError(newError);
		} else {
			setError(null);
		}
	};

	const onLoginChange = ({ target }) => {
		setEmail(target.value);
		validationForm(target);
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);
		validationForm(target);
	};

	const onRepeatPasswordChange = ({ target }) => {
		setRepeatPassword(target.value);
		validationForm(target);
		if (target.value === password && email !== '') {
			buttonRef.current.focus();
		}
	};

	const onFormBlur = ({ target }) => {
		if (target.value.length < 3) {
			newError = 'Почта или пароль должны быть больше 3-х символов';
			setError(newError);
		} else if (target.value.length > 20) {
			newError = 'Почта или пароль должны быть меньше 20 символов';
			setError(newError);
		} else {
			setError(null);
		}
	};

	const newData = [email, password, repeatPassword];
	const isFull = newData.every((item) => {
		return item !== '';
	});

	const onSubmit = (event) => {
		event.preventDefault();

		if (isFull) {
			if (repeatPassword !== password) {
				newError = 'Пароль и введённый повторно пароль не совпадают';
				setError(newError);
			} else {
				sendDataonServer({ email, password, repeatPassword });
			}
		} else {
			newError = 'Есть незаполненные поля';
			setError(newError);
		}
	};

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit} className={styles.main}>
				{error && <div className={styles.error}>{error}</div>}
				<input
					className={styles.input}
					type="email"
					name="email"
					value={email}
					placeholder="Почта"
					onBlur={onFormBlur}
					onChange={onLoginChange}
				></input>
				<input
					className={styles.input}
					type="password"
					name="password"
					value={password}
					placeholder="Пароль"
					onChange={onPasswordChange}
				></input>
				<input
					className={styles.input}
					type="password"
					name="repeatPassword"
					value={repeatPassword}
					placeholder="Повторите пароль"
					onBlur={onFormBlur}
					onChange={onRepeatPasswordChange}
				></input>
				<button
					disabled={!!error}
					className={styles.btn}
					ref={buttonRef}
					type="submit"
					name="button"
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

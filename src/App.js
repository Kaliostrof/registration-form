import styles from './App.module.css';
import React, { useRef } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const sendDataonServer = (registrationData) => {
	console.log(registrationData);
};

const formChangeScheme = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^[\w_%-^*]*$/,
			'Неверная почта. Допустимые символы: буквы, цифры и _%-^*',
		)
		.max(20, 'Почта должна быть меньше 20 символов')
		.min(3, 'Почта должна быть больше 3-х символов')
		.email('Не соответсвует типу email!'),
	password: yup
		.string()
		.matches(
			/^[\w_%-^*]*$/,
			'Неверный пароль. Допустимые символы: буквы, цифры и _%-^*',
		)
		.max(20, 'Пароль должен быть меньше 20 символов')
		.min(3, 'Пароль должен быть больше 3-х символов'),
	repeatPassword: yup
		.string()
		.matches(
			/^[\w_%-^*]*$/,
			'Неверный пароль. Допустимые символы: буквы, цифры и _%-^*',
		)
		.max(20, 'Повторный пароль должен быть меньше 20 символов')
		.min(3, 'Повторный пароль должен быть больше 3-х символов')
		.oneOf([yup.ref('password'), null], 'Пароль и повтор пароля не совпадают'),
});

export const App = () => {
	const buttonRef = useRef(null);

	const {
		register,
		handleSubmit,
		setFocus,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
		mode: 'onChange',
		resolver: yupResolver(formChangeScheme),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const repeatPasswordError = errors.repeatPassword?.message;

	return (
		<div className={styles.app}>
			<form onSubmit={handleSubmit(sendDataonServer)} className={styles.main}>
				<input
					className={styles.input}
					type="email"
					name="email"
					placeholder="Почта"
					{...register('email')}
				></input>
				{emailError && <div className={styles.error}>{emailError}</div>}
				<input
					className={styles.input}
					type="password"
					name="password"
					placeholder="Пароль"
					{...register('password')}
				></input>
				{passwordError && <div className={styles.error}>{passwordError}</div>}
				<input
					className={styles.input}
					type="password"
					name="repeatPassword"
					placeholder="Повторите пароль"
					{...register('repeatPassword')}
					onBlur={() => {
						if (isValid) buttonRef.current.focus();
					}}
				></input>
				{repeatPasswordError && (
					<div className={styles.error}>{repeatPasswordError}</div>
				)}
				<button
					disabled={!isValid}
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

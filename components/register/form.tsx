'use client'

import { signIn } from 'next-auth/react'
import { ChangeEvent, FormEvent, useState } from 'react'

type RegisterFormState = {
	name: string
	email: string
	password: string
}

export default function RegisterForm() {
	let [isLoading, setIsLoading] = useState<boolean>(false)
	let [form, setForm] = useState<RegisterFormState>({
		name: '', email: '', password: '',
	})

	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		setIsLoading(true)

		try {
			const formData = new FormData(event.currentTarget)
			const response = await fetch('/api/services/register/', {
				method: 'POST',
				body: formData,
			})

			setIsLoading(false)

			if (!response.ok) {
				alert((await response.json()).message)

				return
			}

			console.log(JSON.stringify(response.json()))
			signIn(undefined, { callbackUrl: '/' })
		} catch (e: any) {
			setIsLoading(false)

			console.error(e)
			alert(e.message)
		}
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target

		setForm({ ...form, [name]: value })
	};

	return (
		<form
			onSubmit={onSubmit}
			style={{
				display: "flex",
				flexDirection: "column",
				width: 500,
				rowGap: 10,
			}}
		>
			<label htmlFor="name">Name</label>
			<input
				required
				type="text"
				name="name"
				value={form.name}
				onChange={handleChange}
				style={{ padding: "1rem" }}
			/>

			<label htmlFor="email">Email</label>
			<input
				required
				type="email"
				name="email"
				value={form.email}
				onChange={handleChange}
				style={{ padding: "1rem" }}
			/>

			<label htmlFor="password">Password</label>
			<input
				required
				type="password"
				name="password"
				value={form.password}
				onChange={handleChange}
				style={{ padding: "1rem" }}
			/>

			<button
				style={{
					backgroundColor: `${isLoading ? "#ccc" : "#3446eb"}`,
					color: "#fff",
					padding: "1rem",
					cursor: "pointer",
				}}
				disabled={isLoading}
			>
				{isLoading ? "loading..." : "Register"}
			</button>
		</form>
	)
}

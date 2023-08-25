// REVIEW this page should be a server component.
// It should get the data from database check it, and then display the components accordingly

'use client'

import DisplayProject from '@/components/projects/DisplayProject'
import { ModelsApiCode } from '@/lib/database/table.types'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
	params: {
		id: string
	}
}

// NOTE: Rule::Sensitive Info receive from API, other data from client
const Project = ({ params }: Props) => {
	const router = useRouter()

	async function deleteProjectButtonHandler(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault()

		const response = await fetch(`/api/services/delete/?id=${params.id}&modelCode=${ModelsApiCode.Project}`, {
			method: 'DELETE',
		});

		if (response.ok) {
			router.push('/')
		}
		else {
			console.log('Deletion Failed')
		}
	}

	return (
		<main>
			<DisplayProject id={params.id} />

			<button>edit</button>
			<br />
			<button onClick={deleteProjectButtonHandler}>delete</button>
		</main>
	)
}

export default Project

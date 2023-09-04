/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

// import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
// import { ModelsApiCode, ProjectModelProps } from '@/lib/database/table.types';

// type Props = {
// 	data: ProjectModelProps | null;
// };

// export const getStaticProps: GetStaticProps<{ data: ProjectModelProps }> = async ({ params }) => {
// 	const { id } = params || {};

// 	console.log('Server side props')

// 	if (id && typeof id === 'string') {
// 		try {
// 			const response = await fetch(
// 				`/api/services/find-unique/?id=${id}&modelCode=${ModelsApiCode.Project}`,
// 				{
// 					method: 'POST',
// 				}
// 			);

// 			console.log('trying')

// 			if (response.ok) {
// 				const { data } = await response.json();

// 				return {
// 					props: {
// 						data,
// 					},
// 				};
// 			} else {
// 				throw new Error('Failed to fetch data');
// 			}
// 		} catch (error) {
// 			console.error('Error fetching data:', error);
// 		}
// 	}

// 	return {
// 		props: {
// 			data: null,
// 		},
// 	};
// };

// const Project: NextPage<Props> = ({ data }): => {
// 	if (data) {
// 		return (
// 			<div className="project-container">
// 				<br />
// 				<br />
// 				<br />
// 				<br />

// 				<h1>{data.title}</h1>
// 				<span>{data.createdAt}</span>
// 				<p>{data.description}</p>

// 				{data.images.map((image: string) => (
// 					<span key={image}>Image Names: {image}</span>
// 				))}

// 				<br />
// 				<br />

// 				<button>edit</button>
// 				<br />
// 				<button>delete</button>
// 			</div>
// 		);
// 	}

// 	return <div className="project-container"></div>;
// };

// export default Project;

export default async function ProblemDetailsPage({ params }: { params: { id: string } }) {
	const { id } = await params;

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold">Problem ID: {id}</h1>
		</div>
	);
}

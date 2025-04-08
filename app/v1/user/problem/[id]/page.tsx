import { getProblemById } from "@/services/problem";
import ProblemDetailsClient from "./ProblemDetailsClient";

import { ProblemWithTestCase } from "@/services/problem";

export default async function ProblemDetailsPage({ params }: { params: { id: string } }) {
	const { id } = await params;
	const res = await getProblemById(Number(id));

	if (res.result !== "success") {
		throw new Error("Failed to fetch problem by ID");
	}

	const problem: ProblemWithTestCase = res.data;
	console.log("Problem Details:", problem);
	return <ProblemDetailsClient problem={problem} />;
}

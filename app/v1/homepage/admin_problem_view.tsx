import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
interface Problem {
	problem_id: number;
	contest_id: number;
	title: string;
	description: string;
	difficulty_level: string;
	repeated_times: number;
	type: string;
}

interface ProblemCardProps {
	problem: Problem;
}

export default function AdminProblemView() {
	const problems = useSelector((state: any) => state.problem.problems);
	const [filterDifficulty, setFilterDifficulty] = useState("");
	const [filterType, setFilterType] = useState("");
	const filteredProblems = problems.filter((problem: any) => {
		return (
			(filterDifficulty === "" || problem.difficulty_level === filterDifficulty) &&
			(filterType === "" || problem.type.toUpperCase().includes(filterType.toUpperCase()))
		);
	});
	const [currentPage, setCurrentPage] = useState(1);
	const problemsPerPage = 10;
	const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);
	const paginatedProblems = filteredProblems.slice((currentPage - 1) * problemsPerPage, currentPage * problemsPerPage);

	const handlePrevious = () => {
		if (currentPage > 1) setCurrentPage((prev) => prev - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
	};

	useEffect(() => {
		setCurrentPage(1);
	}, [filterDifficulty, filterType]);
	return (
		<div className="bg-white rounded-xl shadow-md overflow-x-auto">
			<table className="min-w-full table-auto text-sm">
				<thead className="bg-gray-100 text-gray-700">
					<tr>
						<th className="text-left p-4">ID</th>
						<th className="text-left p-4">Title</th>
						<th className="text-left p-4">Description</th>
						<th className="text-left p-4">
							<div className="flex flex-col">
								<span>Difficulty</span>
								<select
									value={filterDifficulty}
									onChange={(e) => setFilterDifficulty(e.target.value)}
									className="text-sm mt-1 rounded border border-gray-300 px-2 py-1">
									<option value="">All</option>
									<option value="EASY">Easy</option>
									<option value="MEDIUM">Medium</option>
									<option value="HARD">Hard</option>
								</select>
							</div>
						</th>
						<th className="text-left p-4">Repeated</th>
						<th className="text-left p-4">
							<div className="flex flex-col">
								<span>Type</span>
								<input
									type="text"
									value={filterType}
									onChange={(e) => setFilterType(e.target.value)}
									placeholder="Search type"
									className="text-sm mt-1 rounded border border-gray-300 px-2 py-1"
								/>
							</div>
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{paginatedProblems.length === 0 ? (
						<tr>
							<td
								colSpan={6}
								className="text-center py-6 text-gray-500 font-medium">
								No problems found matching your filters.
							</td>
						</tr>
					) : (
						paginatedProblems.map((problem: Problem) => (
							<ProblemCard
								key={problem.problem_id}
								problem={problem}
							/>
						))
					)}
				</tbody>
			</table>
			<div className="flex justify-between items-center mt-4 px-2">
				<button
					onClick={handlePrevious}
					disabled={currentPage === 1}
					className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50">
					Previous
				</button>
				<span className="text-sm text-gray-600">
					Page {currentPage} of {totalPages}
				</span>
				<button
					onClick={handleNext}
					disabled={currentPage === totalPages}
					className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50">
					Next
				</button>
			</div>
		</div>
	);
}

function ProblemCard({ problem }: ProblemCardProps) {
	const router = useRouter();
	const userRole = useSelector((state: any) => state.user.role);
	return (
		<tr
			className="hover:bg-gray-100 transition duration-200 cursor-pointer"
			onClick={() => router.push(`/v1/admin/problem/${problem.problem_id}`)}>
			<td className="p-4">{problem.problem_id}</td>
			<td className="p-4 max-w-[250px] truncate font-semibold text-gray-900">{problem.title}</td>
			<td className="p-4 max-w-[400px] truncate text-gray-700">{problem.description}</td>
			<td className="p-4">
				<span
					className={`text-xs font-semibold px-3 py-1 rounded-full ${
						problem.difficulty_level === "EASY"
							? "bg-green-100 text-green-700"
							: problem.difficulty_level === "MEDIUM"
							? "bg-amber-100 text-amber-700"
							: "bg-red-100 text-red-700"
					}`}>
					{problem.difficulty_level}
				</span>
			</td>
			<td className="p-4">{problem.repeated_times}</td>
			<td className="p-4">{problem.type}</td>
		</tr>
	);
}

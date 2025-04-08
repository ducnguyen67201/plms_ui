// your full UserPage component
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllProblem, Problem } from "@/services/problem";

export default function UserPage() {
	const [problems, setProblems] = useState<Problem[]>([]);
	const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
	const [error, setError] = useState<string>("");

	const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
	const [typeFilter, setTypeFilter] = useState<string>("All");
	const [searchTitle, setSearchTitle] = useState<string>("");

	const router = useRouter();

	useEffect(() => {
		const fetchProblems = async () => {
			try {
				const res = await getAllProblem();
				setProblems(res.data);
				setFilteredProblems(res.data);
			} catch (err: any) {
				setError(err.message || "Something went wrong");
			}
		};
		fetchProblems();
	}, []);

	useEffect(() => {
		let result = problems;

		if (difficultyFilter !== "All") {
			result = result.filter((p) => p.difficulty_level === difficultyFilter);
		}
		if (typeFilter !== "All") {
			result = result.filter((p) => p.type === typeFilter);
		}
		if (searchTitle.trim() !== "") {
			result = result.filter((p) => p.title.toLowerCase().includes(searchTitle.toLowerCase()));
		}
		setFilteredProblems(result);
	}, [difficultyFilter, typeFilter, searchTitle, problems]);

	const uniqueTypes = Array.from(new Set(problems.map((p) => p.type)));

	const difficultyColor = (level: string) => {
		switch (level) {
			case "Easy":
				return "text-green-500";
			case "Medium":
				return "text-yellow-500";
			case "Hard":
				return "text-red-500";
			default:
				return "text-gray-500";
		}
	};

	return (
		<div className="p-4 max-w-[1100px] mx-auto">
			<h2 className="text-2xl font-semibold mb-4 text-primary">Problem List</h2>

			<div className="flex flex-wrap gap-4 mb-6 items-center">
				<div>
					<label className="mr-2 text-sm font-medium text-textDark">Difficulty:</label>
					<select
						value={difficultyFilter}
						onChange={(e) => setDifficultyFilter(e.target.value)}
						className="border border-textLight rounded p-1 text-sm text-textDark">
						<option>All</option>
						<option>Easy</option>
						<option>Medium</option>
						<option>Hard</option>
					</select>
				</div>
				<div>
					<label className="mr-2 text-sm font-medium text-textDark">Type:</label>
					<select
						value={typeFilter}
						onChange={(e) => setTypeFilter(e.target.value)}
						className="border border-textLight rounded p-1 text-sm text-textDark">
						<option>All</option>
						{uniqueTypes.map((type) => (
							<option key={type}>{type}</option>
						))}
					</select>
				</div>
				<div>
					<input
						type="text"
						placeholder="Search by title"
						value={searchTitle}
						onChange={(e) => setSearchTitle(e.target.value)}
						className="border border-textLight rounded p-1 text-sm text-textDark placeholder:text-textLight"
					/>
				</div>
			</div>

			{error && <p className="text-accent font-medium">{error}</p>}
			<div className="overflow-x-auto">
				<table className="min-w-full text-sm text-left text-textDark border rounded-lg">
					<thead className="bg-surface text-textDark font-semibold text-sm">
						<tr>
							<th className="px-4 py-2">#</th>
							<th className="px-4 py-2">Title</th>
							<th className="px-4 py-2">Difficulty</th>
							<th className="px-4 py-2">Type</th>
							<th className="px-4 py-2">Repeated</th>
						</tr>
					</thead>
					<tbody>
						{filteredProblems.map((problem, index) => (
							<tr
								key={problem.problem_id}
								onClick={() => router.push(`/v1/user/problem/${problem.problem_id}`)}
								className="hover:bg-surface transition cursor-pointer border-b">
								<td className="px-4 py-2 text-textLight">{index + 1}</td>
								<td className="px-4 py-2 font-medium text-primary">{problem.title}</td>
								<td className={`px-4 py-2 ${difficultyColor(problem.difficulty_level)}`}>{problem.difficulty_level}</td>
								<td className="px-4 py-2">{problem.type}</td>
								<td className="px-4 py-2">{problem.repeated_times}</td>
							</tr>
						))}
						{filteredProblems.length === 0 && (
							<tr>
								<td
									colSpan={5}
									className="text-center text-textLight py-4">
									No problems found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

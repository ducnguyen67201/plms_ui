"use client";

import React, { useEffect, useState } from "react";
import { getAllProblem } from "@/services/problem";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/store/hooks";
import { setProblems } from "@/lib/store/slices/problemSlice";

// Types
type SelectedView = "PROBLEM" | "DISCUSSION" | "LEARNING_MATERIAL";

interface Problem {
	problem_id: number;
	contest_id: number;
	title: string;
	description: string;
	dififculty_level: string;
	repeated_times: number;
	type: string;
}

interface ProblemCardProps {
	problem: Problem;
	onSave?: (updated: { id: number; title: string; description: string; difficulty: string; repeatCount: number }) => void;
}

export default function AdminPage() {
	const [selectedView, setSelectedView] = useState<SelectedView>("PROBLEM");
	const dispatch = useAppDispatch();
	const problems = useSelector((state: any) => state.problem.problems);

	const fetchProblems = async () => {
		try {
			const response = await getAllProblem();
			if (response.result === "success") {
				const transformedData = response.data.map((problem: any) => ({
					...problem,
				}));
				dispatch(setProblems(transformedData));
			}
		} catch (error) {
			console.error("Error fetching problems:", error);
		}
	};

	useEffect(() => {
		fetchProblems();
	}, []);

	return (
		<div className="flex flex-col md:flex-row h-screen bg-gray-100 font-sans">
			<aside className="w-full md:w-[220px] bg-white shadow h-auto md:h-full p-4 border-b md:border-b-0 md:border-r">
				<h1 className="text-xl font-semibold mb-6 text-blue-600 text-center md:text-left">Admin Panel</h1>
				<nav className="flex md:flex-col justify-around md:justify-start space-x-4 md:space-x-0 md:space-y-3">
					{["PROBLEM", "LEARNING_MATERIAL", "DISCUSSION"].map((view) => (
						<button
							key={view}
							onClick={() => setSelectedView(view as SelectedView)}
							className="text-sm text-gray-700 hover:text-blue-600">
							{view}
						</button>
					))}
				</nav>
			</aside>

			<main className="flex-1 p-4 md:p-8 overflow-y-auto">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
					<h2 className="text-xl md:text-2xl font-bold text-gray-800">Problem Management</h2>
					<div className="flex flex-wrap gap-2">
						<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">Add Problem</button>
						<button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm">Add Material</button>
						<button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 text-sm">Add Discussion</button>
					</div>
				</div>

				{selectedView === "PROBLEM" && (
					<div className="bg-white p-4 rounded-md shadow-sm space-y-4">
						{problems.map((problem: Problem) => (
							<ProblemCard
								key={problem.problem_id}
								problem={problem}
							/>
						))}
					</div>
				)}
			</main>
		</div>
	);
}

function ProblemCard({ problem, onSave }: ProblemCardProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [editTitle, setEditTitle] = useState(problem.title);
	const [editDesc, setEditDesc] = useState(problem.description);
	const [editDifficulty, setEditDifficulty] = useState(problem.dififculty_level);
	const [editRepeat, setEditRepeat] = useState(problem.repeated_times);

	const handleSave = () => {
		onSave?.({
			id: problem.problem_id,
			title: editTitle,
			description: editDesc,
			difficulty: editDifficulty,
			repeatCount: editRepeat,
		});
		setIsOpen(false);
	};

	const difficultyColor =
		editDifficulty === "EASY" ? "bg-green-100 text-green-600" : editDifficulty === "MEDIUM" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600";

	return (
		<>
			<div
				onClick={() => setIsOpen(true)}
				className="bg-white border border-gray-200 rounded-md shadow-sm p-4 hover:shadow-md transition duration-200 cursor-pointer">
				<div className="flex justify-between items-start gap-2">
					<div className="flex-1">
						<h3 className="text-md font-semibold text-gray-800 mb-1">
							{problem.problem_id}. {problem.title}
						</h3>
						<p className="text-sm text-gray-600 line-clamp-3">{problem.description}</p>
					</div>
					<span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColor}`}>{problem.dififculty_level}</span>
				</div>
				<p className="mt-2 text-xs text-gray-500">Repeated {problem.repeated_times}x</p>
			</div>

			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
					<div className="bg-white w-[90%] md:w-[600px] rounded-lg p-6 shadow-lg relative">
						<button
							className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
							onClick={() => setIsOpen(false)}>
							×
						</button>

						<h2 className="text-xl font-bold mb-4">Edit Problem</h2>

						<div className="space-y-4">
							{/* Title */}
							<div>
								<label className="block text-sm font-medium text-gray-700">Title</label>
								<input
									type="text"
									value={editTitle}
									onChange={(e) => setEditTitle(e.target.value)}
									className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
								/>
							</div>

							{/* Description */}
							<div>
								<label className="block text-sm font-medium text-gray-700">Description</label>
								<textarea
									value={editDesc}
									onChange={(e) => setEditDesc(e.target.value)}
									rows={4}
									className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"></textarea>
							</div>

							{/* Difficulty */}
							<div>
								<label className="block text-sm font-medium text-gray-700">Difficulty</label>
								<select
									value={editDifficulty}
									onChange={(e) => setEditDifficulty(e.target.value)}
									className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
									<option value="EASY">Easy</option>
									<option value="MEDIUM">Medium</option>
									<option value="HARD">Hard</option>
								</select>
							</div>

							{/* Repeat Count */}
							<div>
								<label className="block text-sm font-medium text-gray-700">Repeated Times</label>
								<input
									type="number"
									value={editRepeat}
									onChange={(e) => setEditRepeat(Number(e.target.value))}
									className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
								/>
							</div>

							{/* Actions */}
							<div className="flex justify-end gap-3 mt-6">
								<button
									onClick={() => setIsOpen(false)}
									className="px-4 py-2 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200">
									Cancel
								</button>
								<button
									onClick={handleSave}
									className="px-4 py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700">
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

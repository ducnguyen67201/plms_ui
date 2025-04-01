"use client";

import React, { useEffect, useState } from "react";

type Difficulty = 1 | 2 | 3;

interface BaseCardProps {
	id: string;
	title: string;
	description: string;
	created_by?: string;
	date?: string;
	type?: string;
	difficulty?: Difficulty;
	repeatCount?: number;
	category?: string[];
	contextType: "PROBLEM" | "LEARNING_MATERIAL" | "DISCUSSION";
}
const sampleProblems = [
	{
		problem_id: "1",
		title: "Fix the Login Bug",
		description: "Users are unable to log in due to a server error.",
		difficulty_level: 2,
		repeated_times: [3],
	},
	{
		problem_id: "2",
		title: "Optimize Database Queries",
		description: "Improve the performance of database queries for faster load times.",
		difficulty_level: 3,
		repeated_times: [1],
	},
	{
		problem_id: "3",
		title: "Update UI Components",
		description: "Redesign the header and footer components for better user experience.",
		difficulty_level: 1,
		repeated_times: [5],
	},
];

type SelectedView = "PROBLEM" | "DISCUSSION" | "LEARNING_MATERIAL";
export default function AdminPage() {
	const [selectedView, setSelectedView] = useState<SelectedView>("PROBLEM");
	useEffect(() => {
		console.log("fetch client");
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
					<div className="bg-white p-4 rounded-md shadow-sm">
						{sampleProblems.map((problem) => (
							<Card
								contextType="PROBLEM"
								id={problem.problem_id}
								title={problem.title}
								description={problem.description}
								difficulty={problem.difficulty_level as Difficulty}
								repeatCount={problem.repeated_times[0]}
							/>
						))}
					</div>
				)}
				{selectedView === "DISCUSSION" && (
					<div className="bg-white p-4 rounded-md shadow-sm">
						{sampleProblems.map((problem) => (
							<Card
								contextType="PROBLEM"
								id={problem.problem_id}
								title={problem.title}
								description={problem.description}
								difficulty={problem.difficulty_level as Difficulty}
								repeatCount={problem.repeated_times[0]}
							/>
						))}
					</div>
				)}
				{selectedView === "LEARNING_MATERIAL" && (
					<div className="bg-white p-4 rounded-md shadow-sm">
						{sampleProblems.map((problem) => (
							<Card
								contextType="PROBLEM"
								id={problem.problem_id}
								title={problem.title}
								description={problem.description}
								difficulty={problem.difficulty_level as Difficulty}
								repeatCount={problem.repeated_times[0]}
							/>
						))}
					</div>
				)}
			</main>
		</div>
	);
}

interface BaseCardProps {
	id: string;
	title: string;
	description: string;
	created_by?: string;
	date?: string;
	type?: string;
	difficulty?: Difficulty;
	repeatCount?: number;
	category?: string[];
	contextType: "PROBLEM" | "LEARNING_MATERIAL" | "DISCUSSION";
	onSave?: (updated: Partial<BaseCardProps>) => void;
}

function Card(props: BaseCardProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [editTitle, setEditTitle] = useState(props.title);
	const [editDesc, setEditDesc] = useState(props.description);
	const [editType, setEditType] = useState(props.type ?? "");
	const [editDifficulty, setEditDifficulty] = useState(props.difficulty ?? 1);
	const [editRepeat, setEditRepeat] = useState(props.repeatCount ?? 0);

	const handleSave = () => {
		if (props.onSave) {
			props.onSave({
				id: props.id,
				title: editTitle,
				description: editDesc,
				type: editType,
				difficulty: editDifficulty,
				repeatCount: editRepeat,
			});
		}
		setIsOpen(false);
	};

	return (
		<>
			<div
				onClick={() => setIsOpen(true)}
				className="bg-white border border-gray-200 rounded-md shadow-sm p-4 hover:shadow-md transition duration-200 cursor-pointer">
				<div className="flex justify-between items-start gap-2">
					<div className="flex-1">
						<h3 className="text-md font-semibold text-gray-800 mb-1">
							{props.id}. {props.title}
						</h3>
						<p className="text-sm text-gray-600 line-clamp-3">{props.description}</p>
					</div>

					{props.contextType === "PROBLEM" && props.difficulty && (
						<span
							className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${
								props.difficulty === 1
									? "bg-green-100 text-green-600"
									: props.difficulty === 2
									? "bg-yellow-100 text-yellow-600"
									: "bg-red-100 text-red-600"
							}`}>
							{["Easy", "Medium", "Hard"][props.difficulty - 1]}
						</span>
					)}
				</div>

				{props.repeatCount !== undefined && props.contextType === "PROBLEM" && (
					<p className="mt-2 text-xs text-gray-500">Repeated {props.repeatCount}x</p>
				)}

				{props.contextType !== "PROBLEM" && (
					<p className="mt-2 text-xs text-gray-500">
						Posted by: {props.created_by} {props.date && `• ${props.date}`}
					</p>
				)}
			</div>

			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
					<div className="bg-white w-[90%] md:w-[600px] rounded-lg p-6 shadow-lg relative">
						<button
							className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
							onClick={() => setIsOpen(false)}>
							×
						</button>

						<h2 className="text-xl font-bold mb-4">Edit {props.contextType.replace("_", " ").toLowerCase()}</h2>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">Title</label>
								<input
									type="text"
									value={editTitle}
									onChange={(e) => setEditTitle(e.target.value)}
									className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">Description</label>
								<textarea
									value={editDesc}
									onChange={(e) => setEditDesc(e.target.value)}
									rows={4}
									className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"></textarea>
							</div>

							{props.contextType === "PROBLEM" && (
								<>
									<div>
										<label className="block text-sm font-medium text-gray-700">Difficulty</label>
										<select
											value={editDifficulty}
											onChange={(e) => setEditDifficulty(Number(e.target.value) as Difficulty)}
											className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
											<option value={1}>Easy</option>
											<option value={2}>Medium</option>
											<option value={3}>Hard</option>
										</select>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700">Repeated Times</label>
										<input
											type="number"
											value={editRepeat}
											onChange={(e) => setEditRepeat(Number(e.target.value))}
											className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
										/>
									</div>
								</>
							)}

							{props.contextType !== "PROBLEM" && (
								<div>
									<label className="block text-sm font-medium text-gray-700">Type</label>
									<input
										type="text"
										value={editType}
										onChange={(e) => setEditType(e.target.value)}
										className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
									/>
								</div>
							)}

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

"use client";

import React, { useState } from "react";
import { ProblemWithTestCase } from "@/services/problem";
import { ChevronDown, ChevronUp } from "lucide-react";
import { saveProblem, saveTestCase } from "@/services/problem";

export default function ProblemDetailsClient({ problem }: { problem: ProblemWithTestCase }) {
	const [formData, setFormData] = useState(problem);
	const [editingTestCases, setEditingTestCases] = useState(problem.test_cases);
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

	const updateField = (field: keyof ProblemWithTestCase, value: any) => {
		setFormData({ ...formData, [field]: value });
	};

	const updateTestCase = (index: number, field: string, value: string) => {
		const updated = [...editingTestCases];
		(updated[index] as any)[field] = value;
		setEditingTestCases(updated);
	};

	const removeTestCase = (index: number) => {
		if (window.confirm(`Are you sure you want to delete Test Case #${index + 1}? This action cannot be undone.`)) {
			editingTestCases[index].is_active = "N";
			editingTestCases[index].problem_id = formData.problem_id;
			saveTestCase(editingTestCases[index]);
		}
	};

	const toggleExpanded = (index: number) => {
		setExpandedIndex((prev) => (prev === index ? null : index));
	};

	const handleSaveProblem = () => {
		saveProblem(formData);
	};

	const handleTestCaseSave = (index: number) => {
		const testCase = editingTestCases[index];
		testCase.problem_id = formData.problem_id;
		saveTestCase(testCase);
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">Edit Problem #{formData.problem_id}</h1>

			<div className="mb-4">
				<label className="block font-semibold">Title</label>
				<input
					type="text"
					value={formData.title}
					onChange={(e) => updateField("title", e.target.value)}
					className="w-full p-2 border rounded"
				/>
			</div>

			<div className="mb-4">
				<label className="block font-semibold">Description</label>
				<textarea
					value={formData.description}
					onChange={(e) => updateField("description", e.target.value)}
					className="w-full p-2 border rounded"
					rows={4}
				/>
			</div>

			<div className="mb-4">
				<label className="block font-semibold">Method Name</label>
				<input
					type="text"
					value={formData.method_name}
					onChange={(e) => updateField("title", e.target.value)}
					className="w-full p-2 border rounded"
				/>
			</div>

			<div className="mb-4">
				<label className="block font-semibold">Skeleton Code</label>
				<textarea
					value={formData.skeleton_code}
					onChange={(e) => updateField("description", e.target.value)}
					className="w-full p-2 border rounded"
					rows={4}
				/>
			</div>

			<div className="grid grid-cols-2 gap-4 mb-6">
				<div>
					<label className="block font-semibold">Difficulty</label>
					<select
						value={formData.difficulty_level}
						onChange={(e) => updateField("difficulty_level", e.target.value)}
						className="w-full p-2 border rounded">
						<option value="EASY">EASY</option>
						<option value="MEDIUM">MEDIUM</option>
						<option value="HARD">HARD</option>
					</select>
				</div>
				<div>
					<label className="block font-semibold">Type</label>
					<input
						type="text"
						value={formData.type}
						onChange={(e) => updateField("type", e.target.value)}
						className="w-full p-2 border rounded"
					/>
				</div>
			</div>

			<h2 className="text-xl font-semibold mb-2">Test Cases ({editingTestCases.length})</h2>

			<div className="max-h-[500px] overflow-y-auto pr-2 space-y-4">
				{editingTestCases.map((test, index) => {
					const isExpanded = expandedIndex === index;

					return (
						<div
							key={test.test_case_id}
							className="border rounded shadow-sm bg-white">
							<div
								className="flex justify-between items-center p-3 bg-gray-100 cursor-pointer"
								onClick={() => toggleExpanded(index)}>
								<div className="font-medium">Test Case #{index + 1}</div>
								{isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
							</div>

							{isExpanded && (
								<div className="p-4 space-y-3">
									<div>
										<label className="block font-semibold">Input</label>
										<input
											type="text"
											value={test.input}
											onChange={(e) => updateTestCase(index, "input", e.target.value)}
											className="w-full p-2 border rounded"
										/>
									</div>

									<div>
										<label className="block font-semibold">Expected Output</label>
										<input
											type="text"
											value={test.expected_output}
											onChange={(e) => updateTestCase(index, "expected_output", e.target.value)}
											className="w-full p-2 border rounded"
										/>
									</div>

									<div>
										<label className="block font-semibold">Active?</label>
										<select
											value={test.is_active === "Y" ? "Y" : "N"}
											onChange={(e) => updateTestCase(index, "is_active", e.target.value)}
											className="w-full p-2 border rounded">
											<option value="Y">Yes</option>
											<option value="N">No</option>
										</select>
									</div>

									<div className="flex justify-between items-center">
										<button
											onClick={() => removeTestCase(index)}
											className="text-red-500 hover:underline text-sm">
											Delete Test Case
										</button>
										<button
											onClick={() => handleTestCaseSave(index)}
											className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
											Save Test Case
										</button>
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>

			<div className="mt-6">
				<button
					onClick={handleSaveProblem}
					className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
					Save Problem
				</button>
			</div>
		</div>
	);
}

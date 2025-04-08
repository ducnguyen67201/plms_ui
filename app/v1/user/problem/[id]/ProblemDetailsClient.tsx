"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ProblemWithTestCase } from "@/services/problem";
import MonacoCodeEditor from "@/app/component/CodeEditor";
import { submitSolution } from "@/services/problem"; // You'll define this API call

export default function ProblemSolveClient({ problem }: { problem: ProblemWithTestCase }) {
	const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
	const [code, setCode] = useState(problem.skeleton_code?.replaceAll("\\n", "\n") || "");

	const toggleExpanded = (index: number) => {
		setExpandedIndex((prev) => (prev === index ? null : index));
	};

	const handleSubmit = async () => {
		try {
			await submitSolution({
				problem_id: problem.problem_id ?? 0,
				code,
			});
			alert("Code submitted successfully!");
		} catch (error) {
			console.error(error);
			alert("Submission failed.");
		}
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-2xl font-bold mb-4 text-[#5A55F3]">
				{problem.problem_id}. {problem.title}
			</h1>

			<div className="mb-4 text-sm text-gray-600">
				<p>
					<strong>Difficulty:</strong> {problem.difficulty_level}
				</p>
				<p>
					<strong>Type:</strong> {problem.type}
				</p>
				<p>
					<strong>Method Name:</strong> {problem.method_name}
				</p>
			</div>

			<div className="mb-6">
				<label className="block font-semibold mb-1">Problem Description</label>
				<div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap text-sm text-gray-800">{problem.description}</div>
			</div>

			<h2 className="text-xl font-semibold mb-2">Test Cases ({problem.test_cases.length})</h2>

			<div className="max-h-[500px] overflow-y-auto pr-2 space-y-4 mb-8">
				{problem.test_cases.map((test, index) => {
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
								<div className="p-4 space-y-4 text-sm bg-gray-50 border-t">
									<div>
										<h3 className="font-semibold text-gray-700">Input</h3>
										<pre className="w-full p-3 border rounded bg-white text-gray-800 shadow-sm">
											{(() => {
												try {
													const parsed = JSON.parse(test.input);
													if (Array.isArray(parsed.args)) {
														return parsed.args.map((item: any) => (Array.isArray(item) ? `[${item.join(", ")}]` : item)).join(", ");
													}
													return test.input;
												} catch {
													return test.input;
												}
											})()}
										</pre>
									</div>
									<div>
										<h3 className="font-semibold text-gray-700">Expected Output</h3>
										<pre className="w-full p-3 border rounded bg-white text-gray-800 shadow-sm">
											{(() => {
												try {
													const parsed = JSON.parse(test.expected_output);
													return JSON.stringify(parsed.value);
												} catch {
													return test.expected_output;
												}
											})()}
										</pre>
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>

			<h2 className="text-xl font-semibold mb-2">Write Your Solution</h2>
			<div className="mb-6">
				<MonacoCodeEditor
					value={code}
					onChange={setCode}
					language="python"
					height="500px"
				/>
			</div>

			<div className="mt-6 text-right">
				<button
					onClick={handleSubmit}
					className="bg-[#5A55F3] text-white px-6 py-3 rounded hover:bg-[#4a44cc]">
					Submit Solution
				</button>
			</div>
		</div>
	);
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ProblemWithTestCase } from "@/services/problem";
import MonacoCodeEditor from "@/app/component/CodeEditor";
import { submitSolution, poolJobResult } from "@/services/problem";
import { useSelector } from "react-redux";

interface ProblemSubmitInput {
	user_id: number;
	problem_id: number;
	code: string;
	language: string;
}

export default function ProblemSolveClient({ problem }: { problem: ProblemWithTestCase }) {
	const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
	const [code, setCode] = useState(problem.skeleton_code?.replaceAll("\\n", "\n") || "");
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
	const [resultMessage, setResultMessage] = useState<string | null>(null);
	const userId = useSelector((state: any) => state.login.profile.profile_id);

	const toggleExpanded = (index: number) => {
		setExpandedIndex((prev) => (prev === index ? null : index));
	};

	const launchFireworks = () => {
		const canvas = document.getElementById("fireworks-canvas") as HTMLCanvasElement;
		if (!canvas) return;

		// Fill the entire screen
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		canvas.style.display = "block";

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const colors = ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93"];

		let fireworksLaunched = 0;
		let activeFireworks = 0;

		const createFirework = (x: number, y: number) => {
			const particles: any[] = [];
			for (let i = 0; i < 100; i++) {
				particles.push({
					x,
					y,
					radius: Math.random() * 3 + 2,
					color: colors[Math.floor(Math.random() * colors.length)],
					angle: Math.random() * 2 * Math.PI,
					speed: Math.random() * 5 + 2,
					alpha: 1,
					decay: Math.random() * 0.02 + 0.01,
				});
			}

			activeFireworks++;

			const render = () => {
				// Trailing effect: draw semi-transparent black rectangle over canvas
				ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				particles.forEach((p) => {
					p.x += Math.cos(p.angle) * p.speed;
					p.y += Math.sin(p.angle) * p.speed;
					p.alpha -= p.decay;

					ctx.globalAlpha = p.alpha;
					ctx.beginPath();
					ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
					ctx.fillStyle = p.color;
					ctx.fill();
				});

				ctx.globalAlpha = 1;
				for (let i = particles.length - 1; i >= 0; i--) {
					if (particles[i].alpha <= 0) particles.splice(i, 1);
				}

				if (particles.length > 0) {
					requestAnimationFrame(render);
				} else {
					activeFireworks--;
					if (fireworksLaunched === 20 && activeFireworks === 0) {
						ctx.clearRect(0, 0, canvas.width, canvas.height);
						canvas.style.display = "none"; // Or canvas.remove() if you want to delete it
					}
				}
			};

			render();
		};

		const launchNext = () => {
			if (fireworksLaunched >= 20) return;

			const x = Math.random() * canvas.width;
			const y = Math.random() * canvas.height;
			createFirework(x, y);
			fireworksLaunched++;

			setTimeout(launchNext, Math.random() * 400 + 100); // 100-500ms delay
		};

		// Start fresh
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		launchNext();
	};

	const handleSubmit = async () => {
		try {
			setStatus("loading");
			setResultMessage(null);

			const payload: ProblemSubmitInput = {
				user_id: userId,
				problem_id: problem.problem_id ?? 0,
				code,
				language: "python",
			};

			const result = await submitSolution(payload);
			const job_id = result.data.job_id;

			poolJobResult(
				job_id,
				(finalResult) => {
					setStatus("success");
					setResultMessage(finalResult);
					launchFireworks(); // Trigger fireworks
				},
				(errorMsg) => {
					setStatus("error");
					setResultMessage(errorMsg);
				}
			);
		} catch (err) {
			console.error(err);
			setStatus("error");
			setResultMessage("Failed to submit solution.");
		}
	};

	return (
		<div className="p-6 max-w-4xl mx-auto relative">
			{/* Canvas for fireworks */}
			<canvas
				id="fireworks-canvas"
				className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
			/>

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
								onClick={() => setExpandedIndex(isExpanded ? null : index)}>
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

			<div className="text-right mt-6">
				<button
					onClick={handleSubmit}
					disabled={status === "loading"}
					className={`flex items-center justify-center gap-2 px-6 py-3 rounded transition text-white ${
						status === "loading"
							? "bg-[#5A55F3] opacity-60 cursor-not-allowed"
							: status === "error"
							? "bg-red-600 hover:bg-red-700"
							: "bg-[#5A55F3] hover:bg-[#4a44cc]"
					}`}>
					{status === "loading" && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
					<span>{status === "loading" ? "Submitting..." : status === "error" ? "Try Again" : "Submit Solution"}</span>
				</button>

				{resultMessage && (
					<div
						className={`mt-4 p-4 rounded-md text-sm font-medium text-left shadow-sm ${
							status === "success" ? "bg-green-100 border border-green-400 text-green-700" : "bg-red-100 border border-red-400 text-red-700"
						}`}>
						{resultMessage}
					</div>
				)}
			</div>
		</div>
	);
}

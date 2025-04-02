"use client";

import React, { useEffect, useState } from "react";
import { getAllProblem } from "@/services/problem";
import { getAllDiscussions } from "@/services/discussion";
import { useAppDispatch } from "@/lib/store/hooks";
import { setProblems } from "@/lib/store/slices/problemSlice";
import { setDiscussions } from "@/lib/store/slices/discussionSlice";
import LoadingState from "@/app/component/Loading";
import dynamic from "next/dynamic";

type SelectedView = "PROBLEM" | "DISCUSSION" | "LEARNING_MATERIAL";

const LazyDiscussionView = dynamic(() => import("./admin_discussion_view"), {
	loading: () => <LoadingState />,
	ssr: false,
});

const LazyProblemView = dynamic(() => import("./admin_problem_view"), {
	loading: () => <LoadingState />,
	ssr: false,
});

export default function AdminPage() {
	const dispatch = useAppDispatch();
	const [selectedView, setSelectedView] = useState<SelectedView>("PROBLEM");

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

	const fetchDiscussions = async () => {
		try {
			const response = await getAllDiscussions();
			if (response.result === "success") {
				const transformedData = response.data.map((discussion: any) => ({
					...discussion,
				}));
				dispatch(setDiscussions(transformedData));
			}
		} catch (error) {
			console.error("Error fetching discussions:", error);
		}
	};

	useEffect(() => {
		fetchProblems();
		fetchDiscussions();
	}, []);

	return (
		<div className="px-4 sm:px-10 py-8">
			<div className="flex justify-between items-center mb-4 mx-30">
				<button
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
					onClick={() => setSelectedView("PROBLEM")}>
					PROBLEM
				</button>
				<button
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
					onClick={() => setSelectedView("DISCUSSION")}>
					DISCUSSION
				</button>
				<button
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
					onClick={() => setSelectedView("LEARNING_MATERIAL")}>
					LEARNING MATERIAL
				</button>
			</div>

			{selectedView === "PROBLEM" && <LazyProblemView />}
			{selectedView === "DISCUSSION" && <LazyDiscussionView />}
			{selectedView === "LEARNING_MATERIAL" && <div>Learning Material View</div>}
		</div>
	);
}

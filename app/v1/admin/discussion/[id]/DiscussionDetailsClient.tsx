"use client";

import React, { useState } from "react";
import { Discussion } from "@/services/discussion";
import { saveDiscussion } from "@/services/discussion";

export default function DiscussionDetailsClient({ discussion, onUpdate }: { discussion: Discussion; onUpdate?: (updated: Discussion) => void }) {
	const [title, setTitle] = useState(discussion.title);
	const [content, setContent] = useState(discussion.content);
	const [discussionLike, setDiscussionLike] = useState(discussion.discussion_like);
	const [contestId, setContestId] = useState(discussion.contest_id ?? 0);
	const [createdAt] = useState(discussion.created_date);
	const [updatedAt, setUpdatedAt] = useState(discussion.updated_at);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSave = async () => {
		setLoading(true);
		setMessage("");

		const updatedDiscussion: Discussion = {
			...discussion,
			title,
			content,
			discussion_like: discussionLike,
			contest_id: contestId,
			updated_at: new Date().toISOString(),
		};

		try {
			onUpdate?.(updatedDiscussion);
			setMessage("Changes saved successfully.");
			setUpdatedAt(updatedDiscussion.updated_at);
			saveDiscussion(updatedDiscussion);
		} catch (err) {
			console.error(err);
			setMessage("Failed to save changes.");
		}

		setLoading(false);
	};

	return (
		<div className="p-6 max-w-4xl mx-auto bg-white rounded shadow mt-10">
			<h1 className="text-2xl font-bold mb-6">Discussion #{discussion.discussion_id ?? "N/A"}</h1>

			<div className="mb-4">
				<label className="block font-semibold mb-1">Title</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>

			<div className="mb-4">
				<label className="block font-semibold mb-1">Content</label>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded h-32 resize-none"
				/>
			</div>

			<div className="mb-4">
				<label className="block font-semibold mb-1">Discussion Likes</label>
				<input
					type="number"
					value={discussionLike}
					onChange={(e) => setDiscussionLike(Number(e.target.value))}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>

			<div className="mb-4">
				<label className="block font-semibold mb-1">Contest ID</label>
				<input
					type="number"
					value={contestId}
					onChange={(e) => setContestId(Number(e.target.value))}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>

			<div className="mb-4 grid grid-cols-2 gap-4">
				<div>
					<label className="block font-semibold mb-1">Created At</label>
					<input
						type="text"
						value={
							createdAt
								? new Date(createdAt).toLocaleString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
										second: "2-digit",
								  })
								: "N/A"
						}
						readOnly
						className="w-full p-2 border border-gray-200 bg-gray-100 rounded"
					/>
				</div>

				<div>
					<label className="block font-semibold mb-1">Updated At</label>
					<input
						type="text"
						value={
							updatedAt
								? new Date(updatedAt).toLocaleString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
										second: "2-digit",
										timeZoneName: "short",
								  })
								: "N/A"
						}
						readOnly
						className="w-full p-2 border border-gray-200 bg-gray-100 rounded"
					/>
				</div>
			</div>

			<div className="flex items-center gap-4">
				<button
					onClick={handleSave}
					disabled={loading}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
					{loading ? "Saving..." : "Save Changes"}
				</button>
				{message && <p className="text-sm text-green-600">{message}</p>}
			</div>
		</div>
	);
}

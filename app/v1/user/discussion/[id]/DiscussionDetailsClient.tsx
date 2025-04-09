"use client";

import React, { useEffect, useState } from "react";
import { Discussion } from "@/services/discussion";
import { createComment, GetCommentByDiscussionId } from "@/services/discussion";
import { Comment } from "@/services/discussion";
import { useSelector } from "react-redux";

export default function UserDiscussionDetailsClient({ discussion }: { discussion: Discussion }) {
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState<Comment[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const user_id = useSelector((state: any) => state.login.user_id);

	const fetchComments = async () => {
		try {
			setLoading(true);
			const res = await GetCommentByDiscussionId(discussion.discussion_id);
			setComments(res.data?.comment || []);
			console.log(comments);
		} catch (err: any) {
			setError(err.message || "Failed to fetch comments");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchComments();
	}, []);

	const handleCommentSubmit = async () => {
		if (!newComment.trim()) return;

		const commentPayload = {
			discussion_id: discussion.discussion_id,
			user_id,
			user_comment: newComment,
		};

		try {
			await createComment(commentPayload);
			setNewComment("");
			await fetchComments();
		} catch (err: any) {
			setError(err.message || "Failed to submit comment");
		}
	};

	return (
		<div className="p-6 max-w-[1100px] mx-auto bg-white rounded shadow mt-10">
			<h1 className="text-2xl font-bold mb-6 text-primary">Discussion #{discussion.discussion_id ?? "N/A"}</h1>

			<div className="mb-6">
				<h2 className="text-lg font-semibold text-gray-800 mb-1">Title</h2>
				<p className="text-gray-900">{discussion.title}</p>
			</div>

			<div className="mb-6">
				<h2 className="text-lg font-semibold text-gray-800 mb-1">Content</h2>
				<p className="text-gray-700 whitespace-pre-line">{discussion.content}</p>
			</div>

			<div className="grid grid-cols-2 gap-6 mb-6">
				<div>
					<h2 className="text-sm font-medium text-gray-600 mb-1">Discussion Likes</h2>
					<p className="text-gray-800">{discussion.discussion_like}</p>
				</div>
				<div>
					<h2 className="text-sm font-medium text-gray-600 mb-1">Contest ID</h2>
					<p className="text-gray-800">{discussion.contest_id ?? "N/A"}</p>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-6 mb-6">
				<div>
					<h2 className="text-sm font-medium text-gray-600 mb-1">Created At</h2>
					<p className="text-gray-700">{discussion.created_date ? new Date(discussion.created_date).toLocaleString() : "N/A"}</p>
				</div>
				<div>
					<h2 className="text-sm font-medium text-gray-600 mb-1">Updated At</h2>
					<p className="text-gray-700">{discussion.updated_at ? new Date(discussion.updated_at).toLocaleString() : "N/A"}</p>
				</div>
			</div>

			<div className="mt-8">
				<h2 className="text-xl font-semibold mb-3 text-primary">Leave a Comment</h2>
				<textarea
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					placeholder="Write your comment here..."
					className="w-full h-28 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary text-sm"
				/>

				<div className="text-right mt-6">
					<button
						onClick={handleCommentSubmit}
						disabled={loading || !newComment.trim()}
						className={`flex items-center justify-center gap-2 px-6 py-3 rounded transition text-white ${
							loading || !newComment.trim()
								? "bg-[#5A55F3] opacity-60 cursor-not-allowed"
								: error
								? "bg-red-600 hover:bg-red-700"
								: "bg-[#5A55F3] hover:bg-[#4a44cc]"
						}`}>
						{loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
						<span>{loading ? "Submitting..." : error ? "Try Again" : "Submit Comment"}</span>
					</button>
				</div>
			</div>

			<div className="mt-10">
				<h2 className="text-xl font-semibold text-primary mb-4">Comments</h2>
				{loading ? (
					<p>Loading comments...</p>
				) : error ? (
					<p className="text-red-500">{error}</p>
				) : comments.length === 0 ? (
					<p className="text-gray-500">No comments yet.</p>
				) : (
					<div className="space-y-4">
						{comments.map((comment, index) => (
							<div
								key={index}
								className="bg-gray-50 p-4 border rounded shadow-sm">
								<p className="text-sm text-gray-600 font-semibold">{comment.username}</p>
								<p className="text-gray-800">{comment.user_comment}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Discussion } from "@/services/discussion";

interface DiscussionCardProps {
	discussion: Discussion;
}

export default function AdminDiscussionView() {
	const discussions = useSelector((state: any) => state.discussion.discussions);
	const [filterTitle, setFilterTitle] = useState("");
	const [filterContent, setFilterContent] = useState("");

	const filteredDiscussions = discussions.filter((discussion: Discussion) => {
		return (
			(filterTitle === "" || discussion.title.toUpperCase().includes(filterTitle.toUpperCase())) &&
			(filterContent === "" || discussion.content.toUpperCase().includes(filterContent.toUpperCase()))
		);
	});

	const [currentPage, setCurrentPage] = useState(1);
	const discussionsPerPage = 10;
	const totalPages = Math.ceil(filteredDiscussions.length / discussionsPerPage);

	const paginatedDiscussions = filteredDiscussions.slice((currentPage - 1) * discussionsPerPage, currentPage * discussionsPerPage);

	const handlePrevious = () => {
		if (currentPage > 1) setCurrentPage((prev) => prev - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
	};

	useEffect(() => {
		setCurrentPage(1);
	}, [filterTitle, filterContent]);

	return (
		<div className="bg-white rounded-xl shadow-md overflow-x-auto">
			<table className="min-w-full table-auto text-sm">
				<thead className="bg-gray-100 text-gray-700">
					<tr>
						<th className="text-left p-4">ID</th>
						<th className="text-left p-4">
							<div className="flex flex-col">
								<span>Title</span>
								<input
									type="text"
									value={filterTitle}
									onChange={(e) => setFilterTitle(e.target.value)}
									placeholder="Search title"
									className="text-sm mt-1 rounded border border-gray-300 px-2 py-1"
								/>
							</div>
						</th>
						<th className="text-left p-4">
							<div className="flex flex-col">
								<span>Content</span>
								<input
									type="text"
									value={filterContent}
									onChange={(e) => setFilterContent(e.target.value)}
									placeholder="Search content"
									className="text-sm mt-1 rounded border border-gray-300 px-2 py-1"
								/>
							</div>
						</th>
						<th className="text-left p-4">Like</th>
						<th className="text-left p-4">Created At</th>
						<th className="text-left p-4">Updated At</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{paginatedDiscussions.length === 0 ? (
						<tr>
							<td
								colSpan={5}
								className="text-center py-6 text-gray-500 font-medium">
								No discussions found matching your filters.
							</td>
						</tr>
					) : (
						paginatedDiscussions.map((discussion: Discussion) => (
							<DiscussionCard
								key={discussion.discussion_id}
								discussion={discussion}
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

function DiscussionCard({ discussion }: DiscussionCardProps) {
	const router = useRouter();
	const userRole = useSelector((state: any) => state.login.role);
	return (
		<tr
			className="hover:bg-gray-100 transition duration-200 cursor-pointer"
			onClick={() =>
				router.push(userRole === "admin" ? `/v1/admin/discussion/${discussion.discussion_id}` : `/v1/user/discussion/${discussion.discussion_id}`)
			}>
			<td className="p-4">{discussion.discussion_id}</td>
			<td className="p-4 max-w-[250px] truncate font-semibold text-gray-900">{discussion.title}</td>
			<td className="p-4 max-w-[400px] truncate text-gray-700">{discussion.content}</td>
			<td className="p-4 text-gray-600">{discussion.discussion_like}</td>
			<td className="p-4 text-gray-600">{new Date(discussion.created_at).toLocaleDateString()}</td>
			<td className="p-4 text-gray-600">{new Date(discussion.updated_at).toLocaleDateString()}</td>
		</tr>
	);
}

"use client";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LearningMaterial } from "@/services/learning_material";

interface LearningMaterialCardProps {
	material: LearningMaterial;
}

export default function AdminLearningMaterialView() {
	const materials = useSelector((state: any) => state.learningMaterial.materials);
	const [filterTitle, setFilterTitle] = useState("");
	const [filterContent, setFilterContent] = useState("");
	const [filterPostedBy, setFilterPostedBy] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const materialsPerPage = 10;

	const filteredMaterials = materials.filter((material: LearningMaterial) => {
		const matchesTitle = material.title.toLowerCase().includes(filterTitle.toLowerCase());
		const matchesContent = material.content.toLowerCase().includes(filterContent.toLowerCase());
		const matchesPostedBy = material.posted_by.toString().toLowerCase().includes(filterPostedBy.toLowerCase());
		return matchesTitle && matchesContent && matchesPostedBy;
	});

	const totalPages = Math.ceil(filteredMaterials.length / materialsPerPage);
	const paginatedMaterials = filteredMaterials.slice((currentPage - 1) * materialsPerPage, currentPage * materialsPerPage);

	useEffect(() => {
		setCurrentPage(1); // reset page on filter change
	}, [filterTitle, filterContent, filterPostedBy]);

	const handlePrevious = () => {
		if (currentPage > 1) setCurrentPage((prev) => prev - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
	};

	return (
		<div className="bg-white rounded-xl shadow-md overflow-x-auto">
			<table className="min-w-full table-auto text-sm">
				<thead className="bg-gray-100 text-gray-700">
					<tr>
						<th className="text-left p-4">ID</th>
						<th className="text-left p-4">Title</th>
						<th className="text-left p-4">Posted By</th>
						<th className="text-left p-4">Content</th>
						<th className="text-left p-4">Date</th>
					</tr>
					<tr className="bg-white">
						<th></th>
						<th className="p-4">
							<input
								type="text"
								value={filterTitle}
								onChange={(e) => setFilterTitle(e.target.value)}
								placeholder="Filter title"
								className="text-sm w-full rounded border border-gray-300 px-2 py-1"
							/>
						</th>
						<th className="p-4">
							<input
								type="text"
								value={filterPostedBy}
								onChange={(e) => setFilterPostedBy(e.target.value)}
								placeholder="Filter posted by"
								className="text-sm w-full rounded border border-gray-300 px-2 py-1"
							/>
						</th>
						<th className="p-4">
							<input
								type="text"
								value={filterContent}
								onChange={(e) => setFilterContent(e.target.value)}
								placeholder="Filter content"
								className="text-sm w-full rounded border border-gray-300 px-2 py-1"
							/>
						</th>
						<th></th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{paginatedMaterials.length === 0 ? (
						<tr>
							<td
								colSpan={5}
								className="text-center py-6 text-gray-500 font-medium">
								No materials found matching your filters.
							</td>
						</tr>
					) : (
						paginatedMaterials.map((material: LearningMaterial) => (
							<LearningMaterialCard
								key={material.material_id ?? Math.random()}
								material={material}
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

function LearningMaterialCard({ material }: LearningMaterialCardProps) {
	const router = useRouter();
	const userRole = useSelector((state: any) => state.login.role);
	return (
		<tr
			className="hover:bg-gray-100 transition duration-200 cursor-pointer"
			onClick={() => router.push(userRole === "admin" ? `/v1/admin/learning/${material.material_id}` : `/v1/user/learning/${material.material_id}`)}>
			<td className="p-4">{material.material_id}</td>
			<td className="p-4 font-medium text-gray-900">{material.title}</td>
			<td className="p-4">{material.posted_by}</td>
			<td className="p-4 max-w-[300px] truncate text-gray-700">{material.content}</td>
			<td className="p-4">{material.material_date}</td>
		</tr>
	);
}

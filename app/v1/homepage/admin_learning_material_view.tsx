"use client";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LearningMaterial } from "@/services/learning_material";

interface LearningMaterialCardProps {
	material: LearningMaterial;
}

export default function AdminLearningMaterialView() {
	const materials = useSelector((state: any) => state.learningMaterial.materials); // Adjust slice name as needed
	const [filterType, setFilterType] = useState("");
	const [filterPostedBy, setFilterPostedBy] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const materialsPerPage = 10;

	const filteredMaterials = materials.filter((material: LearningMaterial) => {
		return (
			(filterType === "" || material.material_type.toLowerCase().includes(filterType.toLowerCase())) &&
			(filterPostedBy === "" || material.posted_by.toLowerCase().includes(filterPostedBy.toLowerCase()))
		);
	});

	const totalPages = Math.ceil(filteredMaterials.length / materialsPerPage);
	const paginatedMaterials = filteredMaterials.slice((currentPage - 1) * materialsPerPage, currentPage * materialsPerPage);

	useEffect(() => {
		setCurrentPage(1); // reset page on filter change
	}, [filterType, filterPostedBy]);

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
						<th className="text-left p-4">Type</th>
						<th className="text-left p-4">Posted By</th>
						<th className="text-left p-4">Content</th>
						<th className="text-left p-4">Date</th>
					</tr>
					<tr className="bg-white">
						<th></th>
						<th></th>
						<th className="p-4">
							<input
								type="text"
								value={filterType}
								onChange={(e) => setFilterType(e.target.value)}
								placeholder="Filter by type"
								className="text-sm w-full rounded border border-gray-300 px-2 py-1"
							/>
						</th>
						<th className="p-4">
							<input
								type="text"
								value={filterPostedBy}
								onChange={(e) => setFilterPostedBy(e.target.value)}
								placeholder="Filter by poster"
								className="text-sm w-full rounded border border-gray-300 px-2 py-1"
							/>
						</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{paginatedMaterials.length === 0 ? (
						<tr>
							<td
								colSpan={6}
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

	return (
		<tr
			className="hover:bg-gray-100 transition duration-200 cursor-pointer"
			onClick={() => router.push(`/v1/admin/learning/${material.material_id}`)}>
			<td className="p-4">{material.material_id}</td>
			<td className="p-4 font-medium text-gray-900">{material.title}</td>
			<td className="p-4">{material.material_type}</td>
			<td className="p-4">{material.posted_by}</td>
			<td className="p-4 max-w-[300px] truncate text-gray-700">{material.content}</td>
			<td className="p-4">{material.material_date}</td>
		</tr>
	);
}

"use client";

import React from "react";
import { LearningMaterial } from "@/services/learning_material";

export default function LearningMaterialDetailsClient({ material }: { material: LearningMaterial }) {
	return (
		<div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow mt-10 mb-10">
			<h1 className="text-3xl font-bold mb-6 text-blue-700">Learning Material Details</h1>

			<div className="mb-6">
				<h2 className="text-lg font-semibold text-gray-700">Title</h2>
				<p className="text-gray-900 text-base">{material.title}</p>
			</div>

			<div className="mb-6">
				<h2 className="text-lg font-semibold text-gray-700">Content</h2>
				<p className="text-gray-800 whitespace-pre-line">{material.content}</p>
			</div>

			<div className="grid grid-cols-2 gap-6 mb-6">
				<div>
					<h2 className="text-sm font-medium text-gray-600">Material Category ID</h2>
					<p className="text-gray-800">{material.material_category_id ?? "N/A"}</p>
				</div>
				<div>
					<h2 className="text-sm font-medium text-gray-600">Posted By (User ID)</h2>
					<p className="text-gray-800">{material.posted_by ?? "N/A"}</p>
				</div>
			</div>

			<div className="mb-4">
				<h2 className="text-sm font-medium text-gray-600">Material Date</h2>
				<p className="text-gray-700">
					{material.material_date
						? new Date(material.material_date).toLocaleString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
								second: "2-digit",
								timeZoneName: "short",
						  })
						: "N/A"}
				</p>
			</div>
		</div>
	);
}

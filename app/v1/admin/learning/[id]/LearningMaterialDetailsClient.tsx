"use client";

import React, { useState } from "react";
import { LearningMaterial, saveLearningMaterial } from "@/services/learning_material";

export default function LearningMaterialDetailsClient({ material, onUpdate }: { material: LearningMaterial; onUpdate?: (updated: LearningMaterial) => void }) {
	const [title, setTitle] = useState(material.title);
	const [content, setContent] = useState(material.content);
	const [materialCategoryId, setMaterialCategoryId] = useState<number | null>(material.material_category_id);
	const [postedBy, setPostedBy] = useState(material.posted_by);
	const [materialDate, setMaterialDate] = useState(material.material_date);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSave = async () => {
		setLoading(true);
		setMessage("");

		const { material_date, ...rest } = material;
		const updatedMaterial: LearningMaterial = {
			...rest,
			title,
			content,
			material_category_id: materialCategoryId,
			posted_by: postedBy,
		};

		try {
			onUpdate?.(updatedMaterial);
			await saveLearningMaterial(updatedMaterial);
			setMessage("Material updated successfully.");
			setMaterialDate(updatedMaterial.material_date);
		} catch (err) {
			console.error(err);
			setMessage("Failed to update material.");
		}

		setLoading(false);
	};

	return (
		<div className="p-6 max-w-4xl mx-auto bg-white rounded shadow mt-5 mb-10">
			<h1 className="text-2xl font-bold mb-6">Learning Material #{material.material_id ?? "N/A"}</h1>

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
				<label className="block font-semibold mb-1">Material Category ID</label>
				<input
					type="number"
					value={materialCategoryId ?? ""}
					onChange={(e) => setMaterialCategoryId(e.target.value ? Number(e.target.value) : null)}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>

			<div className="mb-4">
				<label className="block font-semibold mb-1">Posted By (User ID)</label>
				<input
					type="number"
					value={postedBy}
					onChange={(e) => setPostedBy(Number(e.target.value))}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>

			<div className="mb-6">
				<label className="block font-semibold mb-1">Material Date</label>
				<input
					type="text"
					value={
						materialDate
							? new Date(materialDate).toLocaleString("en-US", {
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
					className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-600"
				/>
			</div>

			<div className="flex items-center gap-4">
				<button
					onClick={handleSave}
					disabled={loading}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
					{loading ? "Saving..." : "Save Changes"}
				</button>
				{message && <p className="text-sm text-gray-600">{message}</p>}
			</div>
		</div>
	);
}

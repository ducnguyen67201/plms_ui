"use client";
import { useState } from "react";
import MonacoCodeEditor from "@/app/component/CodeEditor";
export default function UserPage() {
	const [code, setCode] = useState<string>("");
	return (
		<div className="p-4">
			<h2>Online Code Editor</h2>
			<MonacoCodeEditor
				value={code}
				onChange={setCode}
				language="python"
				height="500px"
			/>
		</div>
	);
}

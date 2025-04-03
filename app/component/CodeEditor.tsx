"use client";

import dynamic from "next/dynamic";
import { useCallback } from "react";

// Dynamically import MonacoEditor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
	ssr: false,
});

interface MonacoCodeEditorProps {
	value: string;
	onChange: (value: string) => void;
	height?: string;
	language?: string;
}

export default function MonacoCodeEditor({ value, onChange, height = "500px", language = "python" }: MonacoCodeEditorProps) {
	// Handle change event from the editor
	const handleEditorChange = useCallback(
		(value: string | undefined) => {
			onChange(value || "");
		},
		[onChange]
	);

	return (
		<MonacoEditor
			height={height}
			defaultLanguage={language}
			defaultValue={value}
			value={value}
			onChange={handleEditorChange}
			theme="vs-dark"
			options={{
				fontSize: 16,
				minimap: { enabled: false },
				automaticLayout: true,
				scrollBeyondLastLine: false,
			}}
		/>
	);
}

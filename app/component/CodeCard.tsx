import React from "react";
import type { ReactNode } from "react";

interface CardProps {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => {
	const baseClasses = "bg-white shadow-sm border border-gray-200 rounded-xl p-4 transition hover:shadow-md";

	const combinedClasses = `${baseClasses} ${onClick ? "cursor-pointer" : ""} ${className}`;

	return (
		<div
			onClick={onClick}
			className={combinedClasses}>
			{children}
		</div>
	);
};

export default Card;

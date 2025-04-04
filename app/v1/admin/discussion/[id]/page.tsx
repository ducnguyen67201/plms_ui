import { getDiscussionById } from "@/services/discussion";
import DiscussionDetailsClient from "./DiscussionDetailsClient";
import { Discussion } from "@/services/discussion";
export default async function DiscussionPage({ params }: { params: { id: string } }) {
	const { id } = await params;
	const res = await getDiscussionById(Number(id));
	if (res.result !== "success") {
		throw new Error("Failed to fetch discussion by ID");
	}

	const discussion: Discussion = res.data;
	console.log("Discussion Details:", discussion);
	return <DiscussionDetailsClient discussion={discussion} />;
}

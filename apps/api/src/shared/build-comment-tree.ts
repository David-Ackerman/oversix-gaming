export type CommentWithExtras = {
	id: string;
	content: string;
	postId: string;
	authorId: string;
	parentCommentId: string | null;
	createdAt: Date;
	author: {
		id: string;
		name: string;
		avatarUrl: string | null;
	} | null;
	likes: number;
};

type CommentTree = CommentWithExtras & { replies: CommentTree[] };

export function buildCommentTree(
	flatComments: CommentWithExtras[],
): CommentTree[] {
	const map = new Map<string, CommentTree>();
	const roots: CommentTree[] = [];

	for (const comment of flatComments) {
		map.set(comment.id, { ...comment, replies: [] });
	}

	for (const comment of flatComments) {
		if (comment.parentCommentId) {
			const parent = map.get(comment.parentCommentId);
			parent?.replies.push(map.get(comment.id) as CommentTree);
		} else {
			roots.push(map.get(comment.id) as CommentTree);
		}
	}

	return roots;
}

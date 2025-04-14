import { comments } from './comments'
import { postMetrics } from './post-metrics'
import { postTags } from './post-tags'
import { posts } from './posts'
import { users } from './users'

export const schema = {
  users: users,
  postMetrics: postMetrics,
  postTags: postTags,
  posts: posts,
  comments: comments,
}
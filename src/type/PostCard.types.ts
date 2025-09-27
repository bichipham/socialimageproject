export type PostCardProps = {
  id: number
  image: string
  title: string
  body: string
  tags: string[]
  user: string
  comments: number
  views: number
}


export type Comment = {
  id: number
  user: {
    id: number
    username: string
    fullName: string
  }
  body: string
  postId: number
  likes: number
}

export type ListComment = {
  comments: Comment[]
  limit: number
  skip: number
  total: number
}


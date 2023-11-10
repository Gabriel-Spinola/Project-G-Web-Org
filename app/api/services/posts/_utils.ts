export const tempIncludeForUser = {
  include: {
    author: {
      select: { name: true, image: true, profilePic: true },
    },
    contributor: { select: { name: true } },
    likes: { select: { id: true, userId: true } },
    comments: {
      include: {
        author: { select: { name: true, profilePic: true, image: true } },
        likes: { select: { id: true, userId: true } },
        replies: {
          include: {
            author: {
              select: { name: true, profilePic: true, image: true },
            },
            likes: { select: { id: true, userId: true } },
          },
        },
      },
    },
  },
}

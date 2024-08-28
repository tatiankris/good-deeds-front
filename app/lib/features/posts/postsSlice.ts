import { createSlice } from '@reduxjs/toolkit'

export type PostsStateType = {
  count: null | string
  posts: Post[] | null
  loading: boolean
  error: string | null
}

const initialState: PostsStateType = {
  count: null,
  posts: null,
  loading: false,
  error: null
} as PostsStateType

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setAllPosts(state, action) {
      const { rows, count } = action.payload
      state.posts = rows
      state.count = count
    },
    setPost(state, action) {
      state.posts.push(action.payload)
      state.count = ++state.count
    },
    updatePost(state, action) {
      let post = state.posts.find(post => post.id === action.payload.id)
      post = action.payload
    },
    deletePost(state, action) {
      state.posts = state.posts.filter(post => post.id !== action.payload)
      state.count = action.count - 1
    },
    cleanPosts(state) {
      state.posts = null
      state.loading = false
      state.error = null
    },
    setPostsLoading(state, action) {
      if (action.payload) {
        state.loading = true
      } else {
        state.loading = false
      }
    },
    setPostsError(state, action) {
      if (action.payload) {
        state.loading = action.payload
      } else {
        state.loading = null
      }
    }
  }
})

export const {deletePost, updatePost, setAllPosts, setPost, setPostsLoading, setPostsError, cleanPosts} = postsSlice.actions
export default postsSlice.reducer

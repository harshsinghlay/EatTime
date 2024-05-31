import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBlogs: [],
  myBlogs: [],
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlog: (state, action) => {
      const blogToAdd = action.payload;
      if (blogToAdd) {
        state.allBlogs.push(action.payload);
        state.myBlogs.push(action.payload);
      }
    },
    deleteBlog: (state, action) => {
      const id = action.payload;
      state.allBlogs = state.allBlogs.filter((blog) => blog.id != id);
      state.myBlogs = state.myBlogs.filter((blog) => blog.id != id);
    },
    updateBlog: (state, action) => {
      const { oldId, updatedBlog } = action.payload;
      state.allBlogs = state.allBlogs.map((blog) =>
        blog.id === oldId ? updatedBlog : blog
      );
      state.myBlogs = state.myBlogs.map((blog) =>
        blog.id === oldId ? updatedBlog : blog
      );
    },
    setAllBlogs: (state, action) => {
      console.log("Setting My blogs ",action.payload);
      state.allBlogs = action.payload;
    },
    setMyBlogs: (state, action) => {
      console.log("Setting All Blogs ",action.payload);
      state.myBlogs = action.payload;
    },
  },
});

export const { addBlog, deleteBlog, updateBlog, setAllBlogs, setMyBlogs } =
blogSlice.actions;
export default blogSlice.reducer;

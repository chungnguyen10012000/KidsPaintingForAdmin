import { IBlog, BlogModificationStatus } from "../models/blog.interface";

export const EDIT_BLOG: string = "EDIT_BLOG";
export const ADD_BLOG: string = "ADD_BLOG";
export const REMOVE_BLOG: string = "REMOVE_BLOG";
export const REMOVE_BLOG_WAIT: string = "REMOVE_BLOG_WAIT"
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const CHANGE_BLOG_PENDING_EDIT: string = "CHANGE_BLOG_PENDING_EDIT";
export const CLEAR_BLOG_PENDING_EDIT: string = "CLEAR_BLOG_PENDING_EDIT";

export function addBlog(blog: IBlog): IAddBlogActionType {
    return { type: ADD_BLOG, blog: blog };
}

export function removeBlog(id: number): IRemoveBlogActionType {
    return { type: REMOVE_BLOG, id: id };
}

export function removeBlogWait(id: number): IRemoveBlogActionType{
    return { type: REMOVE_BLOG_WAIT, id: id };
}

export function editBlog(blog: IBlog): IEditBlogActionType {
    return { type: EDIT_BLOG, blog: blog };
}

export function setModificationState(value: BlogModificationStatus): ISetModificationStateActionBlog {
    return { type: SET_MODIFICATION_STATE, value: value };
}

export function changeSelectedBlog(blog: IBlog): IChangeSelectedBlogActionType {
    return { type: CHANGE_BLOG_PENDING_EDIT, blog: blog };
}

export function clearSelectedBlog(): IClearSelectedBlogActionType {
    return { type: CLEAR_BLOG_PENDING_EDIT };
}



interface IEditBlogActionType { type: string, blog: IBlog };
interface IAddBlogActionType { type: string, blog: IBlog };
interface IRemoveBlogActionType { type: string, id: number };
interface ISetModificationStateActionBlog { type: string, value:  BlogModificationStatus};
interface IChangeSelectedBlogActionType { type: string, blog: IBlog };
interface IClearSelectedBlogActionType { type: string };


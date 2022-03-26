import { IBlog, BlogModificationStatus } from "../models/blogs.innterface";
export const ADD_BLOG: string = "ADD_BLOG";
export const EDIT_BLOG: string = "EDIT_BLOG";
export const REMOVE_BLOG: string = "REMOVE_BLOG";
export const CHANGE_BLOG_AMOUNT: string = "CHANGE_BLOG_AMOUNT";
export const CHANGE_BLOG_PENDING_EDIT: string = "CHANGE_BLOG_PENDING_EDIT";
export const CLEAR_BLOG_PENDING_EDIT: string = "CLEAR_BLOG_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";

export function addBlog(blog: IBlog): IAddBlogActionType {
    return { type: ADD_BLOG, blog: blog };
}

export function editBlog(blog: IBlog): IEditBlogActionType {
    return { type: EDIT_BLOG, blog: blog };
}

export function removeBlog(id: number): IRemoveBlogActionType {
    return { type: REMOVE_BLOG, id: id };
}

export function changeBlogAmount(id: number, amount: number): IChangeBlogAmountType {
    return { type: CHANGE_BLOG_AMOUNT, id: id, amount: amount };
}

export function changeSelectedBlog(blog: IBlog): IChangeSelectedBlogActionType {
    return { type: CHANGE_BLOG_PENDING_EDIT, blog: blog };
}

export function clearSelectedBlog(): IClearSelectedBlogActionType {
    return { type: CLEAR_BLOG_PENDING_EDIT };
}

export function setModificationState(value: BlogModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddBlogActionType { type: string, blog: IBlog };
interface IEditBlogActionType { type: string, blog: IBlog };
interface IRemoveBlogActionType { type: string, id: number };
interface IChangeSelectedBlogActionType { type: string, blog: IBlog };
interface IClearSelectedBlogActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  BlogModificationStatus};
interface IChangeBlogAmountType {type: string, id: number, amount: number};
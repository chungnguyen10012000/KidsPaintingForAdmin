import { IBlogState, IActionBase } from "../models/root.interface";
import { EDIT_BLOG, ADD_BLOG, REMOVE_BLOG, REMOVE_BLOG_WAIT} from "../actions/blog.actions";
import { IBlog, BlogModificationStatus } from "../models/blog.interface";

const initialState: IBlogState = {
    modificationState: BlogModificationStatus.None,
    selectedBlog: null,
    blogs: [
        { id: 1, email: "nvlong00@gmail.com", description: 'hello'},
        { id: 2, email: "ohmy@fr.pl", description: 'hello2' }
    ],
    blogAccept: [
        { id: 3, email: "jcrock@em.pl", description: '' },
    ]
};

function blogReducer(state: IBlogState = initialState, action: IActionBase): IBlogState {
    switch (action.type) {
        case EDIT_BLOG: {
            const foundIndex: number = state.blogAccept.findIndex(pr => pr.id === action.blog.id);
            let blogAccept: IBlog[] = state.blogAccept;
            blogAccept[foundIndex] = action.blog;
            return { ...state, blogAccept: blogAccept };
        }
        case ADD_BLOG: {
            let maxId: number = Math.max.apply(Math, state.blogAccept.map(function(o) { return o.id; }));
            action.blog.id = maxId + 1;
            return { ...state, blogs: state.blogs.filter(x=>x.id !== action.blog.id), blogAccept: [...state.blogAccept, action.blog]};
        }
        case REMOVE_BLOG: {
            return { ...state, blogAccept: state.blogAccept.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_BLOG_WAIT: {
            return { ...state, blogs: state.blogs.filter(pr => pr.id !== action.id) };
        }
        default:
            return state;
    }
}

export default blogReducer;
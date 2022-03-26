import { IBlogState, IActionBase } from "../models/root.interface";
import { ADD_BLOG, CHANGE_BLOG_PENDING_EDIT, EDIT_BLOG, REMOVE_BLOG,
    CLEAR_BLOG_PENDING_EDIT, SET_MODIFICATION_STATE, CHANGE_BLOG_AMOUNT} from "../actions/blogs.actions";
import { IBlog, BlogModificationStatus } from "../models/blogs.innterface";



const initialState: IBlogState = {
    modificationState: BlogModificationStatus.None,
    selectedBlog: null,
    blogs: [{
        id: 1, name: "Hello", description: "<p></p>",
    }]
};

function blogReducer(state: IBlogState = initialState, action: IActionBase): IBlogState {
    switch (action.type) {
        case ADD_BLOG: {
            let maxId: number = Math.max.apply(Math, state.blogs.map(function(o) { return o.id; }));
            action.blog.id = maxId + 1;
            return { ...state, blogs: [...state.blogs, action.blog]};
        }
        case EDIT_BLOG: {
            const foundIndex: number = state.blogs.findIndex(pr => pr.id === action.blog.id);
            let blog: IBlog[] = state.blogs;
            blog[foundIndex] = action.blog;
            return { ...state, blogs: blog };
        }
        case REMOVE_BLOG: {
            return { ...state, blogs: state.blogs.filter(pr => pr.id !== action.id) };
        }
        case CHANGE_BLOG_PENDING_EDIT: {
            return { ...state, selectedBlog: action.blog };
        }
        case CLEAR_BLOG_PENDING_EDIT: {
            return { ...state, selectedBlog: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        case CHANGE_BLOG_AMOUNT: {
            const foundIndex: number = state.blogs.findIndex(pr => pr.id === action.id);
            let blog: IBlog[] = state.blogs;
            blog[foundIndex].id = blog[foundIndex].id - action.amount;
            return { ...state, blogs: blog };
        }
        default:
            return state;
    }
}


export default blogReducer;
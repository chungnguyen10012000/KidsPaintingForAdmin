import { blogList } from "../../database/data/blog"
import { Blog } from "../../database/model/blog"

const contexParse = (res) => {
    const blogs = []
    res.forEach(element => {
        blogs.push(new Blog(element))
    });
    return blogs
}

export function getBlog(ok) {
    const fakeBlogList = contexParse(blogList)
    return ok(fakeBlogList);
}
import { blogList } from "../../database/data/blog"
import { Blog } from "../../database/model/blog"

const contexParse = (body, res) => {
    const blogs = []
    blogs.push(new Blog(body))
    res.forEach(element => {
        blogs.push(new Blog(element))
    });
    return blogs
}

export function postBlog(body, created) {
    console.log('enter post')
    const fakeBlogList = contexParse(body, blogList)
    return created(fakeBlogList);
}
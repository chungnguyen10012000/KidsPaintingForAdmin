import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IBlogState } from "../../store/models/root.interface";
import { IBlog } from "../../store/models/blogs.innterface";

export type productListProps = {
  onSelect?: (product: IBlog) => void;
  children?: React.ReactNode;
};

function BlogList(props: productListProps): JSX.Element  {
  const blogs: IBlogState = useSelector((state: IStateType) => state.blogs);

  const productElements: (JSX.Element | null)[] = blogs.blogs.map((blog_item, index) => {
    if (!blog_item) { return null; }
    return (<tr className={`table-row ${(blogs.selectedBlog&& blogs.selectedBlog.id === blog_item.id) ? "selected" : ""}`}
      onClick={() => {
        if(props.onSelect) props.onSelect(blog_item);
      }}
      key={`blog_${index}`}>
      <th scope="row">{index}</th>
      <td>{blog_item.name}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên blog</th>
          </tr>
        </thead>
        <tbody>
          {productElements}
        </tbody>
      </table>
    </div>

  );
}

export default BlogList;

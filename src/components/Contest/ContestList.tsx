import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IProductState } from "../../store/models/root.interface";
import { IProduct } from "../../store/models/product.interface";

export type productListProps = {
  onSelect?: (product: IProduct) => void;
  children?: React.ReactNode;
};

function ContestList(props: productListProps): JSX.Element  {
  const products: IProductState = useSelector((state: IStateType) => state.products);

  const productElements: (JSX.Element | null)[] = products.products.map(product => {
    if (!product) { return null; }
    return (<tr className={`table-row ${(products.selectedProduct && products.selectedProduct.id === product.id) ? "selected" : ""}`}
      onClick={() => {
        if(props.onSelect) props.onSelect(product);
      }}
      key={`product_${product.id}`}>
      <th scope="row">{product.id}</th>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.amount}</td>
      <td>{product.price}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên cuộc thi</th>
            <th scope="col">Miêu tả chi tiết</th>
            <th scope="col">Số lượng thí sinh tham gia</th>
            <th scope="col">Thời gian bắt đầu</th>
            <th scope="col">Thời gian hết hạn</th>
          </tr>
        </thead>
        <tbody>
          {productElements}
        </tbody>
      </table>
    </div>

  );
}

export default ContestList;

import { IOrdersState, IActionBase } from "../models/root.interface";
import { ADD_ORDER } from "../actions/orders.actions";


const initialState: IOrdersState = {
    orders: [
        {
            id: 1,
            name: "Lớp chì màu (CM-1)",
            amount: 6,
            totalPrice: 3000000,
            product: {
                id: 2, name: "Lớp học vẽ dành cho bé 5-9 tuổi", description: "This is Apple and it is healthy",
                amount: 5, price: 2, hasExpiryDate: true, category: "Fruit"
            },
        },
        {
            id: 2,
            name: "Lớp màu sáp (MS-1)",
            amount: 4,
            totalPrice: 2000000,
            product: {
                id: 3, name: "Lớp học vẽ dành cho bé 5-9 tuổi", description: "This is Straw and you can use it for your drink",
                amount: 100, price: 1, hasExpiryDate: false, category: "Kitchen"
            },
        }
    ]
};

function orderReducer(state: IOrdersState = initialState, action: IActionBase): IOrdersState {
    switch (action.type) {
        case ADD_ORDER: {
            let maxId: number = Math.max.apply(Math, state.orders.map((o) => { return o.id; }));
            if(maxId === -Infinity) { maxId = 0; }
            return {...state, orders: [...state.orders, {...action.order, id: maxId + 1}]};
        }
        default:
            return state;
    }
}


export default orderReducer;
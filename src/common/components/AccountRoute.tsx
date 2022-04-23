import { Route, Redirect, RouteProps } from "react-router";
import React, { useState } from "react";
//import { useSelector } from "react-redux";
//import { IStateType } from "../../store/models/root.interface";
//import { IAccount } from "../../store/models/account.interface";
import Login from "../../components/Account/Login";


export function AccountRoute({ children, ...rest }: RouteProps): JSX.Element {

    //const account: IAccount = useSelector((state: IStateType) => state.account);
    const [role, setRole] = useState('')
    
    if (localStorage.getItem('role') === "ROLE_SUPER_ADMIN"){
        setRole('super-admin')
    }
    else if (localStorage.getItem('role') === "ROLE_ADMIN"){
        setRole('admin')
    }
    else if (localStorage.getItem('role') === "ROLE_STAFF"){
        setRole('employee')
    }
    else if (localStorage.getItem('role') === "ROLE_TEACHER"){
        setRole('teacher')
    }

    return (
        <Route
            {...rest}
            render={() =>
                localStorage.getItem('email') ? (
                    <Redirect
                        to={{
                            pathname: `/${role}/home`
                        }}
                    />
                ) : <Login />
            }
        />
    );
}
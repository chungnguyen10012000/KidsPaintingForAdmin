import React from "react";
import { useHistory } from "react-router-dom";

const Start: React.FC = () => {

    let history = useHistory()
    function handlerStart() {
        history.push('/admin/login')
    }


    return (

        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Chào mừng bạn !</h1>
                                        </div>
                                        <button
                                            className='btn btn-primary btn-user btn-block'
                                            type="submit"
                                            onClick={() => handlerStart()}
                                        >
                                            Đăng nhập
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Start;
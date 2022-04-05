import React from "react";

const data = [
    {
        "username": "linh123",
        "class": "CM-1",
        "teacher": "Khanh Huyen",
        "score": 9
    },
    {
        "username": "lan123",
        "class": "CM-1",
        "teacher": "Khanh Huyen",
        "score": 8
    },
    {
        "username": "thinh123",
        "class": "CM-1",
        "teacher": "Khanh Huyen",
        "score": 7.5
    },
    {
        "username": "tu123",
        "class": "CM-1",
        "teacher": "Khanh Huyen",
        "score": 7.5
    },
    {
        "username": "bao123",
        "class": "CM-1",
        "teacher": "Khanh Huyen",
        "score": 7
    },
    {
        "username": "dai123",
        "class": "CM-1",
        "teacher": "Khanh Huyen",
        "score": 7
    },
    {
        "username": "thao123",
        "class": "CM-1",
        "teacher": "Khanh Huyen",
        "score": 7
    },
    {
        "username": "tien123",
        "class": "CM-1",
        "teacher": "Khanh Huyen",
        "score": 6.5
    },
    {
        "username": "vinh123",
        "class": "CM-1",
        "teacher": "Khanh Huyen",
        "score": 6
    },
    {
        "username": "nam123",
        "class": "CM-1",
        "teacher": "Khanh Huyen",
        "score": 6
    },
    {
        "username": "demo123",
        "class": "CM-1",
        "teacher": "Khanh Huyen",
        "score": 5
    },
]

function ResultList(): JSX.Element {

    const resultElements: (JSX.Element | null)[] = data.map((ele, index) => {
        if (!ele) { return null; }
        return (<tr className={`table-row`}
            key={`course_${index}`}>
            <th scope="row">{index + 1}</th>
            <td>{ele.username}</td>
            <td>{ele.class}</td>
            <td>{ele.teacher}</td>
            <td>{ele.score}</td>
        </tr>);
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên tài khoản</th>
                        <th scope="col">Lớp</th>
                        <th scope="col">Giáo viên giảng dạy</th>
                        <th scope="col">Điểm</th>
                    </tr>
                </thead>
                <tbody>
                    {resultElements}
                </tbody>
            </table>
        </div>

    );
}

export default ResultList;


fetch('/blog_1.txt', {
    method: "GET"
})
    .then(res => res.text())
    .then(data => localStorage.setItem('blog_1', data))


fetch('/blog_2.txt', {
    method: "GET"
})
    .then(res => res.text())
    .then(data => localStorage.setItem('blog_2', data))

export const blogList = [
    {
        "id": "1",
        "name": "Cho Trẻ Học Gì Để Con Phát Triển Tư Duy Sáng Tạo?",
        "description": localStorage.getItem('blog_1'),
        "image_url": ""
    },
    {
        "id": "2",
        "name": "Học Vẽ Mỹ Thuật Giúp Trẻ Phát Triển Kĩ Năng Mềm Hiệu Quả",
        "description": localStorage.getItem('blog_2'),
        "image_url": ""
    }
]
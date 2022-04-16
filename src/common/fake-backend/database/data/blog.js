
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
        "image_url": "https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-6/252524627_2726221484338413_3943219956142271194_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=RdkJM0pKT1QAX_uWM1p&_nc_oc=AQlEoQi7rl8ayMQrC8evKyDltd-YaxtpMwCqvV7ErdETCddVvjEM7bJNnU2QPzTqzDf4zYfi64CP5gDOvC5tNz9t&tn=DHyNdGeRPD3VADqN&_nc_ht=scontent.fsgn5-11.fna&oh=00_AT9cLld0E9aoRDavVoXu5PHyzwyi-m2EmkenYrcCm35Lpw&oe=62535244"
    },
    {
        "id": "2",
        "name": "Học Vẽ Mỹ Thuật Giúp Trẻ Phát Triển Kĩ Năng Mềm Hiệu Quả",
        "description": localStorage.getItem('blog_2'),
        "image_url": "https://i.ytimg.com/vi/1tnq3hxQ_wE/maxresdefault.jpg"
    }
]
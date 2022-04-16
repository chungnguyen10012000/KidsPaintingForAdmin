export function login(body, created) {
    if (body.username === "super-admin"){
        const res = [
            {
                "username": "super-admin",
                "role": "super-admin",
                "permission": [
                            "WRITE_ART_TYPE", "WRITE_ART_LEVEL", "WRITE_LESSON_TIME", "READ_USER", 
                            "WRITE_ADMIN", "READ_ADMIN", "READ_STAFF", "WRITE_STAFF", "READ_COURSE", 
                            "WRITE_COURSE", "READ_CONTEST", "WRITE_CONTEST", "REVIEW_SEMESTER", 
                            "REVIEW BLOG", "READ_STUDENT", "READ_TEACHER", "WRITE_TEACHER", "WRITE_CLASS",
                            "READ_CLASS", "WRITE_SCHEDULE", "READ_SCHEDULE", "READ_FEEDBACK",
                            "READ_BLOG", "READ_BLOG"
                        ]
            }
        ]
        return created(res)
    }
    else if (body.username === "admin"){
        const res = [
            {
                "username": "admin",
                "role": "admin",
                "permission": [
                            "READ_STAFF", "WRITE_STAFF", "READ_COURSE", "WRITE_COURSE", 
                            "READ_CONTEST", "WRITE_CONTEST", "REVIEW_SEMESTER", "REVIEW BLOG",
                            "READ_STUDENT", "READ_TEACHER", "WRITE_TEACHER", "WRITE_CLASS",
                            "READ_CLASS", "WRITE_SCHEDULE", "READ_SCHEDULE", "READ_FEEDBACK",
                            "READ_BLOG", "READ_BLOG"
                        ]
            }
        ]
        return created(res)
    }

    else if (body.username === "staff") {
        const res = [
            {
                "username": "staff",
                "role": "employee",
                "permission": [
                            "READ_STUDENT", "READ_TEACHER", "WRITE_TEACHER", "WRITE_CLASS",
                            "READ_CLASS", "WRITE_SCHEDULE", "READ_SCHEDULE", "READ_FEEDBACK",
                            "READ_BLOG", "READ_BLOG"
                        ]
            }
        ]
        return created(res)
    }
    else if (body.username === "teacher") {
        const res = [
            {
                "username": "teacher",
                "role": "teacher",
                "permission": [
                            "READ_STUDENT", "SIGN_SEMESTER_COURSE", "SIGN_LEVEL", "VIEW_SCHEDULE",
                            "GRADE_CONTEST", "WRITE_EXERCISE", "GRADE_EXERCISE", "SIGN_OFF_LESSON",
                            "WRITE_TUTORIAL"
                        ]
            }
        ]
        return created(res)
    }
}
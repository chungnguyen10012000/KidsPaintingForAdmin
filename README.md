## Features
- React (without jQuery etc.)
- TypeScript
- React Hooks
- Redux
- Responsive (adjusted to mobile devices)
- React-router-dom
- Bootstrap 4
- Modern, clean, readable layout
- Authentication
- **Clean, easy, ready to start new project**

##NOTE 
- User register semester couse


##TODO
- Admin:
    - [x] Add super admin (WRITE_ART, WRITE_LESSON_TIME)
    - [x] Edit account (view detail, update detail, change  password) 
    - [x] Merge teacher, staff (selection edit) 
    - [x] Rate star course (not teacher)
    - [ ] Change class (search course, class)
    - [x] Create art (level, type)
    - [x] Create schedule 
    - [x] Selection schedule. add lesson time for semester  course
    - [ ] Edit statistical (economy) - add for home 
    - [x] Add semester course teacher register (button random student, button accept)
    - [ ] Edit course, contest (table => list)
    - [x] Edit contest (contest end, not open => remove =>  recognize with color)
    - [x] Edit feedback (preview)
    - [x] Preview Blog 
    - [x] Review Blog 
    - [x] Add view notification
    - [x] Manual arrange 
    - [x] Create semester
    - [x] Select semester for arrange class 
    - [ ] Review semester (admin, super-admin)
    - [ ] Notification top menu (da xem, chua xem)
    - [ ] Search, paging
    - [ ] Login jwt
- Teacher
    - [x] Edit register semester course 
    - [x] Edit register course for teaching (course resigested for color,  button register course => table search course => detail) 
    - [x] List class -> add for home 
    - [x] Edit cancel lesson (selection lesson time start -> end) 
    - [x] Edit sesson (button select sesson template)
    - [ ] Create page templagte sesson
    - [ ] Remove link (*)
    - [ ] Remove change class (*)
    - [ ] Add view notification (*)


## ROLE
- ROLE_SUPER_ADMIN:
    - WRITE_ART_TYPE
    - WRITE_ART_LEVEL
    - WRITE_LESSON_TIME
    - WRITE_ADMIN
    - READ_ADMIN
- ROLE_ADMIN:
    - READ_STAFF
    - WRITE_STAFF
    - READ_COURSE
    - WRITE_COURSE
    - READ_CONTEST
    - WRITE_CONTEST
    - REVIEW_SEMESTER
    - REVIEW BLOG
- ROLE_STAFF:
    - READ_STUDENT
    - READ_TEACHER
    - WRITE_TEACHER
    - WRITE_CLASS 
    - READ_CLASS
    - WRITE_SCHEDULE
    - READ_SCHEDULE
    - READ_FEEDBACK
    - READ_BLOG
    - READ_BLOG
    - WRITE_SEMESTER
    
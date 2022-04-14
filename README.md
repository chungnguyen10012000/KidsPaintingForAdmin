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
    - Add super admin (WRITE_ART, WRITE_LESSON_TIME)
    - Edit account (view detail, update detail, change  password) (*)
    - Merge teacher, staff (selection edit) (*)
    - Rate star course (not teacher) (*)
    - Change class ( search course, class)
    - Create art (level, type) (*)
    - Create schedule 
    - Selection schedule. add lesson time for semester  course
    - Edit statistical (economy) - add for home 
    - Add semester course teacher register (button random   student, button accept)
    - Edit course, contest (table => list)
    - Edit contest (contest end, not open => remove =>  recognize with color) (*)
    - Edit feedback (preview)
    - Edit blog (preview, REVIEW_BLOG)
    - Add view notification (*)
- Teacher
    - Edit register semester course
    - Edit register course for teaching (course resigested for color,  button register course => table search course => detail)
    - List class -> add for home
    - Edit cancel lesson (selection lesson time start -> end)
    - Edit sesson (button select sesson template)
    - Create page templagte sesson
    - Remove link
    - Edit register change class (selection -> search)
    - Remove change class (*)
    - Add view notification (*)


## ROLE
- ROLE_SUPER_ADMIN:
    - WRITE_ART_TYPE
    - WRITE_ART_LEVEL
    - WRITE_LESSON_TIME
    - WRITE_ADMIN
    - READ_USER
- ROLE_ADMIN:
    - READ_STAFF
    - WRITE_STAFF
    - READ_COURSE
    - WRITE_COURSE
    - READ_CONTEST
    - WRITE_CONTEST
    - REVIEW_SEMESTER
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
    
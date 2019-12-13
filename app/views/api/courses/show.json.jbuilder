json.id @course.id

json.enrolledUsers do 
    json.array! @course.enrolled_users.map { |user| user.name}
end


json.partial! "api/courses/course", course: @course

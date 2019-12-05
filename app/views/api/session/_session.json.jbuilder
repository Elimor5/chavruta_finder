json.set! :userIdentity do
    json.extract! user, :username, :name, :level, :id
    json.isInstructor  user.is_instructor
    json.isMale user.is_male
end
json.set! :enrollments do
    user.enrollments.each do |enrollment|
        json.set! enrollment.course_id, enrollment.id
    end
end
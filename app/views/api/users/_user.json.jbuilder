json.extract! user, :username, :name, :level
json.set! :coursesCreated do
    json.array! user.courses_created.map { |course| course.id }
end

json.set! :preferredTopics do
    json.array! user.preferred_topics.map { |topic| topic.id }
end

json.set! :enrolledCourses do
    json.array! user.enrolled_courses.map { |course| course.id}
end

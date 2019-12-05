json.partial! "api/session/session", user: @user

json.set! :coursesCreated do
    user.courses_created.each do |course|
        json.set! course.id do
            json.partial! "api/courses/course", course: course
        end
    end
end

json.set! :preferredTopics do
    user.preferred_topics.each do |topic|
        json.set! topic.id do
            json.extract! topic, :name
        end
    end
end



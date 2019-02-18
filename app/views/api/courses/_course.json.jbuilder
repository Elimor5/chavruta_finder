json.extract! course, :level, :summary, :title
json.startDate course.start_date
json.endDate course.end_date
json.topicId course.topic_id
json.instructorId course.instructor_id
json.authorId course.author_id
json.gender_restriction course.gender_restriction
json.availabilities course.availabilities.map { |availability| availability.id}

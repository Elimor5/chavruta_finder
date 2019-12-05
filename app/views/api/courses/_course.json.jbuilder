json.extract! course, :level, :summary, :title, :id, :location
json.startDate course.start_date
json.endDate course.end_date
json.topic course.topic.name
json.instructor course.instructor&.name
json.author course.author&.name
json.gender_restriction course.gender_restriction
json.availabilities course.availabilities.map do |availability| 
    json.extract! availability, :occurrence, :weekdays, :length, :start_time
end

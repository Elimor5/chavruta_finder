json.extract! course, :level, :summary, :title, :id, :location
json.startDate course.start_date
json.endDate course.end_date

json.instructor do 
    json.name  course.instructor&.name
    json.id  course.instructor&.id
end

json.topic do 
    json.name course.topic.name
    json.id course.topic.id
end 

json.author do 
    json.id course.author.id
    json.name course.author.name
end

json.genderRestriction course.gender_restriction
json.availabilities course.availabilities.map do |availability| 
    json.extract! availability, :occurrence, :weekdays, :length, :id
    json.startTime availability.start_time
end

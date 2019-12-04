json.array!(@courses) do |course|
    json.partial! "api/courses/course", course: course
end

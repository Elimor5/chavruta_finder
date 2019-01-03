json.set! :userIdentity do
    json.extract! user, :username, :name, :level, :id
    json.isInstructor  user.is_instructor
    json.isMale user.is_male
end
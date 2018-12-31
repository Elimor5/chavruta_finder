json.set! :userIdentity do 
    json.extract! @user, :username, :name, :level, :id, :is_instructor, :is_male
end
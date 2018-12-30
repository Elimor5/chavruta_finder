json.set! :userIdentity do 
    json.extract! @user, :username, :name, :level, :id
end
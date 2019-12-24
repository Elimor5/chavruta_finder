json.partial! "api/session/session", user: @user

json.set! :preferredTopics do
    user.preferred_topics.each do |topic|
        json.set! topic.id do
            json.extract! topic, :name
        end
    end
end



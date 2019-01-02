json.set! :topics do
    @topics.each do |topic|
        json.partial! "api/topics/topic", topic: topic
    end
end

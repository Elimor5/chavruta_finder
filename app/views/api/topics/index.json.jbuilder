json.set! :topics do
    @topics.each do |topic|
        json.set! topic.id do
            json.extract! topic, :name
        end
    end
end

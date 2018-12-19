class Api::TopicsController < ApplicationController
    def index
        if params[:search]
            @topics = Topic.search_topic(params[:search])
        else
            @topics = Topic.all
        end

        render :index
    end

    def create
        @topic = Topic.new(topic_params)

        if @topic.save
            render json: {message: 'topic created successfully', name: @topic.name}
        else
            render json: @topic.errors.full_messages, status: 422
        end
    end

    def destroy
        @topic = Topic.find_by_id(params[:id])

        if @topic
            @topic.destroy!
            render(json: {message: 'Topic successfully deleted.'}, status: 200)
        else
            render(json: {message:'Topic does not exist'}, status: 400)
        end
    end

    private

    def topic_params
        params.require(:topic).permit(:name)
    end
end

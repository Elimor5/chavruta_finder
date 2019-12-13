class Api::CoursesController < ApplicationController
    def index
        gender_filter = current_user.is_male ? '1' : '0' 
        
        if params[:course][:search]
            limit = params[:course][:limit]

            @courses = Course.search_course(params[:course][:search]).where.not(gender_restriction: gender_filter).limit(limit)
        else
            @courses = Course.all.where.not(gender_restriction: gender_filter)
        end

        render :index
    end

    def create
        filtered_course_params = course_params
        availability_params = course_params[:availabilities]
        topic_params = course_params[:topics_attributes]

        if topic_params
            filtered_course_params.delete(:topics_attributes)
        end

        @course = Course.new(filtered_course_params)
        @course.author_id = current_user.id

        if !course_params[:topic_id]
            @topic = @course.build_topic(topic_params)

            @topic.save!
        end

        if @course.save
            render :show
        else
            render json: @course.errors.full_messages, status: 422
        end
    end

    def show
        @course = Course.find_by_id(params[:id])

        if @course
            render :show
        else
            render(json: ['Course not found'], status: 422)
        end
    end

    def update
        @course = Course.find_by_id(params[:id])

        if @course
            
            @course.update(course_params)

            render :show
        else
            render(json: ['Course not found'], status: 422)
        end
    end

    def destroy
        @course = Course.find_by_id(params[:id])

        if @course && @course.author_id == current_user.id
            @course.destroy!

            render(json: ['Course successfully deleted.'], status: 200)
        else
            render(json: ['Course does not exist or User not authorized'], status: 400)
        end
    end

    private

    def course_params
        params.require(:course).permit(:start_date, :end_date, :level, :instructor_id, :summary, :title, :topic_id, :gender_restriction, :location, :search, :limit, topics_attributes: [:name], availabilities_attributes: [:occurrence, :weekdays, :length, :month_day, :start_time, :id])
    end
end

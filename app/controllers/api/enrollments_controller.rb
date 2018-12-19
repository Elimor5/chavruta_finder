class Api::EnrollmentsController < ApplicationController
    def create
        @enrollment = Enrollment.new(enrollment_params)
        @enrollment.user_id = current_user.id

        if @enrollment.save
            render :show
        else
            render json: @enrollment.errors.full_messages, status: 422
        end
    end

    def destroy
        @enrollment = Enrollment.find_by_id(params[:id])

        if @enrollment && @enrollment.user_id == current_user.id
            @enrollment.destroy!

            render(json: {message: 'Enrollment successfully deleted.'}, status: 200)
        else
            if !@enrollment
                render(json: {message: 'Enrollment does not exist'}, status: 400)
            else
                render(json: {message: "User not authorized"}, status: 400)
            end
        end
    end

    private

    def enrollment_params
        params.require(:enrollment).permit(:course_id)
    end
end

class Api::AvailabilitiesController < ApplicationController
    def create
        @availability = Availability.new(availability_params)

        if @availability.save
            render :show
        else
            render json: @availability.errors.full_messages, status: 422
        end
    end

    def update
        @availability = Availability.find_by_id(params[:id])

        if @availability && @availability.user_id == current_user.id
            @availability.update(availability_params)

            render :show
        else
            if !@availability
                render(json: ['Availability does not exsit'], status: 422)
            else
                render(json: ["User not authorized"], status: 422)
            end
        end
    end

    def destroy
        @availability = Availability.find_by_id(params[:id])

        if @availability && @availability.user_id == current_user.id
            @availability.destroy!

            render(json: ['Availability successfully deleted.'], status: 200)
        else
            if !@availability
                render(json: ['Availability does not exsit'], status: 400)
            else
                render(json: ["User not authorized"], status: 400)
            end
        end
    end

    private

    def availability_params
        params.require(:availability).permit(:occurrence, :length, :weekdays, :month_day, :start_time)
    end
end

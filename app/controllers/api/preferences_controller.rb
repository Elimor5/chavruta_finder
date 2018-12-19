class Api::PreferencesController < ApplicationController
    def create
        @preference = Preference.new(preference_params)
        @preference.user_id = current_user.id

        current_preferred_topics = current_user.preferred_topics.map{ |topic| topic.id }

        if current_preferred_topics.include?(preference_params[:topic_id].to_i)
            render json: {message: 'This preference already exists'}

            return
        end

        if @preference.save
            render :show
        else
            render json: @preference.errors.full_messages, status: 422
        end
    end

    def update
        @preference = Preference.find_by_id(params[:id])

        if @preference && @preference.user_id == current_user.id
            @preference.update(preference_params)

            render :show
        else
            if !@preference
                render(json: {message: 'Preference does not exsit'}, status: 422)
            else
                render(json: {message: "User not authorized"}, status: 422)
            end
        end
    end

    def destroy
        @preference = Preference.find_by_id(params[:id])

        if @preference && @preference.user_id == current_user.id
            @preference.destroy!

            render(json: {message: 'Preference successfully deleted.'}, status: 200)
        else
            if !@preference
                render(json: {message: 'Preference does not exsit'}, status: 400)
            else
                render(json: {message: "User not authorized"}, status: 400)
            end
        end
    end

    private

    def preference_params
        params.require(:preference).permit(:user_id, :topic_id)
    end
end

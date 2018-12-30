class Api::UsersController < ApplicationController
    def index
        @users = User.all

        render :index
    end

    def create
		@user = User.new(user_params)

        if (!user_params[:password])
            generated_password = @user.generate_random_password
            @user.password = generated_password

            @user.generate_reset_token
        end

		if @user.save
			login(@user)

            base_url = request.base_url
            @user.send_password_reset_email(@user, base_url) if !user_params[:password]

			render :show
		else
			render json: @user.errors.full_messages, status: 422
		end
    end

    def show
        @user = User.find(params[:id])

        if @user && current_user.id == @user.id
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def update
        @user = User.find(params[:id])

        if @user && current_user.id == @user.id
            @user.password = params[:user][:password];
            @user.update!(user_update_params)

            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

	private

	def user_params
		params.require(:user).permit(:username, :password, :name, :level)
	end

    def user_update_params
        params.require(:user).permit(:username, :name, :level)
    end
end

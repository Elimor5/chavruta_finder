class Api::ResetsController < ApplicationController
    def create
	    @user = User.find_by_reset_token(
            params[:reset][:username],
            params[:reset][:reset_token]
        )

        if @user && @user.reset_recently?
			@user.update_attributes!({password: reset_params[:password]})
            login(@user)
            @user.clear_reset_token

			render "api/users/show"
		elsif !@user.reset_recently?
			render(
                json: {message: "Your reset token has expired. Try resetting your password again."},
                status: 401
            )
        else
            render(
                json: ["Invalid username/reset_token combination"],
                status: 401
            )
		end
	end
end

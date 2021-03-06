class Api::SessionsController < ApplicationController
    def show 
        @user = current_user;
        
        if @user 
            render "api/session/show"
        end 
    end 

    def create
	    @user = User.find_by_credentials(
            params[:user][:username],
            params[:user][:password]
        )

        if @user
			login(@user)
			render "api/users/show"
		else
			render(
                json: ["Invalid username/password combination"],
                status: 401
            )
		end
	end

	def destroy
		@user = current_user

        if @user
			logout
		else
			render(
                json: ["Nobody signed in"],
                status: 401
            )
		end
	end
end

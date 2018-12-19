class ResetPasswordMailer < ApplicationMailer
    default from: 'chavrutafinder@gmail.com'

    def reset_password_email(user, reset_token, base_url)
        @user = user
        @url = "#{base_url}/reset/#{reset_token}"

        mail(to: @user.username, subject: 'Chavruta Finder - Reset Password')
    end
end

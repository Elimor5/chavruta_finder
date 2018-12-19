class User < ApplicationRecord
    attr_reader :password

    after_initialize :ensure_session_token
	before_validation :ensure_session_token_uniqueness, :on => :create

    validates :username, :name, :session_token, presence: true
    validates :password_digest, presence: {message: 'password can\'t be blank'}
	validates :username, uniqueness: true
	validates :password, length: {minimum: 6}, allow_nil: :true

    has_many :courses_created,
        foreign_key: :author_id,
        class_name: :Course

    has_many :preferences
    has_many :preferred_topics, through: :preferences,
             source: :topic

    has_many :enrollments
    has_many :enrolled_courses, through: :enrollments,
        source: :course


    def password= password
		self.password_digest = BCrypt::Password.create(password)
		@password = password
	end

	def self.find_by_credentials(username, password)
		user = User.find_by(username: username)
		return nil unless user
		user.password_is?(password) ? user : nil
	end

    def self.find_by_reset_token(username, reset_token)
        user = User.find_by(username: username)
        return nil unless user

        user.token_is?(reset_token) ? user : nil
    end

	def password_is? password
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def reset_session_token!
		self.session_token = new_session_token
		ensure_session_token_uniqueness
		self.save
		self.session_token
	end

    def generate_random_password
        new_session_token
    end

    def generate_reset_token
        @reset_token = new_session_token

        self.reset_digest = BCrypt::Password.create(@reset_token)
    end

    def send_password_reset_email(user, base_url)
        ResetPasswordMailer.reset_password_email(user, @reset_token, base_url).deliver_now!

        self.reset_sent_at = Time.now
        self.save
    end

    def token_is?(token)
        BCrypt::Password.new(self.reset_digest).is_password?(token)
    end

    def reset_recently?
        self.reset_sent_at >= 30.minutes.ago
    end

    def clear_reset_token
        self.reset_digest = nil 
    end

	private

	def ensure_session_token
		self.session_token ||= new_session_token
	end

	def new_session_token
		SecureRandom.base64
	end

	def ensure_session_token_uniqueness
		while User.find_by(session_token: self.session_token)
			self.session_token = new_session_token
		end
	end
end

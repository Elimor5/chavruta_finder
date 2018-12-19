class Preference < ApplicationRecord
    validates :user_id, :topic_id, presence: true

    belongs_to :user
    belongs_to :topic
end

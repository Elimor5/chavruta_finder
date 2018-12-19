class Topic < ApplicationRecord
    include PgSearch

    validates :name, presence: true

    has_many :courses
    has_many :preferences

    has_many :users, through: :preferences

    pg_search_scope :search_topic, against: :name,
                    using: {
                        tsearch: {
                            prefix: true
                        }
                    }
end

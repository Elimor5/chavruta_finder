class Topic < ApplicationRecord
    include PgSearch

    validates :name, presence: true, uniqueness: true

    has_many :courses
    has_many :preferences

    has_many :users, through: :preferences

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    pg_search_scope :search_topic, against: :name,
                    using: {
                        tsearch: {
                            prefix: true
                        }
                    }
end

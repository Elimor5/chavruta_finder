class Course < ApplicationRecord
    include PgSearch::Model

    validates :start_date, :end_date, :level, :gender_restriction, :location, presence: true

    belongs_to :topic

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    belongs_to :instructor,
        foreign_key: :instructor_id,
        class_name: :User,
        optional: true

    has_many :course_schedules, dependent: :destroy
    has_many :availabilities, through: :course_schedules, dependent: :destroy
    has_many :rescheduled_classes, through: :course_schedules, dependent: :destroy

    has_many :enrollments, dependent: :destroy
    has_many :enrolled_users, through: :enrollments,
        source: :user

    accepts_nested_attributes_for :course_schedules, allow_destroy: true
    accepts_nested_attributes_for :availabilities, allow_destroy: true

    pg_search_scope :search_course, { against: [:title, :location],
                    associated_against: {
                        topic: :name
                    },
                    using: {
                        tsearch: {
                            prefix: true
                        }
                    }
                }

    def topic_title 
        self.topic.title
    end
end

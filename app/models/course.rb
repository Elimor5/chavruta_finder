class Course < ApplicationRecord
    validates :start_date, :end_date, :level, :gender_restriction, presence: true

    belongs_to :topic

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    has_many :course_schedules, dependent: :destroy
    has_many :availabilities, through: :course_schedules, dependent: :destroy
    has_many :rescheduled_classes, through: :course_schedules, dependent: :destroy

    has_many :enrollments, dependent: :destroy
    has_many :enrolled_users, through: :enrollments,
        source: :user

    accepts_nested_attributes_for :course_schedules, allow_destroy: true
    accepts_nested_attributes_for :availabilities, allow_destroy: true
end

class RescheduledClass < ApplicationRecord
    belongs_to :course_schedule
    has_one :course, through: :course_schedule
end

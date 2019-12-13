class CourseSchedule < ApplicationRecord
    belongs_to :course
    belongs_to :availability

    has_many :rescheduled_classes
end

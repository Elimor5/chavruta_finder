class CourseSchedule < ApplicationRecord
    belongs_to :course, dependent: :destroy
    belongs_to :availability, dependent: :destroy

    has_many :rescheduled_classes, dependent: :destroy
end

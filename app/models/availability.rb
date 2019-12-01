class Availability < ApplicationRecord
    validates :weekdays, presence: true, if: :available_weekly?
    validates :month_day, presence: true, if: :available_monthly?

    has_one :course_schedule
    has_one :course, through: :course_schedule

    def available_weekly?
        return occurrence == "weekly"
    end

    def available_monthly?
        return occurrence == "monthly"
    end
end

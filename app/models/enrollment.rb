class Enrollment < ApplicationRecord
    validates_uniqueness_of :course, scope: [:user]

    belongs_to :course
    belongs_to :user
end

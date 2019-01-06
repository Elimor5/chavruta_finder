class CourseGenderRestrictionMigration < ActiveRecord::Migration[5.2]
  def change
    add_column :courses, :gender_restriction, :string, null: false
  end
end

class AddCoursesJoinTable < ActiveRecord::Migration[5.2]
  def change
      remove_column(:availabilities, :user_id)
  end
end

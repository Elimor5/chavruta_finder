class RemoveLevelFromTopic < ActiveRecord::Migration[5.2]
  def change
      remove_column :topics, :level
  end
end

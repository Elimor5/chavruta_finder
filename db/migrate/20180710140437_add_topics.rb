class AddTopics < ActiveRecord::Migration[5.2]
  def change
      create_table :topics do |t|
          t.string :name, null: false
          t.string :level, null: false

          t.timestamps
      end

      rename_column(:users, :education_level, :level)
      change_column(:users, :level, :string, null: true)
  end
end

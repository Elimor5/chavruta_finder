class MakeTopicNameUnique < ActiveRecord::Migration[5.2]
  def change
    change_column :topics, :name, :string, null: false, unique: true
  end
end

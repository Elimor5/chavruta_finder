class AddPreferences < ActiveRecord::Migration[5.2]
  def change
      create_table :preferences do |t|
           t.integer :user_id
           t.integer :topic_id

           t.timestamps
       end

       add_index(:preferences, :user_id)
       add_index(:preferences, :topic_id)
  end
end

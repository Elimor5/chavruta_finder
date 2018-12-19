class AddUsers < ActiveRecord::Migration[5.2]
    def change
        create_table :users do |t|
            t.string :name, null: false
            t.string :email
            t.string :phone
            t.string :education_level, null: false
            t.string :password_digest, null: false
            t.string :session_token, null: false

            t.timestamps
        end
    end
end

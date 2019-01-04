class UpdateAvailabilitiesWeekdayMigration < ActiveRecord::Migration[5.2]
  def change
    rename_column(:availabilities, :week_day, :weekdays)
    change_column :availabilities, :weekdays, :string
  end
end

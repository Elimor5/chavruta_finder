if availability.occurrence == "monthly"
    json.extract! availability, :length, :month_day, :occurrence, :start_time
else
    json.extract! availability, :length, :week_day, :occurrence, :start_time
end

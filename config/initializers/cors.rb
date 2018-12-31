Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:8080', 'http://192.168.1.2:8080'
    resource '*',
      headers: :any,
      methods: %i(get post put patch delete options head),
      credentials: true
  end
end

Rails.application.config.action_controller.forgery_protection_origin_check = false
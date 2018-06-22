class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_csrf_token, if: :valid_get_request?

  private

  def valid_get_request?
    protect_against_forgery? && !request.xhr? && request.get?
  end

  def set_csrf_token
    cookies[:csrf_token] = {
      value: form_authenticity_token,
      expires: 5.minutes.from_now,
      secure: false
    }
  end
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  end
end

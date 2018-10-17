class ApplicationController < ActionController::Base
  before_action :authenticate_user!, :except => [:splashpage]
  def after_sign_in_path_for(resource)
    new_location_path
  end
end

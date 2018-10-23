class LocationsController < ApplicationController
  def new
    @favorite = Favorite.new
  end
end

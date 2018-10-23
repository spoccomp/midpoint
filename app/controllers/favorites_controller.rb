class FavoritesController < ApplicationController
  def index
    @favorites = Favorite.all
  end

  def show
    @favorite
  end

  def create
    favorite = Favorite.create(
      # place_id: params[:favorite][:place_id],
      name: params[:favorite][:name],
      address: params[:favorite][:address],
      phone: params[:favorite][:phone],
      lat: params[:favorite][:lat],
      long: params[:favorite][:long],
      user_id: current_user.id

    )
    # make this into a ajax call
    redirect_to locations_new_path
  end

  def new
    @favorite = Favorite.new
  end

  def destroy
    favorite = set_favorite
    favorite.destroy
    redirect_to favorites_path
  end

  private
  def set_favorite
    @favorite = Favorite.find(params[:id])
  end
end

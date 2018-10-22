class FavoritesController < ApplicationController
  def index
    @favorites = Favorite.all
  end

  def show
    @favorite
  end

  def create
    favorite = Favorite.create(
      name: params[:student][:name],
      address: params[:student][:address],
      lat: params[:student][:lat],
      long: params[:student][:long],

      type: params[:favorite][:type],
      user_id: user.id

    )

  end

  def new
    @favorite = Favorite.new
  end

  def destroy

    favorite = @favorite
    favorite.destroy

  end

  private
  def favorite
    @favorite = Favorite.find(params[:id])
  end
end

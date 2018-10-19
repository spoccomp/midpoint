class ProfilesController < ApplicationController
  def index
    @profiles = Profile.all
  end

  def show
    @profile = Profile.find(params[:id])
  end

  def edit
    @profile = Profile.find(params[:id])
  end

  def update
    profile = Profile.find(params[:id])
    profile.update(
      first_name: params[:profile][:first_name],
      last_name: params[:profile][:last_name],
      phone: params[:profile][:phone],
      address1: params[:profile][:address1],
      address2: params[:profile][:addresse2],
      city: params[:profile][:city],
      state: params[:profile][:state],
      zipcode: params[:profile][:zipcode]
    )

    redirect_to locations_new_path
  end

  def create
    @profile = Profile.create(
      first_name: params[:profile][:first_name],
      last_name: params[:profile][:last_name],
      phone: params[:profile][:phone],
      address1: params[:profile][:address1],
      address2: params[:profile][:addresse2],
      city: params[:profile][:city],
      state: params[:profile][:state],
      zipcode: params[:profile][:zipcode],
      user_id: current_user.id
    )

    redirect_to locations_new_path
  end

  def new
    @profile = Profile.new
  end
end

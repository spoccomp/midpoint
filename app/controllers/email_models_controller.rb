class EmailModelsController < ApplicationController
    
    def index 
        
    end
    def edit 
    end
    def new 
    end

    def create 
        # @emailto = params[:email]
        # @email_user = current_user.email
        # data = params[:body]
        # subject=params[:subject]
        # user = params[:email]
        # FriendMailer.meet_up_mailer(data,user,subject).deliver
        FriendMailer.meet_up_mailer().deliver

        redirect_to locations_new_path
    end
    def update
    end    
    def show
    end
    def delete
    end
    def destroy
    end

end

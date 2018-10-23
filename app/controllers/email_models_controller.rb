class EmailModelsController < ApplicationController
    
    def index 
        
    end
    def edit 
    end
    def new 
    end
    def create 
        FriendMailer.meet_up_mailer().deliver
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

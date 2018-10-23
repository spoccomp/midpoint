# Preview all emails at http://localhost:3000/rails/mailers/friend_mailer
class FriendMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/friend_mailer/meet_up_mailer
  def meet_up_mailer
    FriendMailer.meet_up_mailer
  end

end

require 'test_helper'

class FriendMailerTest < ActionMailer::TestCase
  test "meet_up_mailer" do
    mail = FriendMailer.meet_up_mailer
    assert_equal "Meet up mailer", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end

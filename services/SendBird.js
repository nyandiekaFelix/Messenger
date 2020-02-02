import SendBird from "sendbird";

const appId = "";
const sb = new SendBird({ appId: appId });

export default {
  testConnection() {
    sb.connect("test_id", function(user, error) {
      user && console.log("Here's our user\n", user);
      error && console.log("Oops! An error occured", error);
    });
  }
};

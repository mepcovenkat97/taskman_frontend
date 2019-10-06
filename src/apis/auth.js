import apiUrl from "./apiUrl";
import axios from "axios";
import QueryString from "query-string";

class Auth {
  constructor() {
    this.isAuth = false;
    this.user = null;
    this.token = null;
  }

  authenticate = async credentials => {
    console.log(credentials);
    const user = await axios.post(
      `${apiUrl}/login`,
      QueryString.stringify(credentials),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    console.log(user.data);
    this.user = user.data.user;
    this.auth = true;
    this.token = user.data.token;
  };
}

const auth = new Auth();
export default auth;

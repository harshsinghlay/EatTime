import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndPoint)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name, id }) {
    try {
      const userAccount = await this.account.create(id, email, password, name);
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: createAccount :: error: ", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const loginSession = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return loginSession;
    } catch (error) {
      console.log("Appwrite service :: login :: error: ", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const fetchCurrentLoggedInUser = await this.account.get();
      // console.log("Current User: ", fetchCurrentLoggedInUser);
      return fetchCurrentLoggedInUser;
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error: ", error);
      throw error;
    }
  }

  async logout() {
    try {
      const res = await this.account.deleteSessions();
      if (res) {
        return true;
      }
    } catch (error) {
      console.log("Appwrite service :: logout :: error: ", error);
      return false;
    }
  }
}

const authService = new AuthService();

export default authService;

// Appwrite configuration
import config from "../config/config";
import { Client, ID, Databases, Storage } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndPoint)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async setData({
    userId,
    cart,
    orders,
    paymentMethods,
    addresses,
    blogs,
    wishlist,
  }) {
    try {
      const response = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        userId, // userId is passed as documentId
        {
          // Pass all other properties of the user
          userId,
          cart,
          orders,
          paymentMethods,
          addresses,
          blogs,
          wishlist,
        }
      );
      if (response) {
        return true;
      }
    } catch (error) {
      console.log("Appwrite service :: setUserData :: error: ", error);
      return false;
    }
  }

  async getData() {
    try {
      const fetchUsersData = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId
      );
      console.log("fetchedUserData is",fetchUsersData);
      return fetchUsersData;
    } catch (error) {
      console.log("Appwrite service :: getUsersData :: error: ", error);
      return error;
    }
  }

  async updateData(
    userId,
    { cart, orders, paymentMethods, addresses, blogs, wishlist }
  ) {
    try {
      const updatedPost = await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        userId,
        {
          cart,
          orders,
          paymentMethods,
          addresses,
          blogs,
          wishlist,
        }
      );
      console.log("Post updated: (in appwrite.config.js)");
      return updatedPost;
    } catch (error) {
      console.log("Appwrite service :: updateUserData :: error: ", error);
    }
  }


  //  ================ File Upload Services =============

  async uploadFile(file) {
    try {
      const fileUploadResponse = await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
      console.log("File uploaded: ", fileUploadResponse);
      return fileUploadResponse;
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error: ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      console.log("File deleted: ", fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;

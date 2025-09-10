import config from "../config/config";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  tablesDB;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const response = await this.tablesDB.createRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId, // "collection" is now called "table"
        rowId: slug, // optional, if you want to set custom ID (otherwise Appwrite auto-generates one)
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });

      return response;
    } catch (error) {
      console.error("Create Post Error:", error);
      throw error;
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const response = await this.tablesDB.updateRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId, // "collection" is now called "table"
        rowId: slug, // the row/document ID
        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async deletePost(slug) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId, // "collection" → "table"
        rowId: slug, // row/document ID
      });

      return true;
    } catch (error) {
      console.error("Delete Post Error:", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      const response = await this.tablesDB.getRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId, // "collection" → "table"
        rowId: slug,
      });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async getPosts() {
    try {
      const response = await this.tablesDB.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        queries: [Query.equal("status", "active")],
      });
      return response;
    } catch (error) {
      console.error("List Posts Error:", error);
      throw error;
    }
  }
  //file upload service
  async uploadFile(file) {
    try {
      const response = await this.storage.createFile({
        bucketId: config.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: config.appwriteBucketId,
        fileId,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    return this.storage.getFilePreview({
      bucketId: config.appwriteBucketId,
      fileId,
    });
  }
}

const service = new Service();
export default service;

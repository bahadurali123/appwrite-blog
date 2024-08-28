import config from "../config/confing";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Dbservice {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost(data) {
        try {
            const { title, slug, content, featuredimage, status, userid } = data;
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid,
                }
            )
        } catch (error) {
            console.log("Error in Appwrite at create post: ", error);
        }
    }
    async updatePost(slug, { title, content, featuredimage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                }
            )
        } catch (error) {
            console.log("Error in Appwrite at update post: ", error);
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Error in Appwrite at delete post: ", error);
            return false;
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Error in Appwrite at get post: ", error);
        }
    }
    async getPosts() {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    Query.equal("status", "active"),
                    Query.limit(10),
                    Query.orderDesc("$createdAt"),
                ]
            )
        } catch (error) {
            console.log("Error in Appwrite at get posts: ", error);
        }
    }

    // File hangeling with Appwrite storage
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Error in Appwrite at upload File: ", error);
            return false;
        }
    }
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.log("Error in Appwrite at delete File: ", error);
            return false;
        }
    }
    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            config.appwriteBucketId,
            fileId,
        )
    }
}

const dbservice = new Dbservice()

export default dbservice;
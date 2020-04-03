'use strict'

const DatabaseConnector = require('../database/DatabaseConnector')
const connector = new DatabaseConnector()
const modelName = 'post.model'
const Post = require(`../models/${modelName}`)

/**
 * Post Services class
 * Contains functions to retrieve information from the database.
 * TODO: Clean up code and finish documentation.
 * @author Jamie Weathers
 */

class PostServices {

  /**
   * Adds a new post to the database.
   * 
   * @param {*} postDTO Post data transfer object.
   * @returns {Object|false} Post object or false if creating a new post unsuccessful
   * @author Jamie Weathers
   * @since 1.0.0
   */
    static async addNew(postDTO) {

        try {

            const newPost = new Post({
                title = postDTO.title,
                content = postDTO.content,
                topic = postDTO.topic,
                likeCount = postDTO.likeCount,
                arrayLike = postDTO.arrayLike,
                comments = postDTO.comments,
                author = postDTO.author,
                isActive = postDTO.isActive
                });

            const result = await connector.create(modelName, newPost);
            if (!result) {
                console.log('New post failed at PostServices');
                 return false;
             }
            return result;

        } catch (error) {
            console.log(error);
            return false;
        }

    }

    /**
     * 
     * @param {*} postId 
     * @returns {Object|null|false} Returns the post Object if it is found, null if it is not found, and false if unsuccessful.
     * @author Jamie Weathers
     * @since 1.0.0
     */
    static async getById(postId) {
        const postResult = await connector.readOne(modelName, postId);

        if (postResult === false) {
            console.log(`Error: bad post ID [${postId}].`);
        }

        if (postResult === null) {
            console.log(`Error: post with ID [${postId} not found.]`)
        }

        return postResult;
    }

    /**
     * Gets an array of posts based on the provided filter conditions.
     * If not filter defined, all posts will be returned.
     * @param {object} filter 
     * @returns {object|null|false} the post object if successful | null if no post found | false if unsuccessful
     * @author Jamie Weathers
     * @since 1.0.0
     */
    static async getMany(filter) {

        //TODO: Need a filter utility.

        const allPosts = await connector.readMany(modelName, filter);

        if (!allPosts) {
            console.log('Could not find any posts with the provided query.');
        }

        return allPosts;
    }

    static async update(postId, newData) {

        const updatedPost = await connector.update(modelName, postId, newData);

        if (updatedPost === null) {
            console.log(`Could not find post ID [${postId}] to update.`);
        }

        if (updatedPost === false) {
            console.log(`Update post ID [${postId}] failed.`)
        }

        return updatedPost;
    }

    /**
     * Changes the 'isActive' field of the post to false.
     * @param {*} postId 
     * @returns {boolean} true if succcessful, false if post is not found or already hidden.
     * @author Jamie Weathers
     * @since 1.0.0
     */
    static async hide(postId) {

        const hideData = {'isActive' : 'false'};
        const getPost = await this.update(postId, hideData);

        return getPost;
    }

    /**
     * Changes the 'isActive' field of the post to true.
     * @param {ObjectId|string} postId
     * @returns {boolean} true if successful, false if post not found or already showing.
     */
    static async show(postId) {
        const hideData = {'isActive' : 'true'};
        const getPost = await this.update(postId, hideData);

        return getPost;
    }

}


module.exports = PostServices;
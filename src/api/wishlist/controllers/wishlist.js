'use strict';

/**
 * wishlist controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wishlist.wishlist', ({ strapi }) => ({
  // Override the default create method to properly handle user assignment
  async create(ctx) {
    const { data } = ctx.request.body;
    
    // Ensure user is properly assigned
    if (data.user && typeof data.user === 'string') {
      data.user = parseInt(data.user);
    }
    
    // Ensure product is properly assigned
    if (data.product && typeof data.product === 'string') {
      data.product = parseInt(data.product);
    }
    
    console.log('🔍 [Wishlist Controller] Creating wishlist entry with data:', data);
    
    try {
      const entity = await strapi.entityService.create('api::wishlist.wishlist', {
        data: {
          ...data,
          publishedAt: new Date(), // Auto-publish since draftAndPublish is true
        },
        populate: {
          user: true,
          product: {
            populate: {
              main_image: true
            }
          }
        }
      });
      
      console.log('✅ [Wishlist Controller] Wishlist entry created:', entity);
      
      return this.transformResponse(entity);
    } catch (error) {
      console.error('❌ [Wishlist Controller] Error creating wishlist:', error);
      throw error;
    }
  },
  
  // Override the default find method with simplified approach
  async find(ctx) {
    console.log('🔍 [Wishlist Controller] Find method called with query:', ctx.query);
    console.log('🔍 [Wishlist Controller] Original filters:', JSON.stringify(ctx.query.filters, null, 2));
    
    try {
      // Let the parent controller handle the main logic but with our populate
      const sanitizedQuery = await this.sanitizeQuery(ctx);
      console.log('🔍 [Wishlist Controller] Sanitized query:', JSON.stringify(sanitizedQuery, null, 2));
      
      // Override populate to ensure we get the relations we need
      sanitizedQuery.populate = {
        user: {
          fields: ['id', 'username', 'email']
        },
        product: {
          populate: {
            main_image: {
              fields: ['url', 'alternativeText']
            }
          }
        }
      };
      
      const { results, pagination } = await strapi.service('api::wishlist.wishlist').find(sanitizedQuery);
      
      console.log('📊 [Wishlist Controller] Found results:', results.length, 'items');
      console.log('📊 [Wishlist Controller] Sample result structure:', JSON.stringify(results[0], null, 2));
      
      return this.transformResponse(results, { pagination });
    } catch (error) {
      console.error('❌ [Wishlist Controller] Error in find:', error);
      console.error('❌ [Wishlist Controller] Error stack:', error.stack);
      throw error;
    }
  }
}));

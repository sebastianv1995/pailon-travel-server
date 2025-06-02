module.exports = {
    lifecycles: {
      async beforeCreate(data) {
        const existingWishlist = await strapi.services.wishlist.find({
          user: data.user,
          product: data.product,
        });
        if (existingWishlist.length > 0) {
          throw new Error('Este producto ya está en tu lista de deseos');
        }
      },
    },
  };
  
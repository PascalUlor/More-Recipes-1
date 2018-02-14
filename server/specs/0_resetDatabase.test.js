/**
 * Reset entire test database
 */
import models from '../models';

const {
  User,
  Recipe,
  Favorite,
  Review,
  Vote,
} = models;

before((done) => {
  User.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });

  Recipe.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });

  Review.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });

  Favorite.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });

  Vote.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });
  return done();
});

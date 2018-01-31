/**
 * Reset entire test database
 */
import models from '../models';

const {
  Users,
  Recipes,
  Favorites,
  Reviews,
  Votes,
} = models;

before((done) => {
  Users.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });

  Recipes.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });

  Reviews.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });

  Favorites.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });

  Votes.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });
  return done();
});

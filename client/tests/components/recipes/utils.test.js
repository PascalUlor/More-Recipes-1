/* eslint-disable */
import { fetchCurrentPageRecipes } from '../../../utils/deleteSelectedRecipe';


describe('Testing fetchCurrentPageRecipes', () => {
  it('should render correctly', () => {
    fetchCurrentPageRecipes(
      jest.fn(),
      'Success',
      jest.fn(() => Promise.resolve()), // fetchRecipes
      false,
      [],
      1,
      {
        remove: jest.fn(),
        success: jest.fn(),
      }
    );
  });

  it('should render correctly with currentPage > 1', () => {
    fetchCurrentPageRecipes(
      jest.fn(),
      'Success',
      jest.fn(() => Promise.resolve()), // fetchRecipes
      false,
      [],
      2,
      {
        remove: jest.fn(),
        success: jest.fn(),
      }
    );
  });

  it('should render correctly with deleteError', () => {
    fetchCurrentPageRecipes(
      '',
      'Error',
      jest.fn(() => Promise.resolve()), // fetchRecipes
      false,
      [],
      2,
      {
        remove: jest.fn(),
        success: jest.fn(),
        error: jest.fn(),
      }
    );
  });
});

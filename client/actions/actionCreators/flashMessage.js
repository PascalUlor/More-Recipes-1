import { ADD_FLASH_MESSAGE } from '../actionTypes/actionTypes';

/**
 * @description handles flash messaging
 *
 * @param { object } message - contains object of flash message
 *
 * @returns { object } flash message - returns flash message action
 */
const flashMessage = message => ({
  type: ADD_FLASH_MESSAGE,
  message
});

export default flashMessage;

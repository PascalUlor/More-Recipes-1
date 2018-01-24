 import dotenv from 'dotenv';
 import mailer from './mailer';
 import modifiedFavoriteNotifierTemplate from './emailTemplates/modifiedFavoriteNotifierTemplate';

 dotenv.config();

 /**
  * @description function for sending notification email when a user's recipe gets a review
  * @function
  *
  * @param   {object} modelU          -  Users model
  * @param   {number} authorID        -  ID of the recipe author/owner
  * @param   {object} modifiedRecipe  -  Object contents of the modified recipe
  * @param   {array} usersToMail      -  The array of users to mail,that favorited the recipe
  *
  *@returns  {function}               -  The nodemailer function that send mail to the individual users
  */
 const modifiedFavoriteNotifier = (modelU, authorID, modifiedRecipe, usersToMail) => {
   modelU.findOne({ where: { id: authorID } }).then((authorDetails) => {
     usersToMail.map((user) => {
       const mailOptions = {
         from: `"More-Recipes" <${process.env.AUTHORIZED_EMAIL}>`,
         to: user.email,
         subject: `${modifiedRecipe.title} has been modified`,
         html: modifiedFavoriteNotifierTemplate(modifiedRecipe, user.username, authorDetails.fullName)
       };
       return mailer(mailOptions);
     });
   });
 };

 export default modifiedFavoriteNotifier;

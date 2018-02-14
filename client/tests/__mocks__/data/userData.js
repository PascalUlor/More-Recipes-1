const data = {
  signUpData: {
    fullName: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@domain.com',
    password: 'password123',
    repassword: 'password123'
  },
  signUpResponse: {
    status: 'Success',
    message: 'Successfully created account',
    user: {
      id: 1,
      username: 'johndoe',
      email: 'johndoe@gmail.com'
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IkpvaG4gR' +
      'G9lIiwidXNlcm5hbWUiOiJqb2huZG9lIiwidXNlcklkIjoxLCJpYXQiOjE1MTA2OTM5ODQs' +
      'ImV4cCI6MTUxMDcyMjc4NH0.V7uV9JrLsQKLXvet46CxpOK_hIDbX9FHBCgFhWAVt98'
  },
  signInData: {
    username: 'johndoe',
    password: 'password123'
  },
  signInResponse: {
    status: 'Success',
    message: 'You are now logged In',
    user: {
      id: 1,
      username: 'johndoe',
      email: 'johndoe@gmail.com'
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZml' +
      'yc3ROYW1lIjoiSmFuZSIsImlhdCI6MTUxNzc1MjIwMH0.X1VpXqy' +
      '8rFvn56e6waBx6BAcjowkXryTbrXCNR3Z0DY'
  },
  getProfileResponse: {
    status: 'Success',
    message: 'User found',
    user: {
      id: 1,
      fullName: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      profileImage: null,
      location: null,
      aboutMe: null
    }
  },
  updateData: {
    fullName: 'John Will Doe',
    username: 'johnny',
    email: 'johndoe@gmail.com',
    imageFile: '',
    location: 'Lagos',
    aboutMe: 'I am feeling ontop of the world'
  },
  updateResponse: {
    status: 'Success',
    message: 'Successfully updated profile',
    updatedUser: {
      id: 1,
      fullName: 'John Will Doe',
      username: 'johnny',
      email: 'johndoe@gmail.com',
      profileImage: process.env.DEFAULT_IMAGE_URL,
      location: 'Lagos',
      aboutMe: 'I am feeling ontop of the world'
    }
  },
  profileError: {
    message: 'Internal server error'
  }
};

export default data;

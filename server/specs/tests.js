 /**
  * API Endpoint Tests for dummy data
  */
 import supertest from 'supertest';
 import chai from 'chai';
 import app from '../app';

 const { expect } = chai,
 request = supertest(app);
'use strict';
const MOCKLIST = [
  {
    id: 1,
    title: 'test1'
  },
  {
    id: 2,
    title: 'test2'
  },
  {
    id: 3,
    title: 'test3'
  }
];

/**
  * get data from mockup list
  * @param {object} actionPayload - Payload object.
  *   @param {string} actionPayload.whereStr - The string for db "WHERE" statement
  *   @param {requestCallback} actionPayload.callback - The return callback function
  */
const get = () => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(MOCKLIST);
    }, 1000);
  });

};



module.exports = {
  get: get,
};




'use strict';
const message = require('../tools/message');
const util = require('../tools/util');


/**
  * single object data
  * @param {object} input - input object.
  */
const single = (input, reply) => {
  if (input.length > 0){
    message.MsgObject(input[0], reply);
  }
  else {
    message.MsgObject({}, reply);
  }
};

/**
  * Listing object data (without paging)
  * @param {object} input - input object.
  */
const list = (input, reply) => {
  let arrObj = {
    arr : input,
    totalRowCount : input.length
  };
  message.MsgListArray(arrObj, null, reply);
};



/**
  * Paging data
  * @param {object} input - input object.
  *   @param {object} input.pageObj - pageObj object.
  *   @param {object} input.params - params.
  *   @param {object} input.sum - sum.
  *   @param {object} input.url - the page url.
  *   @param {object} input.data - data.
  *   @param {object} input.reply - reply object.
  */
const paging = (input) => {

  let pages = util.getPages(input.sum);
  let arrObj = {
    arr : input.data,
    totalRowCount : input.sum
  };

  if (!input.pageObj.pageAll) {
    let res = util.handlePageURL(input.params, input.url, input.data.length, pages, input.pageObj.paging);
    let pageingObj = {
      paging : res.current,
      pages : pages,
      previous : res.previous,
      next :res.next
    };
    message.MsgListArray(arrObj, pageingObj, input.reply);
  }
  else {
    message.MsgListArray(arrObj, null, input.reply);
  }


};

module.exports = {
  single: single,
  list:list,
  paging: paging
};

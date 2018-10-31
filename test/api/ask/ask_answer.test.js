'use strict';
/* global describe it */
const async = require('async');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const config = require('config');
const server = config.get('commons.serverURL');
chai.use(chaiHttp);

let arrLen = 0;
let singleTarget = null;

let filter = [
  {query:'game',value:'2018-taipei'},
  {query:'q',value:'hahaha'},
  {query:'topics',value:'[1,2]'},
  {query:'personas',value:'[1,2]'},
  {query:'me_reviewed',value:1},
  {query:'order_by',value:'start_date'},
  {query:'order_by',value:'review_count'},
  {query:'order_by',value:'review_average'}
];

async.waterfall([
  (callback) => {
    describe('[ASK] GET ask/answers', () => {
      it('Should return an array of answers', (done) => {
        chai.request(server).get('/ask/answers').end((err, res) => {
          expect(res).to.have.property('statusCode').that.is.equal(200);
          expect(res.body).to.have.property('rows').that.is.an('array');
          arrLen = res.body.rows.length;
          singleTarget = res.body.rows[0].id;
          callback(done());
        });
      });
    });
  },
  (callback) => {
    if (arrLen > 0 && singleTarget !== null) {
      async.map(filter, function (item,callback_s) {
        describe(`[ASK] GET ask/answers?${item['query']}=${item['value']}`, () => {
          it('Should return an array of answers', (done) => {
            chai.request(server).get(`/ask/answers?${item['query']}=${item['value']}`).end((err, res) => {
              if (err) {
                callback_s(err);
              }
              else {
                expect(res).to.have.property('statusCode').that.is.equal(200);
                expect(res.body).to.have.property('rows').that.is.an('array');
                callback_s(done());
              }      
            });
          });
        });
      }, function (err) {
        if (err) {
          callback(err);
        } 
        else {
          callback(null);
        }
      });
    }
  },
  (callback) => {
    if (arrLen > 0 && singleTarget !== null) {
      describe('[ASK] GET ask/answers/:id', () => {
        it('Should return an object of answers', (done) => {
          chai.request(server).get(`/ask/answers/${singleTarget}`).end((err, res) => {
            expect(res).to.have.property('statusCode').that.is.equal(200);
            expect(res.body).to.have.property('id').that.is.equal(singleTarget);
            callback(done());
          });
        });
      });
    }
  },
], function (err) {
  if (err) {
    console.log(err);
  }
});

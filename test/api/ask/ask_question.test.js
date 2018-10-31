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
  {query:'statuses',value:'["keep_pushing"]'},
  {query:'statuses',value:'["expect_answers"]'},
  {query:'statuses',value:'["failed"]'},
  {query:'personas',value:'[1,2]'},
  {query:'me_pushed',value:1},
  {query:'assigned_to',value:1},
  {query:'answered_by',value:1},
  {query:'answered',value:1},
  {query:'order_by',value:'start_date'},
  {query:'order_by',value:'push_count'}
];

async.waterfall([
  (callback) => {
    describe('[ASK] GET ask/questions', () => {
      it('Should return an array of questions', (done) => {
        chai.request(server).get('/ask/questions').end((err, res) => {
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
        describe(`[ASK] GET ask/questions?${item['query']}=${item['value']}`, () => {
          it('Should return an array of questions', (done) => {
            chai.request(server).get(`/ask/questions?${item['query']}=${item['value']}`).end((err, res) => {
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
      describe('[ASK] GET ask/questions/:id', () => {
        it('Should return an object of questions', (done) => {
          chai.request(server).get(`/ask/questions/${singleTarget}`).end((err, res) => {
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

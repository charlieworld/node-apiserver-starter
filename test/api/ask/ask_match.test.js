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

let gameSlug = '2017-justice-reform';
let matchSlug = 0;

async.waterfall([
  (callback) => {
    describe(`[ASK] GET ask/games/${gameSlug}/matches`, () => {
      it('Should return an array of matches', (done) => {
        chai.request(server).get(`/ask/games/${gameSlug}/matches`).end((err, res) => {
          expect(res).to.have.property('statusCode').that.is.equal(200);
          expect(res.body).to.have.property('rows').that.is.an('array');
          //res.body.length.should.be.eql(0);
          arrLen = res.body.rows.length;
          matchSlug = res.body.rows[0].slug;
          callback(done());
        });
      });
    });
  },
  (callback) => {
    if (arrLen > 0 && singleTarget !== null) {
      describe(`[ASK] GET ask/games/${gameSlug}/matches/${matchSlug}`, () => {
        it('Should return an object of games', (done) => {
          chai.request(server).get(`ask/games/${gameSlug}/matches/${matchSlug}`).end((err, res) => {
            expect(res).to.have.property('statusCode').that.is.equal(200);
            expect(res.body).to.have.property('slug').that.is.equal(matchSlug);
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

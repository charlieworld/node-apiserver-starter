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

async.waterfall([
  (callback) => {
    describe('[ASK] GET ask/games', () => {
      it('Should return an array of games', (done) => {
        chai.request(server).get('/ask/games').end((err, res) => {
          expect(res).to.have.property('statusCode').that.is.equal(200);
          expect(res.body).to.have.property('rows').that.is.an('array');
          //res.body.length.should.be.eql(0);
          arrLen = res.body.rows.length;
          singleTarget = res.body.rows[0].slug;
          callback(done());
        });
      });
    });
  },
  (callback) => {
    if (arrLen > 0 && singleTarget !== null) {
      describe('[ASK] GET ask/games/:slug', () => {
        it('Should return an object of games', (done) => {
          chai.request(server).get(`/ask/games/${singleTarget}`).end((err, res) => {
            expect(res).to.have.property('statusCode').that.is.equal(200);
            expect(res.body).to.have.property('slug').that.is.equal(singleTarget);
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

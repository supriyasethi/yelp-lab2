const assert = require('chai').assert;
const app = require('../index');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
//chai.use(chaiHttp);
chai.should();

describe("App", () => {
describe('GET /get/events', () => {
    it('should return a list of events when called', done => {
      chai
        .request(app)
        .get('/get/event')        
        .end((err, res) => {
          res.should.have.status(200);                    
          done();
        });
    });
  });

  describe("POST /login/user", () => {

	it("should return status 200", async () => {
    	chai
        	.request(app)
        	.post('/login/user')
        	.send({username: "ssupriya.sethi@gmail.com", password: "sss"})
            .end((err, res) => {
                res.should.have.status(200);         
    	})	
    })
})

describe("GET /get/orders", () => {

	it("should return status 200", async () => {
    	chai
        	.request(app)
        	.get('/get/orders')
        	.query({restaurantId: 1})
            .end((err, res) => {
                res.should.have.status(200);         
    	})	
    })
})

describe("GET /get/events", () => {

	it("should return status 200", async () => {
    	chai
        	.request(app)
        	.get('/get/events')
        	.query({restaurantId: 1})
            .end((err, res) => {
                res.should.have.status(200);         
    	})	
    })
})

describe("GET /get/bizlist", () => {

	it("should return status 200", async () => {
    	chai
        	.request(app)
        	.get('/get/bizlist')
        	.query({userId: 1})
            .end((err, res) => {
                res.should.have.status(200);         
    	})	
    })
})
})
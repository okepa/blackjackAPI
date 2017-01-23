//external modules
const chai = require('chai');
const should = chai.should();
const expect = require('chai').expect;
const assert = require("chai").assert;
//app modules
const User = require('../models/user');
const loginLib = require('../lib/login');
const registerLib = require('../lib/register');

/** 
 *  UNIT TEST - demo-SUCCESS
 **/
describe("demo-SUCCESS", (done) => {
    // dummy object
    let userData = {
        fullName: "Josh Bello",
        email: "abc.abc@gmail.com",
        username: "jbjb ",
        password: "hello",
        dob: new Date("1994-08-30")
    };

    it("if data is valid then the object should be saved to the database", (done) => {
        expect(userData.fullName).to.be.an("string"),
            expect(userData.username).to.be.an("string"),
            expect(userData.email).to.be.an("string"),
            expect(userData.password).to.be.an("string"),
            expect(userData.dob).to.be.an("Date");
        User.create({ userData })
        done();
    })
})


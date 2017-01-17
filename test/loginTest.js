const chai = require('chai');
const should = chai.should();
const expect = require('chai').expect;
const assert = require("chai").assert;

const User = require('../models/user');
const loginLib = require('../lib/loginLib');
const registerLib = require('../lib/register');


let userData = {
    fullName: "Josh Bello",
    email: "abc.abc@gmail.com",
    username: "jbjb ",
    password: "hello",
    dob: 1994 / 08 / 30
};

/** 1). 
 *  @param {Object} userData
 *  
 **/
describe("demo", (done) => {
    it("creates a user object", (done) => {
        User.create({ userData })
        assert.isObject(userData, "its alive")
        done();
    })

    it("should expect the field to be a string", () => {
        expect(userData.fullName).to.be.an("string");
    })


    // it("datefield should not be a string,acccept date format only", (done) => {
    //     should.  (userData, "its alive")
    //     done();
    // })


})

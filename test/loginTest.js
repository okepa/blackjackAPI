const chai = require('chai');
const should = chai.should();
const expect = require('chai').expect;
const assert = require("chai").assert;
const User = require("../models/user");

let userData = {
    fullName: "Josh Bello",
    email: "abc.abc@gmail.com",
    username: "jbjb ",
    password: "hello",
    dob: 1994 / 08 / 30
};


describe("demo", (done) => {
    it("creates a user object", (done) => {
        User.create({ userData })
        assert.isObject(userData, "its alive")
        done();
    });
});
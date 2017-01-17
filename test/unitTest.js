//external modules
const chai = require('chai');
const should = chai.should();
const expect = require('chai').expect;
const assert = require("chai").assert;
//app modules
const User = require('../models/user');
const loginLib = require('../lib/loginLib');
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
    // cretes a user object using dummy data
    it("creates a user object", (done) => {
        User.create({ userData })
        assert.isObject(userData, "its alive")
        done();
    })
    // tests that the field accepts only string values
    it("should expect the field to be a string", (done) => {
        expect(userData.fullName).to.be.an("string");
        done();
    })
    // tests that the field accepts only date-formated values
    it("should expect the field to be a Date", (done) => {
        expect(userData.dob).to.be.an("Date");
        done();
    })
})


/** 
 *  UNIT TEST - demo-FAILURE
 **/
describe("demo-FAILURE", (done) => {
    // dummy data
    let userData = {
        fullName: 12345,
        email: 1231,
        username: 987,
        password: 12312,
        dob: "1994/08/30"
    };
    
    it("shouldn't save in the database", (done) => {
        let errorUserData = {};
        User.create({ errorUserData })
        expect(errorUserData).to.be.empty;
        done();
    })

    it("should only accepts string", (done) => {
        expect(userData.fullName).not.to.be.an("string");
        done();
    })
    it("should only accepts Date", (done) => {
        expect(userData.dob).not.to.be.an("Date");
        done();
    })
})



// /** 3). 
//  *  UNIT TEST - functions
//  *  
//  **/
// describe("demo-functions-register", (done) => {
//     let userData = {
//         fullName: "Josh Bello",
//         email: "joshbello@gmail.com",
//         username: "joshbello",
//         password: "joshbello",
//         dob: new Date("1994-08-30")
//     };
//     it(" should register a user", (done) => {

//         registerLib.createUser(userData)
//             .then(result => {
//                 console.log(result);
//                 result.should.not.be.empty;
//                 done();
//             })
//             .catch(err => {
//                 console.log(err.message);
//                 done();
//             });
//     });


//     describe("demo-functions-login", (done) => {
//         let test = {
//             username: "joshbello ",
//             password: "joshbello"
//         };
//         it("should log in", (done) => {

//             loginLib.loginUser(test)
//                 .then(result => {
//                     console.log("HERE I AM ", result);
//                     should.not.exist();
//                     result.should.be.an("Object");
//                 })
//                 .catch(err => {
//                     console.log(err.message);
//                     done();
//                 })
//         });
//     });
// });
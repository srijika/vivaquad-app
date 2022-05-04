

const db = require('../db/conn');
const {UserLogins , School} = db;
var ROLES = require('../../config.json').ROLES;
const generateOTP = require('../helper/otp_generate');
let bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const jwt = require('jsonwebtoken');
let saltRounds = 10;
const Helper = require('../helper/helper');










module.exports = {
    //Users//
    getalluser: async (req, res, next) => {

        try {
            const reqBody = req.body;
            console.log(reqBody);
            const Limit = reqBody.limit ? parseInt(reqBody.limit) : 10;
            const PageNo = reqBody.page ? parseInt(reqBody.page) : 0;
            const sortColumn = reqBody.sortColumn ? reqBody.sortColumn : 'updated';
            const sortType = reqBody.sortType ? (reqBody.sortType == 'asc' ? 1 : -1) : -1;
            let role = reqBody.role;
            const get_user = await UserLogins.findOne({_id: reqBody.user_id });







            if (role && !ROLES.includes(role)) {
                return res.send({
                    status: false,
                    message: "Not valid role"
                });
            }

            const MATCH = {};
            MATCH.$or = [];
            MATCH.$and = [];

            if(get_user.roles === 'ADMIN'){

                if (role) {
                    MATCH.$and.push({
                        roles: role
                    });
                }
            
                if (!MATCH.$or.length) {
                    delete MATCH.$or;
                }
                if (!MATCH.$and.length) {
                    delete MATCH.$and;
                }
            }else{
                const getSchool = await School.findOne({loginid:get_user._id });
                let school_id = getSchool._id
                if (role) {
                    MATCH.$and.push({
                        roles: role ,
                        school_id: school_id 
            
                    });
                }
            
                if (!MATCH.$or.length) {
                    delete MATCH.$or;
                }
                if (!MATCH.$and.length) {
                    delete MATCH.$and;
                }
            }

            const data = await UserLogins.aggregate([


                {
                    $match: MATCH
                },
                {
                    $sort: {
                        [sortColumn]: sortType
                    }
                },
                {
                    $skip: (Limit * PageNo)
                },
                {
                    $limit: Limit
                }
            ]);

            const countUser = await UserLogins.aggregate([


                {
                    $match: MATCH
                },
            ]);


            return res.send({
                status: true,
                data: data,
                total: countUser.length,
                message: 'Users get successfully'
            });
        } catch (error) {
            return res.send({
                status: false,
                message: error.message
            });
        }
    },
    userActive: async (req, res, next) => {
        let _id = req.body._id


        let isuser = await UserLogins.findById({
            _id
        });
        if (isuser) {
            if (isuser.user_status === "active") {
                res.status(true).send({
                    status: true,
                    user_status: isuser.user_status

                });
            } else {
                res.send({
                    status: false,
                });
            }
        } else {
            res.send({
                status: false,
            });
        }



    },
    userActiveDeactiveStatus: async (req, res, next) => {
        try {
            let {
                id
            } = req.body;

            UserLogins.findById(id, function (err, data) {
                data.user_status = !data.user_status;
                data.save((err, result) => {
                    if (result) {
                        return res.send({
                            status: true,
                            message: "User action changed successfully"
                        });
                    } else {
                        return res.send({
                            status: false,
                            message: err
                        });
                    }
                })
            });

        } catch (e) {
            console.log(e);
            return res.send({
                status: false,
                message: e.message
            });
        }
    },
    getprofile: async (req, res, next) => {

        try {
            const profileId = req.body.profile_id;


            if (!profileId) {
                return res.send({
                    status: false,
                    message: 'Profile Id is required'
                });
            }

            let profile = await UserLogins.findById(profileId).lean().exec();
            const getSchool = await School.findOne({_id :profile.school_id });
            let schoolDetail = {}
            if(getSchool){
                profile.schoolDetail = getSchool
            }

            if(profile.roles === 'SUBADMIN'){
            const getSchool = await School.findOne({loginid :profile._id }); 
            console.log(getSchool)
            profile.schoolDetail = getSchool
            }

        
            if (!profile) {
                return res.send({
                    status: false,
                    message: 'User not found'
                });
            }

            const user = await UserLogins.findOne({
                _id: profileId
            }).exec();


            profile.name = user.username;

            // console.log("profile" ,profile)

            return res.send({
                status: true,
                userLogin: user,
                profile
            });

        } catch (error) {
            return res.send({
                status: false,
                message: error.message
            });
        }
    },

    editprofile: async (req, res, next) => {

        try {

            const {
                user_id,
                name
            } = req.body;
            let avatar = null;

            if (!user_id) {
                return res.status(501).send({
                    status: false,
                    message: 'User Id is required'
                });
            }


            if (req.files[0] && req.files[0].location && req.files[0].location != 'undefined') {
                avatar = req.files[0].location;
            }

            let profile = await UserLogins.findById(user_id).lean().exec();


            if (!profile) {
                return res.status(501).send({
                    status: false,
                    message: 'User not found'
                });
            }


            const user = await UserLogins.updateOne({
                _id: user_id
            }, {
                username: name,
                avatar: avatar
            }).then((data) => {

            });

            return res.status(true).send({
                status: true,
                message: "Profile updated successfully!"
            });

        } catch (error) {
            return res.status(false).send({
                status: false,
                message: error.message
            });
        }
    },
    updateUserProfile: async (req, res, next) => {

        try {
            const {
                _id,
                name,
                biography,
                age,
                dob,
                address,
                latitude,
                longitude
            } = req.body;




            if (!name) {
                res.send({
                    status: false,
                    message: "Required Parameter is missing"
                });
                return;
            }
            console.log("req.body", req.body)

            UserLogins.findOne({
                _id: req.body._id
            }).then(async (data) => {

                if (data && data._id) {
                    const userData = {
                        username: name,
                        age: age,
                        dob: dob,
                        address: address,
                        latitude: latitude,
                        longitude: longitude,
                        location: {
                            "type": "Point",
                            "coordinates": [
                                latitude,
                                longitude
                            ]
                        },
                        biography: biography


                    }




                    let avatar

                    if (req.files && req.files[0] && req.files[0].location) {
                        userData['avatar'] = req.files[0].location;
                        avatar = req.files[0].location;
                    }



                    let result = await UserLogins.findByIdAndUpdate({
                        _id: _id
                    }, userData)

                    if (avatar !== undefined || avatar !== null) {
                        const user = await UserLogins.findOne({
                            _id: _id
                        })
                        console.log("user", user)

                        return res.send({
                            status: true,
                            user: user,
                            message: "User Profile updated successfully"
                        });

                    } {
                        const user = await UserLogins.findOne({
                            _id: _id
                        })
                        return res.send({
                            status: true,
                            user: user,
                            avatar,
                            message: "User Profile updated successfully"
                        });

                    }

                }

            });

        } catch (error) {
            return res.send({
                status: false,
                message: error.message
            });
        }

    },
    adminupdateprofile: async (req, res, next) => {
        try {

        
        const {
           name,
        } = req.body;

        if (!name) {
            res.send({
                status: false,
                message: "Required Parameter is missing"
            });
     
        }
    
        UserLogins.findOne({
            _id: req.user._id
        }).then((data) => {
        
            if (data && data._id) {
                req.body['updated'] = new Date();

                let avatar = null;
                const data = {
                    username: req.body.name,

                }
                if (req.files && req.files[0] && req.files[0].location) {
                    data['avatar'] = req.files[0].location;
                }

             
        
                UserLogins.updateOne({
                    _id: req.user._id
                }, data).then((data) => {
                    return res.send({
                        status: true,
                        data
                    });

                }).catch((err) => {
                    return res.send({
                        status: false,
                        message: err.errmsg
                    });

                });
            }

        })}
        catch (e) {
            return res.status(false).send({
                status: true,
                message: e.message
            });
        }

    },

    getUserDetail: async (req, res, next) => {
        console.log("coming")
        try {
            let user = await UserLogins.findById(req.body.user_id).lean().exec();

            return res.status(true).send({
                status: true,
                user: user,
            });
        } catch (e) {
            return res.status(false).send({
                status: true,
                message: e.message
            });
        }

    },
    deleteuser: async (req, res, next) => {
        try {
            const {
                _id
            } = req.body;
            if (!_id) {
                res.send({
                    status: false,
                    message: "Not valid id"
                });
                return;
            }
  const deleteUser = await UserLogins.findByIdAndDelete(_id);
            if (!deleteUser) {
                return res.send({
                    status: false,
                    message: 'User not found'
                })
            }

            return res.send({
                status: true,
                message: 'User deleted successfully'
            });

        } catch (error) {
            return res.send({
                status: false,
                message: error.message
            })
        }
    },


    //Employee
    createEmployee: async (req, res, next) => {

 


    
        try {
            const {

                dob,
                email,
                employee_type,
                username,
                mobile_number, 
                user_id              

            } = req.body;


            const password = 'vivaquad@123'
            const roleType = 'EMPLOYEE'
            const userOtp = generateOTP();

 

            if (!email)
                return res.send({
                    status: false,
                    message: "Email is required"
                });

            if (!password)
                return res.send({
                    status: false,
                    message: "Password is required"
                });


            const hash = bcrypt.hashSync(password, saltRounds);
            const getSchool = await School.findOne({loginid :user_id });




            const data = {
                email: email,
                username: username,
                mobile_number: mobile_number,
                password: hash,
                roles: roleType,
                otp :userOtp ,
                employee_type: employee_type,
                dob: dob,
                school_id: getSchool._id,

            }; 


 
      
      
           //Multer
        let filename;
        if(req.files.length > 0) {
    
            req.files.forEach(E => {
                var filePath = path.join(__dirname, '../../public/users/');

                if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath);
            }
            
            const fileUrl = filePath + E.filename;
            sharp(E.path).toFile(fileUrl, function (err) {
                if (err) {
                    console.log(err)
                }
            });      
            let imageUrl 
            
            if(req.hostname == 'vivaquadbackend.plenumnetworks.com'){
                imageUrl = `${req.protocol}://${req.hostname}`
            }else{
                imageUrl = `${req.protocol}://${req.hostname}:4000`
            }

            filename = `${imageUrl}/users/${E.filename}`;

            });
        }

        data.avatar = filename;
            //Multer S3 Bucket    
            // if (req.files && req.files[0] && req.files[0].location) {
            //     data['avatar'] = req.files[0].location;
            //     avatar = req.files[0].location;
            // }

            const isUser = await UserLogins
                .findOne({
                    $or: [{
                        email: email
                    }]
                })
                .lean().exec();

            const isUserMobile = await UserLogins
                .findOne({
                    $or: [{
                        mobile_number: mobile_number
                    }]
                })
                .lean().exec();

            if (isUser) {
                let msg = 'This';
                if (isUser.email === email) {
                    msg += ' Email';
                }
                msg += ' is already registered';

                return res.send({
                    status: false,
                    message: msg
                });
            }

            if (isUserMobile) {
                let msg = 'This';
                if (isUserMobile.mobile_number === mobile_number) {
                    msg += ' Mobile No.';
                }
                msg += ' is already registered';

                return res.send({
                    status: false,
                    message: msg
                });
            } 

      
            const userLoginCreate = await (new UserLogins(data)).save();
            let isUser1 = await UserLogins.findOne({
                $or: [{
                    email: userLoginCreate.email
                }]
            }).lean().exec();

            isUser1 = {
                username: isUser1.email,
                _id: isUser1._id,
                time: new Date().getTime(),
                role: isUser1.roles 
            };

        
            let msg_body = 'Hi, <br />';
            msg_body += 'Your account has been added on Vivaquad App <br />';
            msg_body += 'Please find below your login credentials:<br />';
            msg_body += 'Email: ' + email + '<br />';
            msg_body += 'Password: ' + password + '<br />';
            msg_body += '<br />Thanks,<br />Vivaquad Team';
            await Helper.sendEmail(email, 'Vivaquad App', msg_body);
            return res.send({
                status: true,
                user: userLoginCreate,
                message: `${roleType} Sign Up Successfully`
            });


        } catch (error) {
            if (error.errmsg && error.errmsg.indexOf('E11000') > -1) {
                return res.send({
                    status: false,
                    message: "User Already Exist, Please try with other username or email"
                })
            }

            return res.send({
                status: false,
                message: error.message
            })
        }
    },
    updateEmployee: async (req, res, next) => {

 

    
        try {


            const {
                _id ,
                dob,
                email,
                employee_type,
                username,
                mobile_number, 
                              

            } = req.body;
         
   



            if (!email)
                return res.send({
                    status: false,
                    message: "Email is required"
                });


            // const data = {
            //     email: email,
            //     username: username,
            //     mobile_number: mobile_number,
            //     password: hash,
            //     roles: roleType,
            //     otp :userOtp ,
            //     employee_type: employee_type,
            //     dob: dob,
            //     school_id: getSchool._id,

            // }; 

            const data = {
                username: username,
                employee_type: employee_type,
                dob: dob,
            }; 



        



           //Multer
        let filename;
        if(req.files.length > 0) {
            req.files.forEach(E => {
                var filePath = path.join(__dirname, '../../public/users/');
                if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath);
            }
            
            const fileUrl = filePath + E.filename;
            sharp(E.path).toFile(fileUrl, function (err) {
                if (err) {
                    console.log(err)
                }
            });      
            let imageUrl 
            
            if(req.hostname == 'vivaquadbackend.plenumnetworks.com'){
                imageUrl = `${req.protocol}://${req.hostname}`
            }else{
                imageUrl = `${req.protocol}://${req.hostname}:4000`
            }

            filename = `${imageUrl}/users/${E.filename}`;
            data.avatar = filename;

            });
        }



            //Multer S3 Bucket    
            // if (req.files && req.files[0] && req.files[0].location) {
            //     data['avatar'] = req.files[0].location;
            //     avatar = req.files[0].location;
            // }

           
           let result = await UserLogins.findByIdAndUpdate(_id, data).lean().exec();
           console.log("result", result);

            return res.send({
                status: true,
                message: `update successfully`
            });


        } catch (error) {
            if (error.errmsg && error.errmsg.indexOf('E11000') > -1) {
                return res.send({
                    status: false,
                    message: "User Already Exist, Please try with other username or email"
                })
            }

            return res.send({
                status: false,
                message: error.message
            })
        }
    },
    }


    
    



    // const db = require('../db/conn');
// const {UserLogins , School} = db;
// var ROLES = require('../../config.json').ROLES;
// const generateOTP = require('../helper/otp_generate');
// let bcrypt = require('bcrypt');
// const path = require('path');
// const fs = require('fs');
// const sharp = require('sharp');
// const jwt = require('jsonwebtoken');
// let saltRounds = 10;
// const Helper = require('../helper/helper');










// module.exports = {
//     //Users//
//     getalluser: async (req, res, next) => {

//         try {
//             const reqBody = req.body;
//             console.log(reqBody);
//             const Limit = reqBody.limit ? parseInt(reqBody.limit) : 10;
//             const PageNo = reqBody.page ? parseInt(reqBody.page) : 0;
//             const sortColumn = reqBody.sortColumn ? reqBody.sortColumn : 'updated';
//             const sortType = reqBody.sortType ? (reqBody.sortType == 'asc' ? 1 : -1) : -1;
//             let role = reqBody.role;
//             const get_user = await UserLogins.findOne({_id: reqBody.user_id });







//             if (role && !ROLES.includes(role)) {
//                 return res.send({
//                     status: 400,
//                     message: "Not valid role"
//                 });
//             }

//             const MATCH = {};
//             MATCH.$or = [];
//             MATCH.$and = [];

//             if(get_user.roles === 'ADMIN'){

//                 if (role) {
//                     MATCH.$and.push({
//                         roles: role
//                     });
//                 }
            
//                 if (!MATCH.$or.length) {
//                     delete MATCH.$or;
//                 }
//                 if (!MATCH.$and.length) {
//                     delete MATCH.$and;
//                 }
//             }else{
//                 const getSchool = await School.findOne({loginid:get_user._id });
//                 let school_id = getSchool._id
//                 if (role) {
//                     MATCH.$and.push({
//                         roles: role ,
//                         school_id: school_id 
            
//                     });
//                 }
            
//                 if (!MATCH.$or.length) {
//                     delete MATCH.$or;
//                 }
//                 if (!MATCH.$and.length) {
//                     delete MATCH.$and;
//                 }
//             }

//             const data = await UserLogins.aggregate([


//                 {
//                     $match: MATCH
//                 },
//                 {
//                     $sort: {
//                         [sortColumn]: sortType
//                     }
//                 },
//                 {
//                     $skip: (Limit * PageNo)
//                 },
//                 {
//                     $limit: Limit
//                 }
//             ]);

//             const countUser = await UserLogins.aggregate([


//                 {
//                     $match: MATCH
//                 },
//             ]);


//             return res.send({
//                 status: 200,
//                 data: data,
//                 total: countUser.length,
//                 message: 'Users get successfully'
//             });
//         } catch (error) {
//             return res.send({
//                 status: 400,
//                 message: error.message
//             });
//         }
//     },
//     userActive: async (req, res, next) => {
//         let _id = req.body._id


//         let isuser = await UserLogins.findById({
//             _id
//         });
//         if (isuser) {
//             if (isuser.user_status === "active") {
//                 res.status(200).send({
//                     status: true,
//                     user_status: isuser.user_status

//                 });
//             } else {
//                 res.send({
//                     status: false,
//                 });
//             }
//         } else {
//             res.send({
//                 status: false,
//             });
//         }



//     },
//     userActiveDeactiveStatus: async (req, res, next) => {
//         try {
//             let {
//                 id
//             } = req.body;

//             UserLogins.findById(id, function (err, data) {
//                 data.user_status = !data.user_status;
//                 data.save((err, result) => {
//                     if (result) {
//                         return res.send({
//                             status: 200,
//                             message: "User action changed successfully"
//                         });
//                     } else {
//                         return res.send({
//                             status: 400,
//                             message: err
//                         });
//                     }
//                 })
//             });

//         } catch (e) {
//             console.log(e);
//             return res.send({
//                 status: 400,
//                 message: e.message
//             });
//         }
//     },
//     getprofile: async (req, res, next) => {

//         try {
//             const profileId = req.body.profile_id;

//             if (!profileId) {
//                 return res.send({
//                     status: 400,
//                     message: 'Profile Id is required'
//                 });
//             }

//             let profile = await UserLogins.findById(profileId).lean().exec();

//             if (!profile) {
//                 return res.send({
//                     status: 400,
//                     message: 'User not found'
//                 });
//             }

//             const user = await UserLogins.findOne({
//                 _id: profileId
//             }).exec();


//             profile.name = user.username;

//             return res.send({
//                 status: 200,
//                 userLogin: user,
//                 profile
//             });

//         } catch (error) {
//             return res.send({
//                 status: 400,
//                 message: error.message
//             });
//         }
//     },

//     editprofile: async (req, res, next) => {

//         try {

//             const {
//                 user_id,
//                 name
//             } = req.body;
//             let avatar = null;

//             if (!user_id) {
//                 return res.status(501).send({
//                     status: 400,
//                     message: 'User Id is required'
//                 });
//             }


//             if (req.files[0] && req.files[0].location && req.files[0].location != 'undefined') {
//                 avatar = req.files[0].location;
//             }

//             let profile = await UserLogins.findById(user_id).lean().exec();


//             if (!profile) {
//                 return res.status(501).send({
//                     status: 400,
//                     message: 'User not found'
//                 });
//             }


//             const user = await UserLogins.updateOne({
//                 _id: user_id
//             }, {
//                 username: name,
//                 avatar: avatar
//             }).then((data) => {

//             });

//             return res.status(200).send({
//                 status: 200,
//                 message: "Profile updated successfully!"
//             });

//         } catch (error) {
//             return res.status(400).send({
//                 status: 400,
//                 message: error.message
//             });
//         }
//     },
//     updateUserProfile: async (req, res, next) => {

//         try {
//             const {
//                 _id,
//                 name,
//                 biography,
//                 age,
//                 dob,
//                 address,
//                 latitude,
//                 longitude
//             } = req.body;




//             if (!name) {
//                 res.send({
//                     status: 400,
//                     message: "Required Parameter is missing"
//                 });
//                 return;
//             }
//             console.log("req.body", req.body)

//             UserLogins.findOne({
//                 _id: req.body._id
//             }).then(async (data) => {

//                 if (data && data._id) {
//                     const userData = {
//                         username: name,
//                         age: age,
//                         dob: dob,
//                         address: address,
//                         latitude: latitude,
//                         longitude: longitude,
//                         location: {
//                             "type": "Point",
//                             "coordinates": [
//                                 latitude,
//                                 longitude
//                             ]
//                         },
//                         biography: biography


//                     }




//                     let avatar

//                     if (req.files && req.files[0] && req.files[0].location) {
//                         userData['avatar'] = req.files[0].location;
//                         avatar = req.files[0].location;
//                     }



//                     let result = await UserLogins.findByIdAndUpdate({
//                         _id: _id
//                     }, userData)

//                     if (avatar !== undefined || avatar !== null) {
//                         const user = await UserLogins.findOne({
//                             _id: _id
//                         })
//                         console.log("user", user)

//                         return res.send({
//                             status: 200,
//                             user: user,
//                             message: "User Profile updated successfully"
//                         });

//                     } {
//                         const user = await UserLogins.findOne({
//                             _id: _id
//                         })
//                         return res.send({
//                             status: 200,
//                             user: user,
//                             avatar,
//                             message: "User Profile updated successfully"
//                         });

//                     }

//                 }

//             });

//         } catch (error) {
//             return res.send({
//                 status: 400,
//                 message: error.message
//             });
//         }

//     },
//     adminupdateprofile: async (req, res, next) => {
//         try {

        
//         const {
//            name,
//         } = req.body;

//         if (!name) {
//             res.send({
//                 status: false,
//                 message: "Required Parameter is missing"
//             });
     
//         }
    
//         UserLogins.findOne({
//             _id: req.user._id
//         }).then((data) => {
        
//             if (data && data._id) {
//                 req.body['updated'] = new Date();

//                 let avatar = null;
//                 const data = {
//                     username: req.body.name,

//                 }
//                 if (req.files && req.files[0] && req.files[0].location) {
//                     data['avatar'] = req.files[0].location;
//                 }

             
        
//                 UserLogins.updateOne({
//                     _id: req.user._id
//                 }, data).then((data) => {
//                     return res.send({
//                         status: 200,
//                         data
//                     });

//                 }).catch((err) => {
//                     return res.send({
//                         status: 400,
//                         message: err.errmsg
//                     });

//                 });
//             }

//         })}
//         catch (e) {
//             return res.status(400).send({
//                 status: 200,
//                 message: e.message
//             });
//         }

//     },

//     getUserDetail: async (req, res, next) => {
//         console.log("coming")
//         try {
//             let user = await UserLogins.findById(req.body.user_id).lean().exec();

//             return res.status(200).send({
//                 status: 200,
//                 user: user,
//             });
//         } catch (e) {
//             return res.status(400).send({
//                 status: 200,
//                 message: e.message
//             });
//         }

//     },
//     deleteuser: async (req, res, next) => {
//         try {
//             const {
//                 _id
//             } = req.body;
//             if (!_id) {
//                 res.send({
//                     status: 400,
//                     message: "Not valid id"
//                 });
//                 return;
//             }

//             const deleteUser = await UserLogins.findByIdAndDelete(_id);
//             if (!deleteUser) {
//                 return res.send({
//                     status: 400,
//                     message: 'User not found'
//                 })
//             }
//             const deleteProfile = await Profile.findOneAndDelete({
//                 loginid: _id
//             });
//             return res.send({
//                 status: 200,
//                 message: 'User deleted successfully'
//             });

//         } catch (error) {
//             return res.send({
//                 status: 400,
//                 message: error.message
//             })
//         }
//     },


//     //Employee
//     createEmployee: async (req, res, next) => {

 


    
//         try {
//             const {

//                 dob,
//                 email,
//                 employee_type,
//                 username,
//                 mobile_number, 
//                 user_id              

//             } = req.body;


//             const password = 'vivaquad@123'
//             const roleType = 'EMPLOYEE'
//             const userOtp = generateOTP();

 

//             if (!email)
//                 return res.send({
//                     status: false,
//                     message: "Email is required"
//                 });

//             if (!password)
//                 return res.send({
//                     status: false,
//                     message: "Password is required"
//                 });


//             const hash = bcrypt.hashSync(password, saltRounds);
//             const getSchool = await School.findOne({loginid :user_id });




//             const data = {
//                 email: email,
//                 username: username,
//                 mobile_number: mobile_number,
//                 password: hash,
//                 roles: roleType,
//                 otp :userOtp ,
//                 employee_type: employee_type,
//                 dob: dob,
//                 school_id: getSchool._id,

//             }; 


 
      
      
//            //Multer
//         let filename;
//         if(req.files.length > 0) {
    
//             req.files.forEach(E => {
//                 var filePath = path.join(__dirname, '../../public/users/');

//                 if (!fs.existsSync(filePath)) {
//                 fs.mkdirSync(filePath);
//             }
            
//             const fileUrl = filePath + E.filename;
//             sharp(E.path).toFile(fileUrl, function (err) {
//                 if (err) {
//                     console.log(err)
//                 }
//             });      
//             let imageUrl 
            
//             if(req.hostname == 'vivaquadbackend.plenumnetworks.com'){
//                 imageUrl = `${req.protocol}://${req.hostname}`
//             }else{
//                 imageUrl = `${req.protocol}://${req.hostname}:4000`
//             }

//             filename = `${imageUrl}/users/${E.filename}`;

//             });
//         }

//         data.avatar = filename;
//             //Multer S3 Bucket    
//             // if (req.files && req.files[0] && req.files[0].location) {
//             //     data['avatar'] = req.files[0].location;
//             //     avatar = req.files[0].location;
//             // }

//             const isUser = await UserLogins
//                 .findOne({
//                     $or: [{
//                         email: email
//                     }]
//                 })
//                 .lean().exec();

//             const isUserMobile = await UserLogins
//                 .findOne({
//                     $or: [{
//                         mobile_number: mobile_number
//                     }]
//                 })
//                 .lean().exec();

//             if (isUser) {
//                 let msg = 'This';
//                 if (isUser.email === email) {
//                     msg += ' Email';
//                 }
//                 msg += ' is already registered';

//                 return res.send({
//                     status: false,
//                     message: msg
//                 });
//             }

//             if (isUserMobile) {
//                 let msg = 'This';
//                 if (isUserMobile.mobile_number === mobile_number) {
//                     msg += ' Mobile No.';
//                 }
//                 msg += ' is already registered';

//                 return res.send({
//                     status: false,
//                     message: msg
//                 });
//             } 


      
//             const userLoginCreate = await (new UserLogins(data)).save();
//             let isUser1 = await UserLogins.findOne({
//                 $or: [{
//                     email: userLoginCreate.email
//                 }]
//             }).lean().exec();

//             isUser1 = {
//                 username: isUser1.email,
//                 _id: isUser1._id,
//                 time: new Date().getTime(),
//                 role: isUser1.roles 
//             };

        
//             let msg_body = 'Hi, <br />';
//             msg_body += 'Your account has been added on Vivaquad App <br />';
//             msg_body += 'Please find below your login credentials:<br />';
//             msg_body += 'Email: ' + email + '<br />';
//             msg_body += 'Password: ' + password + '<br />';
//             msg_body += '<br />Thanks,<br />Vivaquad Team';
//             await Helper.sendEmail(email, 'Vivaquad App', msg_body);
//             return res.send({
//                 status: true,
//                 user: userLoginCreate,
//                 message: `${roleType} Sign Up Successfully`
//             });


//         } catch (error) {
//             if (error.errmsg && error.errmsg.indexOf('E11000') > -1) {
//                 return res.send({
//                     status: false,
//                     message: "User Already Exist, Please try with other username or email"
//                 })
//             }

//             return res.send({
//                 status: false,
//                 message: error.message
//             })
//         }
//     },
//     updateEmployee: async (req, res, next) => {

 

    
//         try {
//             const {

//                 school_name,
//                 password,
//                 roleType,
//                 owner_name,
//                 mobile_number, 
//                 firebase_token ,
//                 email ,
//                 address

//             } = req.body;
//             const userOtp = generateOTP();





//             if (!email)
//                 return res.send({
//                     status: false,
//                     message: "Email is required"
//                 });

//             if (!password)
//                 return res.send({
//                     status: false,
//                     message: "Password is required"
//                 });
//             const hash = bcrypt.hashSync(password, saltRounds);

//             const data = {
//                 email: email,
//                 username: owner_name,
//                 mobile_number: mobile_number,
//                 password: hash,
//                 roles: roleType,
//                 firebase_token: firebase_token ,
//                 otp :userOtp
//             };



//            //Multer
//         let filename;
//         if(req.files.length > 0) {

//             req.files.forEach(E => {
//                 var filePath = path.join(__dirname, '../../public/users/');
//                 if (!fs.existsSync(filePath)) {
//                 fs.mkdirSync(filePath);
//             }
            
//             const fileUrl = filePath + E.filename;
//             sharp(E.path).toFile(fileUrl, function (err) {
//                 if (err) {
//                     console.log(err)
//                 }
//             });      
//             let imageUrl 
            
//             if(req.hostname == 'vivaquadbackend.plenumnetworks.com'){
//                 imageUrl = `${req.protocol}://${req.hostname}`
//             }else{
//                 imageUrl = `${req.protocol}://${req.hostname}:false0`
//             }

//             filename = `${imageUrl}/users/${E.filename}`;

//             });
//         }



//             //Multer S3 Bucket    
//             // if (req.files && req.files[0] && req.files[0].location) {
//             //     data['avatar'] = req.files[0].location;
//             //     avatar = req.files[0].location;
//             // }

//             const isUser = await UserLogins
//                 .findOne({
//                     $or: [{
//                         email: email
//                     }]
//                 })
//                 .lean().exec();

//             const isUserMobile = await UserLogins
//                 .findOne({
//                     $or: [{
//                         mobile_number: mobile_number
//                     }]
//                 })
//                 .lean().exec();

//             if (isUser) {
//                 let msg = 'This';
//                 if (isUser.email === email) {
//                     msg += ' Email';
//                 }
//                 msg += ' is already registered';

//                 return res.send({
//                     status: false,
//                     message: msg
//                 });
//             }

//             if (isUserMobile) {
//                 let msg = 'This';
//                 if (isUserMobile.mobile_number === mobile_number) {
//                     msg += ' Mobile No.';
//                 }
//                 msg += ' is already registered';

//                 return res.send({
//                     status: false,
//                     message: msg
//                 });
//             }


         



//             const userLoginCreate = await (new UserLogins(data)).save();
//             const school_data = {
//                 school_name: school_name,
//                 address: address,
//                 loginid: userLoginCreate._id,
//                 media: filename,
                
//             };

//             const schoolCreate = await (new School(school_data)).save();
//             let isUser1 = await UserLogins.findOne({
//                 $or: [{
//                     email: userLoginCreate.email
//                 }]
//             }).lean().exec();

//             isUser1 = {
//                 username: isUser1.email,
//                 _id: isUser1._id,
//                 time: new Date().getTime(),
//                 role: isUser1.roles
//             };

//             const accessToken = jwt.sign(isUser1, accessTokenSecret);
//             let msg_body = 'Hi, <br />';
//             msg_body += ' your OTP(One Time Password) is ' + userOtp;
//             await Helper.sendEmail(email, 'New Signup', msg_body);
//             return res.send({
//                 status: true,
//                 user: userLoginCreate,
//                 accessToken: accessToken,
//                 message: `${roleType} Sign Up Successfully`
//             });


//         } catch (error) {
//             if (error.errmsg && error.errmsg.indexOf('E11000') > -1) {
//                 return res.send({
//                     status: false,
//                     message: "User Already Exist, Please try with other username or email"
//                 })
//             }

//             return res.send({
//                 status: false,
//                 message: error.message
//             })
//         }
//     },
//     }
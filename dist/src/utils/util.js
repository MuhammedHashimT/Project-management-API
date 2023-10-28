"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
const cloudinary_1 = require("cloudinary");
const streamifier = require('streamifier');
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};
exports.comparePassword = comparePassword;
function uploadFile(file) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream((error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
}
exports.uploadFile = uploadFile;
//# sourceMappingURL=util.js.map
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryResponse } from 'src/member/cloudinary-response';
import { v2 as cloudinary } from 'cloudinary';
const streamifier = require('streamifier');
// hash password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// compare password
export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};


export function uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
  return new Promise<CloudinaryResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
}

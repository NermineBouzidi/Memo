const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

exports.uploadFile = async (file, folder) => {
  if (process.env.STORAGE_TYPE === 'local') {
    // Local file storage
    const uploadPath = path.join(__dirname, `../uploads/${folder}`);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Generate unique filename
    const fileName = `${uuidv4()}${path.extname(file.name)}`;
    const filePath = path.join(uploadPath, fileName);

    // Move file to uploads directory
    await file.mv(filePath);

    return `/uploads/${folder}/${fileName}`;
  } else {
    // AWS S3 storage
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${folder}/${uuidv4()}${path.extname(file.name)}`,
      Body: file.data,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    const data = await s3.upload(params).promise();
    return data.Location;
  }
};

exports.deleteFile = async (fileUrl) => {
  if (process.env.STORAGE_TYPE === 'local') {
    // Local file deletion
    const filePath = path.join(__dirname, `../${fileUrl}`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } else {
    // AWS S3 file deletion
    const key = fileUrl.split('/').slice(3).join('/');
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };

    await s3.deleteObject(params).promise();
  }
};
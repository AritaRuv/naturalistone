/* eslint-disable quotes */
import express, { Request, Response } from "express";

const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAXKTBXRCEJ2ANAZSR',
  secretAccessKey: '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',
  region: 'us-east-1' 
});

const s3 = new AWS.S3();

  export async function getAllProductsImages(req: Request, res: Response) {

    const { folder, fileName } = req.params;
    const prefix = `${folder}/${fileName}/`;
    const params = {
      Bucket: 'naturalistone-images',
      Prefix: prefix,
    };
  
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al obtener las imágenes de S3');
      }
  
      const images = data.Contents.map(obj => ({
        key: obj.Key,
        url: `https://naturalistone-images.s3.amazonaws.com/${obj.Key}`,
      }));
      res.status(200).json(images);
    });
  };
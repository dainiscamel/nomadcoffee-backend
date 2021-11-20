import { createWriteStream } from "fs";
import AWS from "aws-sdk";
import { urlencoded } from "express";

// 이미지 로컬 저장.
export const processFile = async (file, id) => {
  const { filename, createReadStream } = await file;
  const newFilename = `${id}-${Date.now()}-${filename}`;
  const readStream = createReadStream();

  const writeStream = createWriteStream(
    process.cwd() + "/uploads/" + newFilename
  );
  readStream.pipe(writeStream);
  return `http://localhost:4000/static/${newFilename}`;
};

// 이미지 아마존 웹서버 저장

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadS3 = async (file, userId) => {
  const { filename, createReadStream } = await file;
  console.log(filename);
  const randomFilename = `${userId}-${Date.now()}-${filename}`;
  const readStream = createReadStream();
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "nomadcoffee-upload",
      Key: randomFilename,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();

  return Location;
};

export const getImageUrls = async (photos, loggedInUser) => {
  let url = [];
  url = await uploadS3(photos, loggedInUser.id);

  return {
    // category 에서 name이 존재 하면 connect(=where 사용),  존재 하지 않으면 create.
    where: { url },
    create: { url },
  };
};

export const processCategory = (name) => {
  //중괄호의 시작이 캐럿(^)일 때에는 중괄호에 해당하지 않는 문자열만 매칭
  const names = name.match(/[^,]+/g) || [];
  return names.map((name) => {
    let slug = name.trim().replace(/\s+/g, "-").toLowerCase();
    return {
      // category 에서 name이 존재 하면 connect(=where 사용),  존재 하지 않으면 create.
      where: { name },
      create: { name, slug },
    };
  });
};

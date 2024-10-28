import { Readable } from "node:stream";

import { google } from "googleapis";

import apikey from "@/../isolashes-906ee8c54fb6.json";

const SCOPES = ["https://www.googleapis.com/auth/drive"];

export const auth = async () => {
  const client = new google.auth.JWT(
    apikey.client_email,
    undefined,
    apikey.private_key,
    SCOPES,
  );

  await client.authorize();

  return client;
};

export const uploadFile = async (client: any, file: any): Promise<string> => {
  const drive = google.drive({ version: "v3", auth: client });

  const fileMetadata = {
    name: file.name,
    parents: ["1iZ-gRMhnsdYwxXm_nIVg3sEfYiw2lN9z"],
  };

  const arrayBuffer = await file.arrayBuffer();
  const bufferFile = Buffer.from(arrayBuffer);

  const media = {
    mimeType: file.type,
    body: Readable.from(bufferFile),
  };

  return new Promise((resolve, reject) => {
    drive.files.create(
      { requestBody: fileMetadata, media: media, fields: "id" },
      (error: any, file: any) => {
        if (error) {
          reject(new Error("Error uploading file"));
        } else {
          resolve(
            `https://drive.google.com/uc?export=view&id=${file?.data.id}`,
          );
        }
      },
    );
  });
};

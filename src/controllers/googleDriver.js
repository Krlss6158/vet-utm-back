import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

/* 
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory, 
though this can be any filePath
*/

export async function uploadFile(name) {
    const filePath = path.join("src/public/upload/", name);
    try {
        const response = await drive.files.create({
            requestBody: {
                name: name, //This can be name of your choice
                mimeType: 'image/jpg',
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(filePath),
            },
        });

        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

// uploadFile();

export async function deleteFile(fileId) {
    try {
        const response = await drive.files.delete({
            fileId: fileId,
        });
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

// deleteFile();

export async function generatePublicUrl(fileId) {
    try {
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        /* 
        webViewLink: View the file in browser
        webContentLink: Direct download link 
        */
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink',
        });
        const { webViewLink } = result.data;
        const arr = webViewLink.split('/');

        return `http://drive.google.com/uc?export=view&id=${arr[arr.length - 2]}`;
    } catch (error) {
        console.log(error.message);
    }
}
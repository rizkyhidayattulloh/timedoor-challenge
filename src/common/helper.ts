import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import { v4 as uuidV4 } from 'uuid';
import { FileSystemStoredFile } from 'nestjs-form-data';

export async function hash(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    
    return bcrypt.hash(plainText, salt);
}

export async function compare(plainText: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashed);
}

export async function moveUploadedFile(file: any): Promise<string> {
    const name = uuidV4() + '.' + file.mimetype.split('/')[1];

    fs.readFile(file.path, function(err, data) {
        fs.writeFile(`src/public/upload/${name}`, data, function(err) {
            fs.unlink(file.path, (err) => {
                if (err) throw err;
            })
        })
    });

    return name;
}

export async function deleteFile(name: string): Promise<void> {
    fs.unlink(`src/public/upload/${name}`, (err) => {
        if (err) throw err;
    });
}
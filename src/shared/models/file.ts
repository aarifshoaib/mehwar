export interface IApplicationFile {
    uri: string,
    fileName: string,
    size: number,
    type: string,
    recordId: string
}

export class ApplicationFile implements IApplicationFile {
    uri: string;
    fileName: string;
    size: number;
    type: string;
    recordId: string;
    thumbnail: string;
    constructor(file?: IApplicationFile) {
        if (file) {
            this.uri = file.uri;
            this.fileName = file.fileName;
            this.size = file.size;
            this.type = file.type;
            this.recordId = file.recordId;
        } else {
            this.uri = '';
            this.fileName = '';
            this.size = 0;
            this.type = '';
            this.recordId = '';
        }
    }
}
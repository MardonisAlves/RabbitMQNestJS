import { Injectable, Logger, Param } from '@nestjs/common';
import * as AWS from 'aws-sdk';
@Injectable()
export class AwsService {
    private logger = new Logger(AwsService.name);

    async uploadarquivos3(file: any, id: string) {
      
        const s3 = new AWS.S3({
            region: 'us-east-1',
            accessKeyId: 'AKIAU2PL74B46USQVOYH',
            secretAccessKey: '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'
        })

        const fileExtenssion = file.originalname.split('.')[1];
        const urlkey = `${id}.${fileExtenssion}`;


     
        const params: any = {
            Body: file.buffer,
            Bucket: 'smartrank',
            Key: urlkey
        }
        
        const data = s3.upload(params).promise().then(
                data => {
                    return {
                        url: data.Location,
                        key:data.Key
                    };
                },
                err => {
                    this.logger.log(err);
                    return err;
                }
            )
    return data;
    }

}

import { Injectable, Logger, Param } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import getJogadores from 'src/jogadores/dtos/get-jogadores-dtos';


@Injectable()
export class AwsService {
    private logger = new Logger(AwsService.name);

    constructor(){}

    async uploadarquivos3(file: any, id: getJogadores) {
      
        const s3 = new AWS.S3({
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        })

        const fileExtenssion = file.originalname.split('.')[1];
        const urlkey = `${id}.${fileExtenssion}`;


     
        const params: any = {
            Body: file.buffer,
            Bucket: process.env.AWS_S3_BUCKET_NAME,
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

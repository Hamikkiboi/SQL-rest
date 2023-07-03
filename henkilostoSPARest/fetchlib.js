'use strict';

const http=require('http');

const fetch = (uri, fetchOptions) =>
    new Promise((resolve, reject)=>{

        const url=new URL(uri);
        const {hostname,port, pathname}=url;

        const optiot={
            hostname,
            port,
            path:pathname
        };

        Object.assign(optiot, fetchOptions);

        // console.log(optiot)
        http.request(optiot, res=>{
            const datapuskuri=[];
            res.on('data', pala=>datapuskuri.push(pala));

            res.on('end', ()=>resolve(
                {
                    json:()=>JSON.parse(Buffer.concat(datapuskuri).toString())
                }
            ))
        })
        .on('error',()=>reject('error'))
        .end(optiot.body);
    });

    module.exports=fetch;
module.exports.template = (heading, message, otp='') =>{


    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
           .head{
               display: flex;
               align-items: center;
               margin-bottom: 15px;
           }
           img{
               height: 80px;
               width: 80px;
               margin-right: 20px;
           }
            .head_a{
                font-weight: 300;
                color:#ffffff ;
                font-size: 20px;
                margin-bottom: 8px;
            }
            .head_b{
                font-weight: bold;
                color:#ffffff ;
                font-size: 20px;
                margin-top: 0px;
                /* margin: 0px; */
                /*padding: 0px; */
            }
            .head_c{
                color:#ffffff ;
                font-size: 18px;
                padding: 20px;
                margin: 0px;
                font-weight: 800;
                /* margin-top: 10px; */
            }
    
            a{
                color: #ffffff;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div style="background-color: #1f305c; padding: 20px 40px;">
            <div>
            <div class="head">
                <img src="cid:logo" alt="mahait log"> 
                <!-- <img src="../public/assets/img/logo_a.png" alt="img" />-->
                <div>
                <p class="head_a">Higher & Technical Education Department </p>
                  <p class="head_b"> Government of Maharashtra</p>
                </div>
            </div>
            <!-- <br /> -->
            <div style="background-color: #48d2a0;">
                <p class="head_c">${heading}</p>
            </div>
    
            <div style="background-color: #ffffff; text-align: left; padding: 20px;">
                
                <p>Dear Kannan,</p>
                <p> ${message} </P>
                <p style="font-weight: bold;"> ${otp}   </p>
                <br/>
                <br/>
                <hr />
                    <p>Thank you.</p>
    
                        <p>Maharashtra H&TE Department</p>
            </div>
    
            <div style="color: #ffffff; text-align: center; font-size: 12px;">
                <br/>
               <p style="margin-bottom: 5px;"> All Rights Reserved. Developed by MAHAIT  © 2019  |  Privacy Policy, Terms & Conditions  </p>
                <a href="http://digitalattestation.mahait.org">www.digitalattestation.mahait.org</a>
            </div>
        </div>
        </div>
    </body>
    </html>`

}
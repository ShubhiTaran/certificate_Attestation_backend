module.exports.template = (subject, name, message, otp = '', url = '') => {

    const anchor =  url ? ` <a href="${url}" class='anc_b' >Reset Password</a>` : ``;
    console.log('myurl', anchor);
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
            *{
                font-family: Helvetica;
            }
           .head{
               display: flex;
               align-items: center;
               justify-content: space-between !important;
               background-color:#dbfbf3;
               padding: 15px 15px;
               color:#004b8f;
               text-align: center;
               font-size: 23px;
               font-family: Roboto;
           }
           img{
               height: 70px;
               width: 70px;
               /* margin-right: 20px; */
           }
            .head_a{
                font-weight: 300;
                margin-top: 0px;
                margin-bottom: 8px;
            }
            .head_b{
                font-weight: bold;
                /* color:#ffffff ; */
                margin: 0px;
            }
            .head_c{
                color:#ffffff ;
                font-size: 18px;
                padding: 20px;
                margin: 0px;
                font-weight: 800;
                /* margin-top: 10px; */
            }
    
            .anc_a {
                    color: #ffffff;
                    text-decoration: none;
                }
                .anc_b{
                    display: inline-block;
                    color: #ffffff;
                    text-decoration: none;
                    padding:10px;
                    background-color: #1f305c;
                    text-align: center;
                    border-radius: 5px;
                }
                .green{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color:#ffffff;
                    font-size: 21px;
                    padding: 15px;
                    background-color: #48d2a0;
                }
                .test{
                    height: 60px;
                width: 60px;
                }
    
                .dear{
                    font-size: 18px;
                    margin-top:0px; 
                    padding-top: 10px;
                }
    
                .footer{
                    color: #ffffff;
                    font-size: 12px;
                    text-align: center;
                    padding: 25px 0px;
                }
        </style>
    </head>
    <body>
        <div style="background-color: #1f305c; ">
            <div>
            <div class="head">
                <img src="https://res.cloudinary.com/rapidqubechennai/image/upload/v1586935078/mahait/gomLogo1.png" alt="gomLogo" />
                <div>
                <p class="head_a">Higher & Technical Education Department </p>
                  <p class="head_b"> Government of Maharashtra</p>
                </div>
                <img src="https://res.cloudinary.com/rapidqubechennai/image/upload/v1586935085/mahait/mahait-logo.png" alt="mahaitLogo" />
            </div>
            <!-- body -->
            <div style="margin: 20px 20px;">
                <div class='green'>
                    <div>
                    <p style="margin-top:0px; margin-bottom:6px;">Reminder</p>
                    <p style="margin:0px;">${subject}</p>
                    </div>
                     <img class="test" src="https://res.cloudinary.com/rapidqubechennai/image/upload/v1586935143/mahait/img.svg" alt="test" />
                </div>
                <div  style="background-color: #ffffff; text-align: left; padding: 20px;">
                    <p class="dear" >Dear ${name},</p>
                <p> ${message} </P>
                ${ anchor }
                <br/>
                <p>Thank you.</p>
                <br/>
                <hr />
    
                <p style="font-size: 14px; color: #1f305c; font-weight: 500;">
                    Blockchain is the best possible solution for Certificate Attestation & Management for reducing physical efforts and manual processes along with a digital attested certificate, recorded in 
                    tamper-proof storage with the facility of verifying the authenticity of digital certificate, anywhere anytime. Using Blockchain, we at MahaIT have implemented a global open ecosystem for secure certificate attestation, storage, sharing and verification.
                </p>
    
                </div>
    
                <!-- footer -->
                <div class="footer">
                    <p style="margin-bottom: 5px;"> All Rights Reserved. Developed by MAHAIT  © 2019  |  Privacy Policy, Terms & Conditions  </p>
                    <a href="https://digitalattestation.mahait.org" style="color: #ffffff;">www.digitalattestation.mahait.org</a>
                </div>
    
            </div>
        </div>
        </div>
    </body>
    </html>`

}
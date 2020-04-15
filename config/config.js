const config = {
    password_salt: 'Rpqb$2018',
    forget_password_url:'https://digitalattestation.mahait.org',
    port:587,
    express_port:3000,
    // db:"mongodb://172.32.1.63:27017/daa",
    // db:"mongodb://localhost/daa",
    db:"mongodb://SreeAnanthaKannan:qwe$7500@ds163354.mlab.com:63354/testt",
    communicate:'sushilkumar.shinde@nic.in',
    mail_service:'smtp.office365.com',
    mail_id: 'sree.kannan@rapidqube.com',
    mail_password: 'Anantha@$2020',
    // mail_id:'Digital.Attestation@mahait.org',
    // mail_password:'Gak19158',
    addminData:{
        "user_type": "admin",
        "first_name": "Admin",
        "last_name": "last_name",
        "phone_number":"7869074062",
        "email_id": "admin@mahait.com",
        "password": "123456"
    }
}

module.exports = config

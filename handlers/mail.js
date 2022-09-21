const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const { convert } = require('html-to-text');
const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});

transport.sendMail({
    from: 'Wes Bos <wesbos@gmail.com>',
    to: 'lazar.veselinovic@htecgroup.com',
    subject: 'Just trying things out!',
    html: 'Hey I <strong>love</strong> you!',
    text: 'Het I **love you**'
});

const generateHTML = (filename, options = {}) => {
    console.log('HELLOOee', filename, __dirname, options);
    const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
    const inlined = juice(html);
    return inlined;
};

exports.send = async (options) => {
    const html = generateHTML(options.filename, options);
    const text = convert(html);
    const mailOptions = {
        from: 'Wes Bos <noreply@wesbos.com>',
        to: options.user.email,
        subject: options.subject,
        html,
        text,
    };
    const sendMail = promisify(transport.sendMail, transport);
    return sendMail(mailOptions);
};
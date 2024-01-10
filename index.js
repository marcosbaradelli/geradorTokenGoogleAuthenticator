const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Gerar token secret.
const secret = speakeasy.generateSecret({ length: 20 });
console.log(secret.base32); // Salve isso de forma segura e associada ao usuário

// Gerar QRCode para enviar ao front-end
QRCode.toDataURL(secret.otpauth_url, function (err, data_url) {
  console.log(data_url); // Envie esta URL para a interface do usuário
});

const token = '123456'; // Token fornecido pelo usuário

// Validar token enviado a usuario
const verified = speakeasy.totp.verify({
  secret: secret.base32,
  encoding: 'base32',
  token: token,
  window: 1, // Uma janela permite um token anterior e um posterior. (30s anterior e posterior são aceitos.)
});

if (verified) {
  console.log('Token válido!');
} else {
  console.log('Token inválido.');
}

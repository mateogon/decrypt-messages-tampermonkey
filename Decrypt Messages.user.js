// ==UserScript==
// @name         Decrypt Messages
// @match        https://cripto.tiiny.site/
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js#sha256-6rXZCnFzbyZ685/fMsqoxxZz/QZwMnmwHg+SsNe+C/w=
// ==/UserScript==

(function () {
  "use strict";

  // Encuentra la clave concatenando el primer carácter de cada oración
  let key = Array.from(
    document
      .querySelector(".Parrafo")
      .innerText.matchAll(/(?<=^|\.\s).|(?<=\?\s)./g)
  ).join("");

  console.log("La llave es: " + key);

  // Encuentra los mensajes cifrados
  let encryptedMessages = Array.from(
    document.querySelectorAll('div[class^="M"]'),
    (el) => el.id
  );

  console.log("Los mensajes cifrados son: " + encryptedMessages.length);

  // Descifra cada mensaje cifrado
  encryptedMessages.forEach((cipherText, i) => {
    // Convertir la clave y el texto cifrado a WordArray
    let keyWA = CryptoJS.enc.Utf8.parse(key);
    let cipherTextWA = CryptoJS.enc.Base64.parse(cipherText);

    // Descifra el texto cifrado
    let decrypted = CryptoJS.TripleDES.decrypt(
      { ciphertext: cipherTextWA },
      keyWA,
      { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
    );
    let decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    console.log(cipherText + " " + decryptedText);

    // Agrega el texto descifrado a la página web
    document.querySelector(".M" + (i + 1)).innerText = decryptedText;
  });
})();

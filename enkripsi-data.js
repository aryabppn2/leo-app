function encryptVigenere(text, key) {
    let encryptedText = '';
    let keyIndex = 0;

    // Ubah teks dan kunci ke huruf kapital untuk penanganan yang lebih mudah
    text = text.toUpperCase();
    key = key.toUpperCase();

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        // Hanya enkripsi huruf A-Z
        if (char >= 'A' && char <= 'Z') {
            const textCharCode = char.charCodeAt(0) - 'A'.charCodeAt(0); // Posisi huruf di alfabet (0-25)
            const keyChar = key[keyIndex % key.length]; // Ambil karakter kunci, ulangi jika perlu
            const keyCharCode = keyChar.charCodeAt(0) - 'A'.charCodeAt(0); // Posisi huruf kunci di alfabet (0-25)

            // Rumus enkripsi Vigenere
            const encryptedCharCode = (textCharCode + keyCharCode) % 26;
            encryptedText += String.fromCharCode(encryptedCharCode + 'A'.charCodeAt(0));

            keyIndex++; // Pindah ke karakter kunci berikutnya
        } else {
            // Biarkan karakter non-alfabet (spasi, angka, tanda baca) apa adanya
            encryptedText += char;
        }
    }

    return encryptedText;
}


module.exports={encryptVigenere}
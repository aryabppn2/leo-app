function ambilTigaKataPertama(teks) {
  const kataKata = teks.split(" ");
  const tigaKataPertama = kataKata.slice(0, 3);
  return tigaKataPertama.join(" ");
}




module.exports={ambilTigaKataPertama}
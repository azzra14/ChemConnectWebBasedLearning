// src/data/quizzes.js
// 5 soal pilihan ganda per sub-materi sesuai prompt latihan. :contentReference[oaicite:6]{index=6}

const Q = (q, options, answerIndex, explainCorrect, explainWrong) => ({
  q,
  options,
  answerIndex,
  explainCorrect,
  explainWrong,
});

export const QUIZZES = {
  // Kelas 10
  "c10-konsep-kestabilan": [
    Q(
      "Tujuan utama atom membentuk ikatan kimia adalah…",
      ["Menambah nomor atom", "Mencapai konfigurasi elektron stabil", "Mengurangi massa atom", "Membuat inti atom berubah"],
      1,
      "Atom berikatan untuk mencapai konfigurasi stabil (mirip gas mulia).",
      "Yang benar adalah mencapai kestabilan konfigurasi elektron."
    ),
    Q(
      "Aturan oktet menyatakan bahwa atom cenderung stabil jika memiliki…",
      ["2 elektron valensi", "4 elektron valensi", "8 elektron valensi", "18 elektron valensi"],
      2,
      "Oktet = 8 elektron valensi (kulit terluar penuh).",
      "Oktet bukan 2/4/18, tetapi 8 elektron valensi."
    ),
    Q(
      "Atom periode 1 (misalnya H) cenderung stabil dengan aturan…",
      ["Oktet", "Duplet", "Resonansi", "Isotop"],
      1,
      "Kulit K maksimum 2 elektron → duplet.",
      "Periode 1 mengejar 2 elektron, bukan 8."
    ),
    Q(
      "Pembentukan ikatan kimia berkaitan erat dengan elektron pada…",
      ["Inti atom", "Kulit terluar (valensi)", "Neutron", "Isotop"],
      1,
      "Elektron valensi menentukan kemampuan berikatan.",
      "Ikatan dipengaruhi elektron valensi, bukan neutron/intinya."
    ),
    Q(
      "Pernyataan paling tepat tentang kestabilan gas mulia adalah…",
      ["Selalu reaktif", "Kulit terluar sudah penuh", "Tidak punya elektron", "Mudah membentuk ion negatif"],
      1,
      "Gas mulia stabil karena kulit valensinya penuh.",
      "Gas mulia tidak reaktif karena sudah stabil (kulit penuh)."
    ),
  ],

  "c10-elektronegativitas": [
    Q(
      "Elektronegativitas adalah kemampuan atom untuk…",
      ["Menarik pasangan elektron ikatan", "Melepas proton", "Menambah neutron", "Membentuk isotop"],
      0,
      "Definisi EN: menarik elektron dalam ikatan.",
      "EN bukan tentang proton/neutron/isotop."
    ),
    Q(
      "Jika perbedaan EN (ΔEN) sangat kecil, ikatan cenderung…",
      ["Ionik", "Kovalen nonpolar", "Kovalen koordinasi", "Logam"],
      1,
      "ΔEN kecil → pembagian elektron relatif merata → nonpolar.",
      "Ikatan ionik butuh ΔEN besar."
    ),
    Q(
      "Ikatan kovalen polar umumnya terjadi ketika…",
      ["ΔEN nol", "ΔEN sedang", "ΔEN sangat besar", "Tidak ada elektron valensi"],
      1,
      "ΔEN sedang → ada pergeseran elektron → polar.",
      "ΔEN sangat besar biasanya menuju ionik."
    ),
    Q(
      "Tren periodik EN umumnya…",
      ["Naik kiri→kanan, turun atas→bawah", "Turun kiri→kanan, naik atas→bawah", "Selalu sama", "Tak punya pola"],
      0,
      "EN naik dari kiri ke kanan karena muatan inti efektif meningkat.",
      "Pola kebalikan itu tidak tepat."
    ),
    Q(
      "Kepolaran molekul ditentukan oleh…",
      ["Hanya jumlah atom", "Hanya massa molekul", "ΔEN dan bentuk molekul", "Hanya warna zat"],
      2,
      "Polaritas dipengaruhi polaritas ikatan dan geometri molekul.",
      "Tidak cukup hanya massa/jumlah atom."
    ),
  ],

  "c10-ikatan-ion": [
    Q(
      "Ikatan ion terbentuk karena…",
      ["Pemakaian bersama elektron", "Tarik-menarik kation dan anion", "Pembentukan pasangan bebas", "Resonansi elektron"],
      1,
      "Ionik = gaya elektrostatik antara muatan berlawanan.",
      "Pemakaian bersama elektron itu kovalen."
    ),
    Q(
      "Kation adalah ion yang…",
      ["Bermuatan negatif", "Bermuatan positif", "Netral", "Tidak punya elektron"],
      1,
      "Kation terbentuk saat atom melepas elektron → bermuatan +.",
      "Anion-lah yang bermuatan negatif."
    ),
    Q(
      "Dalam pembentukan NaCl, natrium cenderung…",
      ["Menerima elektron", "Melepas elektron", "Membagi tiga elektron", "Tidak berubah"],
      1,
      "Na (logam) melepas 1 e⁻ menjadi Na⁺.",
      "Na tidak menerima elektron dalam NaCl."
    ),
    Q(
      "Senyawa ion umumnya menghantarkan listrik ketika…",
      ["Padat", "Larutan atau lelehan", "Gas", "Selalu tidak menghantar"],
      1,
      "Ion bebas bergerak pada lelehan/larutan → konduktor.",
      "Dalam padatan, ion terikat dalam kisi."
    ),
    Q(
      "Titik leleh senyawa ion cenderung tinggi karena…",
      ["Ikatan lemah", "Gaya tarik elektrostatik kuat", "Tidak ada muatan", "Selalu nonpolar"],
      1,
      "Tarikan antar ion kuat → butuh energi besar untuk memutus kisi.",
      "Bukan ikatan lemah."
    ),
  ],

  "c10-ikatan-kovalen": [
    Q(
      "Ikatan kovalen terjadi karena…",
      ["Transfer elektron total", "Pemakaian bersama pasangan elektron", "Tarikan kation-anion", "Tidak melibatkan elektron"],
      1,
      "Kovalen = berbagi pasangan elektron.",
      "Transfer total adalah ionik."
    ),
    Q(
      "Ikatan rangkap dua berarti berbagi…",
      ["1 pasangan e⁻", "2 pasangan e⁻", "3 pasangan e⁻", "4 pasangan e⁻"],
      1,
      "Rangkap dua = 2 pasangan elektron.",
      "Rangkap tiga = 3 pasangan."
    ),
    Q(
      "Ikatan rangkap umumnya…",
      ["Lebih panjang dan lebih lemah", "Lebih pendek dan lebih kuat", "Selalu ionik", "Tidak memengaruhi sifat"],
      1,
      "Rangkap menambah densitas elektron ikatan → lebih kuat & pendek.",
      "Bukan lebih panjang/lemah."
    ),
    Q(
      "H₂O bersifat polar karena…",
      ["Tidak punya elektron", "Bentuk bengkok dan ikatan O-H polar", "Simetris sempurna", "Tidak ada ΔEN"],
      1,
      "Ikatan O-H polar + bentuk bengkok → dipol tidak saling meniadakan.",
      "Jika simetris, bisa nonpolar."
    ),
    Q(
      "CO₂ molekulnya nonpolar karena…",
      ["Ikatan C=O nonpolar", "Bentuk linear simetris meniadakan dipol", "Tidak ada elektron valensi", "Selalu ionik"],
      1,
      "Ikatan C=O polar tapi dipol berlawanan arah dan sama besar → resultan nol.",
      "Bukan karena ikatan nonpolar."
    ),
  ],

  "c10-kovalen-koordinasi": [
    Q(
      "Ikatan koordinasi adalah ikatan kovalen di mana…",
      ["Elektron berasal dari dua atom", "Sepasang elektron berasal dari satu atom", "Tidak ada elektron", "Terjadi antar ion"],
      1,
      "Donor menyumbang sepasang elektron bebas.",
      "Bukan dari dua atom (itu kovalen biasa)."
    ),
    Q(
      "Pada NH₄⁺, atom donor pasangan elektron umumnya adalah…",
      ["N pada NH₃", "H", "Cl", "O"],
      0,
      "N memiliki pasangan bebas yang didonasikan ke H⁺.",
      "H⁺ adalah akseptor, bukan donor."
    ),
    Q(
      "Spesies akseptor pada pembentukan ikatan koordinasi biasanya…",
      ["Kaya pasangan bebas", "Kekurangan elektron/bermuatan positif", "Selalu netral", "Selalu logam"],
      1,
      "Akseptor menerima pasangan elektron; sering berupa kation.",
      "Donor-lah yang kaya pasangan bebas."
    ),
    Q(
      "Setelah terbentuk, ikatan koordinasi…",
      ["Bukan kovalen", "Mirip kovalen biasa", "Selalu jadi ionik", "Tidak stabil selamanya"],
      1,
      "Secara sifat, koordinasi dianggap kovalen.",
      "Tidak berubah menjadi ionik otomatis."
    ),
    Q(
      "Contoh lain ikatan koordinasi selain NH₄⁺ adalah…",
      ["H₃O⁺", "NaCl", "MgO", "KBr"],
      0,
      "H₃O⁺ terbentuk saat O mendonorkan pasangan bebas ke H⁺.",
      "NaCl/MgO/KBr dominan ionik."
    ),
  ],

  // Kelas 11
  "c11-struktur-lewis": [
    Q(
      "Simbol Lewis digunakan untuk menunjukkan…",
      ["Jumlah proton", "Elektron valensi", "Jumlah neutron", "Nomor massa"],
      1,
      "Titik Lewis = elektron valensi.",
      "Bukan proton/neutron."
    ),
    Q(
      "Langkah awal membuat struktur Lewis adalah…",
      ["Menentukan warna molekul", "Menghitung total elektron valensi", "Menghitung massa atom", "Menentukan titik leleh"],
      1,
      "Total elektron valensi adalah kunci awal.",
      "Massa/titik leleh tidak relevan untuk gambar Lewis."
    ),
    Q(
      "Pasangan elektron bebas adalah…",
      ["Elektron yang selalu berpindah", "Elektron yang tidak digunakan untuk ikatan", "Elektron inti", "Proton bebas"],
      1,
      "Pasangan bebas tidak membentuk ikatan.",
      "Bukan elektron inti."
    ),
    Q(
      "Resonansi berarti…",
      ["Satu struktur saja", "Lebih dari satu struktur yang mewakili molekul", "Ikatan ionik", "Tanpa elektron"],
      1,
      "Resonansi: beberapa struktur setara menggambarkan delokalisasi elektron.",
      "Bukan satu struktur."
    ),
    Q(
      "Atom pusat biasanya dipilih…",
      ["Paling elektronegatif (selalu)", "Kurang elektronegatif (kecuali H)", "Selalu H", "Selalu gas mulia"],
      1,
      "Umumnya atom pusat kurang elektronegatif; H tidak jadi atom pusat.",
      "Paling elektronegatif biasanya di luar."
    ),
  ],

  "c11-vsepr": [
    Q(
      "Teori VSEPR menjelaskan bahwa bentuk molekul ditentukan oleh…",
      ["Massa atom", "Tolakan pasangan elektron", "Warna zat", "Jumlah neutron"],
      1,
      "VSEPR = tolakan pasangan elektron.",
      "Bukan massa/neutron."
    ),
    Q(
      "Geometri dasar untuk 2 domain elektron adalah…",
      ["Tetrahedral", "Linear", "Bengkok", "Trigonal piramida"],
      1,
      "2 domain → linear.",
      "Tetrahedral itu 4 domain."
    ),
    Q(
      "Geometri dasar untuk 3 domain elektron adalah…",
      ["Linear", "Trigonal planar", "Tetrahedral", "Oktahedral"],
      1,
      "3 domain → trigonal planar.",
      "Tetrahedral itu 4 domain."
    ),
    Q(
      "Pasangan elektron bebas pada atom pusat umumnya menyebabkan sudut ikatan…",
      ["Membesar", "Mengecil", "Selalu 180°", "Tidak berubah"],
      1,
      "Pasangan bebas menekan sudut karena tolakan lebih kuat.",
      "Bukan membesar."
    ),
    Q(
      "Bentuk molekul memengaruhi…",
      ["Kepolaran molekul", "Jumlah proton", "Nomor massa", "Isotop"],
      0,
      "Bentuk menentukan resultan dipol → polar/nonpolar.",
      "Bukan nomor massa."
    ),
  ],

  "c11-kepolaran": [
    Q(
      "Molekul polar memiliki…",
      ["Resultan momen dipol nol", "Resultan momen dipol tidak nol", "Selalu simetris", "Selalu nonpolar"],
      1,
      "Polar berarti ada resultan dipol.",
      "Simetris sering meniadakan dipol."
    ),
    Q(
      "Pernyataan benar: ikatan polar…",
      ["Selalu membuat molekul polar", "Belum tentu membuat molekul polar", "Tidak pernah polar", "Selalu ionik"],
      1,
      "Molekul bisa nonpolar jika simetris.",
      "Tidak otomatis polar."
    ),
    Q(
      "CO₂ memiliki ikatan polar tetapi molekulnya nonpolar karena…",
      ["Tidak ada elektron", "Bentuk linear simetris", "Ikatan nonpolar", "Tidak ada atom pusat"],
      1,
      "Dipol saling meniadakan dalam struktur linear simetris.",
      "Bukan karena ikatan nonpolar."
    ),
    Q(
      "Momen dipol menggambarkan…",
      ["Pemisahan muatan", "Jumlah neutron", "Jumlah isotop", "Warna molekul"],
      0,
      "Momen dipol = ukuran pemisahan muatan.",
      "Bukan neutron."
    ),
    Q(
      "Molekul dengan pasangan bebas pada atom pusat cenderung…",
      ["Lebih simetris", "Kurang simetris dan sering polar", "Selalu linear", "Selalu nonpolar"],
      1,
      "Pasangan bebas sering membuat bentuk bengkok/piramida → polar.",
      "Tidak selalu linear."
    ),
  ],

  "c11-ikatan-logam": [
    Q(
      "Model lautan elektron menjelaskan bahwa…",
      ["Elektron valensi terdelokalisasi", "Elektron selalu terikat kuat", "Tidak ada elektron bebas", "Logam bersifat isolator"],
      0,
      "Elektron valensi bergerak bebas → konduktivitas.",
      "Logam bukan isolator."
    ),
    Q(
      "Konduktivitas listrik logam tinggi karena…",
      ["Ion tidak bergerak", "Elektron bebas bergerak", "Tidak ada muatan", "Logam selalu cair"],
      1,
      "Elektron terdelokalisasi menjadi pembawa muatan.",
      "Ion dalam kisi tidak bergerak bebas."
    ),
    Q(
      "Logam mudah ditempa karena…",
      ["Ikatan terarah kaku", "Ikatan tidak terarah sehingga lapisan bisa bergeser", "Tidak ada ikatan", "Selalu berpori"],
      1,
      "Ikatan logam tidak terarah → lapisan ion bisa bergeser tanpa patah.",
      "Bukan ikatan terarah."
    ),
    Q(
      "Kilap logam terjadi karena…",
      ["Tidak memantulkan cahaya", "Elektron memantulkan cahaya", "Tidak punya elektron", "Selalu gelap"],
      1,
      "Elektron bebas memantulkan cahaya → kilap.",
      "Bukan gelap."
    ),
    Q(
      "Ikatan logam umumnya terjadi antar…",
      ["Nonlogam", "Logam", "Gas mulia", "Air"],
      1,
      "Ikatan logam adalah khas unsur logam.",
      "Bukan nonlogam."
    ),
  ],

  // Kelas 12
  "c12-gaya-antarmolekul": [
    Q(
      "Gaya London terdapat pada…",
      ["Hanya molekul polar", "Semua molekul", "Hanya ion", "Hanya logam"],
      1,
      "Dipol sesaat bisa terjadi pada semua molekul.",
      "Bukan hanya polar."
    ),
    Q(
      "Gaya dipol-dipol dominan pada…",
      ["Molekul nonpolar", "Molekul polar", "Gas mulia", "Padatan ionik saja"],
      1,
      "Dipol permanen ada pada molekul polar.",
      "Nonpolar dominan London."
    ),
    Q(
      "Ikatan hidrogen kuat jika H terikat pada…",
      ["Na/K", "F/O/N", "Cl/Br/I", "Semua unsur"],
      1,
      "H-bond kuat khas F, O, N.",
      "Tidak untuk semua unsur."
    ),
    Q(
      "Semakin kuat gaya antarmolekul, biasanya titik didih…",
      ["Menurun", "Meningkat", "Tidak berubah", "Selalu nol"],
      1,
      "Gaya lebih kuat butuh energi lebih besar untuk menguap.",
      "Bukan menurun."
    ),
    Q(
      "Pernyataan tepat: molekul nonpolar umumnya punya…",
      ["Hanya dipol-dipol", "London sebagai gaya utama", "Ikatan hidrogen", "Tidak ada gaya sama sekali"],
      1,
      "Nonpolar tidak punya dipol permanen → London dominan.",
      "Tetap ada gaya (London)."
    ),
  ],

  "c12-hubungan-ikatan-sifat": [
    Q(
      "Senyawa ion menghantarkan listrik saat…",
      ["Padat", "Leleh/larutan", "Selalu tidak", "Gas"],
      1,
      "Ion bebas bergerak saat leleh/larutan.",
      "Padat: ion terkunci."
    ),
    Q(
      "Prinsip kelarutan “like dissolves like” berarti…",
      ["Polar larut dalam nonpolar", "Polar larut dalam polar", "Semua larut dalam semua", "Tidak ada yang larut"],
      1,
      "Interaksi sejenis lebih cocok: polar-polar, nonpolar-nonpolar.",
      "Polar tidak mudah larut di nonpolar."
    ),
    Q(
      "Kovalen molekular umumnya bertitik didih…",
      ["Sangat tinggi selalu", "Relatif rendah (kecuali gaya kuat)", "Tidak bisa menguap", "Selalu sama"],
      1,
      "Banyak kovalen molekular punya gaya antarmolekul lemah → titik didih rendah.",
      "Tidak selalu tinggi."
    ),
    Q(
      "Logam menghantarkan listrik sebagai padatan karena…",
      ["Ion bergerak bebas", "Elektron bebas bergerak", "Tidak ada muatan", "Semua logam larut"],
      1,
      "Elektron terdelokalisasi bergerak pada padatan.",
      "Ion tidak bergerak bebas."
    ),
    Q(
      "Titik leleh tinggi pada ionik disebabkan oleh…",
      ["Gaya lemah", "Tarik elektrostatik kuat", "Tidak ada ikatan", "Warna zat"],
      1,
      "Kisi ionik kuat memerlukan energi besar untuk diputus.",
      "Bukan karena warna."
    ),
  ],

  "c12-senyawa-kompleks": [
    Q(
      "Senyawa kompleks terdiri dari…",
      ["Atom pusat dan ligan", "Hanya anion", "Hanya kation", "Hanya gas mulia"],
      0,
      "Kompleks: atom pusat (logam) + ligan donor.",
      "Bukan hanya anion/kation."
    ),
    Q(
      "Ligan berperan sebagai…",
      ["Penerima proton", "Donor pasangan elektron", "Neutron bebas", "Penghasil massa"],
      1,
      "Ligan mendonorkan pasangan elektron (ikatan koordinasi).",
      "Bukan neutron."
    ),
    Q(
      "Ikatan dominan dalam kompleks adalah…",
      ["Ionik murni", "Koordinasi (kovalen koordinasi)", "Logam murni", "Tidak ada ikatan"],
      1,
      "Kompleks terbentuk lewat ikatan koordinasi.",
      "Bukan tanpa ikatan."
    ),
    Q(
      "Atom pusat biasanya berupa…",
      ["Logam transisi (umum)", "Gas mulia selalu", "H saja", "Nonlogam selalu"],
      0,
      "Banyak kompleks memakai logam transisi sebagai pusat.",
      "Gas mulia jarang."
    ),
    Q(
      "Aplikasi senyawa kompleks bisa ditemukan pada…",
      ["Biologi & katalis", "Hanya batuan", "Hanya air murni", "Tidak ada aplikasi"],
      0,
      "Contoh: hemoglobin, katalis industri.",
      "Ada banyak aplikasi."
    ),
  ],
};

export function getQuizByMateriId(materiId) {
  return QUIZZES[materiId] || null;
}

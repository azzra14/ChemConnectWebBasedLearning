// src/data/materi.js
// Materi sesuai daftar Kelas 10-12 dalam prompt. :contentReference[oaicite:4]{index=4} :contentReference[oaicite:5]{index=5}

export const CLASSES = [
  { id: 10, title: "Kelas 10", subtitle: "Dasar Ikatan Kimia" },
  { id: 11, title: "Kelas 11", subtitle: "Penguatan & Penerapan Ikatan" },
  { id: 12, title: "Kelas 12", subtitle: "Ikatan Lanjut & Gaya Antarmolekul" },
];

// Helpers
const tip = (term, def) => ({ term, def });
const box = (title, content) => ({ title, content });

export const MATERI = [
  // KELAS 10
  {
    classId: 10,
    items: [
      {
        id: "c10-konsep-kestabilan",
        title: "Konsep Kestabilan Atom",
        level: "Kelas 10",
        tags: ["duplet", "oktet", "gas mulia"],
        tips: [
          tip("Oktet", "Kecenderungan atom memiliki 8 elektron valensi seperti gas mulia."),
          tip("Duplet", "Kecenderungan atom stabil dengan 2 elektron valensi (mis. He)."),
          tip("Valensi", "Elektron pada kulit terluar yang berperan dalam pembentukan ikatan."),
        ],
        highlight: box(
          "Inti Konsep",
          "Atom cenderung berikatan agar konfigurasi elektronnya menyerupai gas mulia (stabil)."
        ),
        sections: [
          {
            h: "Mengapa atom ingin stabil?",
            p: [
              "Banyak atom tidak stabil karena kulit valensinya belum penuh.",
              "Konfigurasi elektron gas mulia dianggap stabil karena kulit terluar penuh.",
              "Agar stabil, atom bisa melepas, menerima, atau berbagi elektron.",
            ],
          },
          {
            h: "Aturan duplet & oktet",
            p: [
              "Atom periode 1 mengejar duplet (2 elektron) karena hanya punya kulit K.",
              "Atom lainnya umumnya mengejar oktet (8 elektron) pada kulit valensi.",
              "Aturan ini membantu memprediksi pembentukan ikatan (ionik/kovalen).",
            ],
          },
          {
            h: "Interaksi mini (diagram sederhana)",
            p: [
              "Klik tombol di bawah untuk melihat simulasi sederhana kecenderungan elektron valensi.",
            ],
            interactive: "VALENCE_SIM",
          },
        ],
        keyPoints: [
          "Stabil = konfigurasi mirip gas mulia",
          "Duplet (periode 1) dan oktet (periode lain)",
          "Ikatan terbentuk karena perpindahan/berbagi elektron",
        ],
      },
      {
        id: "c10-elektronegativitas",
        title: "Elektronegativitas",
        level: "Kelas 10",
        tags: ["EN", "polar", "perbedaan EN"],
        tips: [
          tip("Elektronegativitas", "Kemampuan atom menarik pasangan elektron dalam ikatan."),
          tip("Polar", "Ketidakseimbangan distribusi elektron sehingga muncul kutub (+/-)."),
        ],
        highlight: box(
          "Inti Konsep",
          "Semakin besar perbedaan elektronegativitas antar atom, semakin besar kecenderungan ikatan menjadi ionik atau kovalen polar."
        ),
        sections: [
          {
            h: "Pengertian",
            p: [
              "Elektronegativitas (EN) menggambarkan seberapa kuat atom menarik elektron ikatan.",
              "EN dipengaruhi muatan inti efektif dan jari-jari atom.",
              "Tren periodik: naik dari kiri ke kanan, turun dari atas ke bawah.",
            ],
          },
          {
            h: "Hubungan EN dengan jenis ikatan",
            p: [
              "ΔEN kecil → kovalen nonpolar (pembagian relatif merata).",
              "ΔEN sedang → kovalen polar (pembagian tidak merata).",
              "ΔEN besar → cenderung ionik (transfer elektron lebih dominan).",
            ],
            interactive: "EN_SLIDER",
          },
        ],
        keyPoints: ["EN adalah tarik-menarik elektron ikatan", "ΔEN mempengaruhi polaritas & jenis ikatan"],
      },
      {
        id: "c10-ikatan-ion",
        title: "Ikatan Ion",
        level: "Kelas 10",
        tags: ["kation", "anion", "NaCl"],
        tips: [
          tip("Kation", "Ion bermuatan positif karena melepas elektron."),
          tip("Anion", "Ion bermuatan negatif karena menerima elektron."),
        ],
        highlight: box(
          "Inti Konsep",
          "Ikatan ion terjadi karena gaya tarik elektrostatik antara kation dan anion setelah transfer elektron."
        ),
        sections: [
          {
            h: "Pembentukan ion",
            p: [
              "Logam cenderung melepas elektron membentuk kation.",
              "Nonlogam cenderung menerima elektron membentuk anion.",
              "Gaya tarik antara muatan berlawanan membentuk kisi kristal ionik.",
            ],
          },
          {
            h: "Contoh & sifat",
            p: [
              "Contoh: NaCl, MgO.",
              "Sifat: titik leleh tinggi, rapuh, larut dalam air (umum), menghantarkan listrik saat leleh/larutan.",
            ],
            interactive: "ION_BUILD",
          },
        ],
        keyPoints: ["Transfer elektron → kation/anion", "Tarik elektrostatik", "Sifat khas senyawa ionik"],
      },
      {
        id: "c10-ikatan-kovalen",
        title: "Ikatan Kovalen",
        level: "Kelas 10",
        tags: ["berbagi elektron", "H2O", "CO2"],
        tips: [
          tip("Kovalen", "Ikatan karena pemakaian bersama pasangan elektron."),
          tip("Rangkap", "Berbagi lebih dari satu pasangan elektron (dua/tiga)."),
        ],
        highlight: box(
          "Inti Konsep",
          "Ikatan kovalen terbentuk saat atom-atom nonlogam berbagi elektron untuk mencapai kestabilan."
        ),
        sections: [
          {
            h: "Tunggal, rangkap dua, rangkap tiga",
            p: [
              "Ikatan tunggal: 1 pasangan elektron dibagi.",
              "Ikatan rangkap dua: 2 pasangan; rangkap tiga: 3 pasangan.",
              "Ikatan rangkap umumnya lebih kuat dan lebih pendek.",
            ],
            interactive: "BOND_ORDER",
          },
          {
            h: "Polar vs nonpolar",
            p: [
              "Kovalen nonpolar: ΔEN kecil, pembagian relatif merata.",
              "Kovalen polar: ΔEN sedang, ada pergeseran elektron (kutub).",
              "Contoh: H₂O (polar), CO₂ (molekul nonpolar karena simetri meski ikatannya polar).",
            ],
          },
        ],
        keyPoints: ["Berbagi elektron", "Rangkap mempengaruhi kekuatan & panjang", "Polaritas bergantung ΔEN & bentuk molekul"],
      },
      {
        id: "c10-kovalen-koordinasi",
        title: "Ikatan Kovalen Koordinasi",
        level: "Kelas 10",
        tags: ["donor", "akseptor", "NH4+"],
        tips: [
          tip("Donor pasangan elektron", "Atom yang menyumbangkan sepasang elektron bebas."),
          tip("Akseptor", "Spesies yang menerima pasangan elektron untuk membentuk ikatan."),
        ],
        highlight: box(
          "Inti Konsep",
          "Ikatan koordinasi adalah kovalen, tetapi sepasang elektron berasal dari satu atom (donor)."
        ),
        sections: [
          {
            h: "Konsep dasar",
            p: [
              "Terjadi ketika satu atom memiliki pasangan elektron bebas dan atom lain kekurangan elektron.",
              "Setelah terbentuk, sifat ikatannya mirip kovalen biasa.",
              "Contoh umum: NH₄⁺ dan H₃O⁺.",
            ],
            interactive: "COORD_BOND",
          },
        ],
        keyPoints: ["Elektron berasal dari satu atom", "Contoh NH₄⁺, H₃O⁺", "Tetap termasuk kovalen"],
      },
    ],
  },

  // KELAS 11
  {
    classId: 11,
    items: [
      {
        id: "c11-struktur-lewis",
        title: "Struktur Lewis",
        level: "Kelas 11",
        tags: ["simbol lewis", "pasangan bebas"],
        tips: [
          tip("Simbol Lewis", "Notasi titik untuk elektron valensi di sekitar simbol unsur."),
          tip("Pasangan bebas", "Pasangan elektron yang tidak dipakai berikatan."),
        ],
        highlight: box(
          "Inti Konsep",
          "Struktur Lewis membantu memvisualisasikan elektron valensi, ikatan, dan pasangan bebas."
        ),
        sections: [
          {
            h: "Langkah cepat menggambar",
            p: [
              "Hitung total elektron valensi semua atom (perhatikan muatan ion).",
              "Tentukan atom pusat (umumnya yang kurang elektronegatif, bukan H).",
              "Buat ikatan tunggal dulu, lengkapi oktet atom sekitar, lalu atom pusat.",
            ],
            interactive: "LEWIS_STEPS",
          },
          {
            h: "Catatan penting",
            p: [
              "Beberapa molekul memiliki resonansi (lebih dari satu struktur representatif).",
              "Ada pengecualian oktet (mis. B, Be) dan oktet diperluas (periode 3 ke atas).",
            ],
          },
        ],
        keyPoints: ["Hitung e⁻ valensi", "Ikatan tunggal dulu", "Perhatikan resonansi & pengecualian oktet"],
      },
      {
        id: "c11-vsepr",
        title: "Bentuk Molekul (Teori VSEPR)",
        level: "Kelas 11",
        tags: ["VSEPR", "geometri", "tolakan elektron"],
        tips: [
          tip("VSEPR", "Teori tolakan pasangan elektron di sekitar atom pusat menentukan bentuk molekul."),
          tip("Geometri elektron", "Susunan domain elektron (ikatan + pasangan bebas)."),
        ],
        highlight: box(
          "Inti Konsep",
          "Jumlah domain elektron menentukan geometri dasar; pasangan bebas mengubah bentuk nyata."
        ),
        sections: [
          {
            h: "Domain elektron → bentuk",
            p: [
              "2 domain: linear; 3 domain: trigonal planar; 4 domain: tetrahedral.",
              "5 domain: trigonal bipiramida; 6 domain: oktahedral (pengayaan).",
              "Pasangan bebas menekan sudut ikatan sehingga bentuk bisa bengkok/piramida.",
            ],
            interactive: "VSEPR_VIEW",
          },
        ],
        keyPoints: ["Hitung domain", "Pasangan bebas memengaruhi sudut", "Bentuk memengaruhi polaritas"],
      },
      {
        id: "c11-kepolaran",
        title: "Kepolaran Molekul",
        level: "Kelas 11",
        tags: ["momen dipol", "simetri", "polar/nonpolar"],
        tips: [
          tip("Momen dipol", "Ukuran pemisahan muatan akibat distribusi elektron tidak merata."),
          tip("Simetri", "Jika vektor dipol saling meniadakan → molekul nonpolar."),
        ],
        highlight: box(
          "Inti Konsep",
          "Kepolaran molekul dipengaruhi polaritas ikatan dan bentuk/ simetri molekul."
        ),
        sections: [
          {
            h: "Cara cepat menilai",
            p: [
              "Cek apakah ada ikatan polar (ΔEN).",
              "Cek bentuk: jika simetris, vektor dipol bisa saling meniadakan → nonpolar.",
              "Jika tidak simetris (ada pasangan bebas/bentuk bengkok), cenderung polar.",
            ],
            interactive: "POLAR_CHECK",
          },
        ],
        keyPoints: ["Ikatan polar ≠ molekul pasti polar", "Simetri penting", "Bentuk menentukan resultan dipol"],
      },
      {
        id: "c11-ikatan-logam",
        title: "Ikatan Logam",
        level: "Kelas 11",
        tags: ["lautan elektron", "konduktivitas"],
        tips: [
          tip("Lautan elektron", "Elektron valensi terdelokalisasi bergerak bebas di kisi logam."),
          tip("Terbentuknya logam", "Kation logam dalam kisi dikelilingi elektron bebas."),
        ],
        highlight: box(
          "Inti Konsep",
          "Elektron bebas menjelaskan sifat logam: menghantar listrik, mudah ditempa, dan berkilau."
        ),
        sections: [
          {
            h: "Sifat logam dari model lautan elektron",
            p: [
              "Konduktivitas tinggi karena elektron mudah bergerak.",
              "Mudah ditempa karena ikatan tidak terarah; lapisan ion bisa bergeser tanpa memutus total ikatan.",
              "Kilap logam karena elektron memantulkan cahaya.",
            ],
            interactive: "METAL_SEA",
          },
        ],
        keyPoints: ["Elektron terdelokalisasi", "Konduktor", "Malleable/ductile"],
      },
    ],
  },

  // KELAS 12
  {
    classId: 12,
    items: [
      {
        id: "c12-gaya-antarmolekul",
        title: "Gaya Antarmolekul",
        level: "Kelas 12",
        tags: ["London", "dipol-dipol", "H-bond"],
        tips: [
          tip("Gaya London", "Gaya tarik sementara akibat dipol sesaat (ada pada semua molekul)."),
          tip("Dipol-dipol", "Tarik-menarik antar molekul polar."),
          tip("Ikatan hidrogen", "Interaksi kuat ketika H terikat pada F/O/N dan berinteraksi dengan pasangan bebas."),
        ],
        highlight: box(
          "Inti Konsep",
          "Semakin kuat gaya antarmolekul, biasanya titik didih/leleh makin tinggi."
        ),
        sections: [
          {
            h: "Jenis-jenis gaya",
            p: [
              "London: dominan pada molekul nonpolar; makin besar massa/luas permukaan → makin kuat.",
              "Dipol-dipol: terjadi pada molekul polar (kutub permanen).",
              "Ikatan hidrogen: paling kuat di antara tiga ini, memengaruhi sifat air secara drastis.",
            ],
            interactive: "IMF_COMPARE",
          },
        ],
        keyPoints: ["London ada di semua", "Dipol-dipol butuh molekul polar", "H-bond kuat dan khas F/O/N"],
      },
      {
        id: "c12-hubungan-ikatan-sifat",
        title: "Hubungan Ikatan dengan Sifat Zat",
        level: "Kelas 12",
        tags: ["titik didih", "kelarutan", "konduktivitas"],
        tips: [
          tip("Like dissolves like", "Polar cenderung larut dalam polar; nonpolar larut dalam nonpolar."),
          tip("Konduktivitas", "Senyawa ion menghantar saat leleh/larutan; logam menghantar sebagai padatan."),
        ],
        highlight: box(
          "Inti Konsep",
          "Jenis ikatan + gaya antarmolekul menentukan titik leleh/didih, kelarutan, kekerasan, dan daya hantar."
        ),
        sections: [
          {
            h: "Pola umum",
            p: [
              "Ionik: titik leleh tinggi, rapuh, menghantar saat leleh/larutan.",
              "Kovalen molekular: titik didih relatif rendah (kecuali gaya antarmolekul kuat).",
              "Jaringan kovalen (pengayaan): sangat keras & titik leleh tinggi (mis. intan).",
            ],
          },
          {
            h: "Kelarutan",
            p: [
              "Molekul polar larut dalam pelarut polar (mis. air).",
              "Molekul nonpolar larut dalam pelarut nonpolar (mis. heksana).",
              "Interaksi antarmolekul memengaruhi kemudahan melarut.",
            ],
            interactive: "SOLUBILITY",
          },
        ],
        keyPoints: ["Ikatan memengaruhi sifat makroskopik", "Kelarutan tergantung polaritas", "Konduktivitas bergantung pembawa muatan"],
      },
      {
        id: "c12-senyawa-kompleks",
        title: "Ikatan Kimia dalam Senyawa Kompleks (Pengayaan)",
        level: "Kelas 12",
        tags: ["kompleks", "ligan", "koordinasi"],
        tips: [
          tip("Kompleks", "Senyawa dengan atom pusat (biasanya logam) yang terikat ligan."),
          tip("Ligan", "Molekul/ion donor pasangan elektron yang berikatan koordinasi ke atom pusat."),
        ],
        highlight: box(
          "Inti Konsep",
          "Senyawa kompleks terbentuk lewat ikatan koordinasi antara ligan (donor) dan atom pusat (akseptor)."
        ),
        sections: [
          {
            h: "Konsep ringkas",
            p: [
              "Ligan menyumbang pasangan elektron ke logam pusat → ikatan koordinasi.",
              "Bentuk kompleks dipengaruhi jumlah koordinasi (4, 6, dst).",
              "Kompleks banyak dipakai di biologi (hemoglobin) dan industri (katalis).",
            ],
            interactive: "COMPLEX",
          },
        ],
        keyPoints: ["Ada atom pusat & ligan", "Ikatan koordinasi dominan", "Aplikasi luas"],
      },
    ],
  },
];

export function getMateriByClass(classId) {
  const block = MATERI.find((m) => m.classId === Number(classId));
  return block?.items || [];
}

export function getMateriById(id) {
  for (const m of MATERI) {
    const found = m.items.find((x) => x.id === id);
    if (found) return found;
  }
  return null;
}

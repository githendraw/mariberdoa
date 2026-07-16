import { db } from './src/lib/db/index'
import { mariberdoa, categories, doas } from './src/lib/db/schema'
import { sql } from 'drizzle-orm'

const categoryData = [
  { name: 'Doa Harian', slug: 'doa-harian', icon: '🌙' },
  { name: 'Doa Tidur', slug: 'doa-tidur', icon: '🛌' },
  { name: 'Doa Makan', slug: 'doa-makan', icon: '🍽️' },
  { name: 'Doa Bepergian', slug: 'doa-bepergian', icon: '🚗' },
  { name: 'Doa Ibadah', slug: 'doa-ibadah', icon: '🕌' },
  { name: 'Doa Orang Tua', slug: 'doa-orang-tua', icon: '👨‍👩‍👧‍👦' },
  { name: 'Doa & Ayat Pilihan', slug: 'doa-ayat-pilihan', icon: '📖' },
]

const doaData: { categorySlug: string; data: { title: string; arabic: string; latin: string; translation: string; source?: string }[] }[] = [
  {
    categorySlug: 'doa-harian',
    data: [
      { title: 'Doa Bangun Tidur', arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', latin: 'Alhamdulillahilladzi ahyana ba\'da ma amatana wa ilaihin nusyur', translation: 'Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan hanya kepada-Nya tempat kembali', source: 'HR. Bukhari No. 6312' },
      { title: 'Doa Sebelum Mandi', arabic: 'اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَتُبْ عَلَيَّ', latin: 'Allahummaghfir li warhamni wa tub \'alayya', translation: 'Ya Allah, ampunilah aku, rahmatilah aku, dan terimalah taubatku' },
      { title: 'Doa Keluar Kamar Mandi', arabic: 'غُفْرَانَكَ', latin: 'Ghufranaka', translation: 'Aku mohon ampunan-Mu', source: 'HR. Abu Dawud No. 30' },
      { title: 'Doa Berpakaian', arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا هُوَ لَهُ', latin: 'Allahumma inni as\'aluka min khairihi wa khairi ma huwa lahu', translation: 'Ya Allah, aku mohon kepada-Mu kebaikan pakaian ini dan kebaikan untuk apa ia dibuat', source: 'HR. Abu Dawud No. 4020' },
      { title: 'Doa Sebelum Belajar', arabic: 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا', latin: 'Rabbi zidni \'ilman warzuqni fahman', translation: 'Ya Tuhanku, tambahkanlah ilmu kepadaku dan berilah aku pemahaman', source: 'QS. Thaha: 114' },
      { title: 'Doa Bercermin', arabic: 'اللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي', latin: 'Allahumma kama hassanta khalqi fahassin khuluqi', translation: 'Ya Allah, sebagaimana Engkau telah membaguskan penciptaanku, maka baguskanlah akhlakku' },
      { title: 'Doa Masuk Rumah', arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا', latin: 'Bismillahi walajna, wa bismillahi kharajna', translation: 'Dengan nama Allah kami masuk, dengan nama Allah kami keluar', source: 'HR. Abu Dawud No. 5096' },
    ],
  },
  {
    categorySlug: 'doa-tidur',
    data: [
      { title: 'Doa Sebelum Tidur', arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', latin: 'Bismikallahumma amutu wa ahya', translation: 'Dengan nama-Mu ya Allah, aku mati dan aku hidup', source: 'HR. Bukhari No. 6312' },
      { title: 'Doa Bangun Tidur Malam', arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ', latin: 'La ilaha illallah wahdahu la syarika lah', translation: 'Tiada Tuhan selain Allah, Maha Esa, tidak ada sekutu bagi-Nya' },
      { title: 'Doa Mimpi Buruk', arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ', latin: 'A\'udzu billahi minasy syaithanir rajim', translation: 'Aku berlindung kepada Allah dari godaan setan yang terkutuk' },
      { title: 'Baca Ayat Kursi Sebelum Tidur', arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...', latin: 'Allahu la ilaha illa huwal hayyul qayyum...', translation: 'Allah, tidak ada Tuhan selain Dia, Yang Maha Hidup, Yang Terus Menerus Mengurus makhluk-Nya...', source: 'QS. Al-Baqarah: 255' },
    ],
  },
  {
    categorySlug: 'doa-makan',
    data: [
      { title: 'Doa Sebelum Makan', arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ', latin: 'Allahumma barik lana fi ma razaqtana wa qina \'adzaban nar', translation: 'Ya Allah, berkahilah kami dalam rezeki yang Engkau berikan dan lindungilah kami dari siksa neraka' },
      { title: 'Doa Sesudah Makan', arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا', latin: 'Alhamdulillahilladzi ath\'amana wa saqana', translation: 'Segala puji bagi Allah yang telah memberi kami makan dan minum', source: 'HR. Abu Dawud No. 3850' },
      { title: 'Doa Minum Susu', arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَزِدْنَا مِنْهُ', latin: 'Allahumma barik lana fihi wa zidna minhu', translation: 'Ya Allah, berkahilah kami di dalamnya dan tambahkanlah untuk kami' },
      { title: 'Doa Lupa Baca Doa Makan', arabic: 'بِسْمِ اللَّهِ فِي أَوَّلِهِ وَآخِرِهِ', latin: 'Bismillahi fi awwalihi wa akhirihi', translation: 'Dengan nama Allah pada awal dan akhirnya' },
      { title: 'Doa Minum Air Zamzam', arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا', latin: 'Allahumma inni as\'aluka \'ilman nafi\'an', translation: 'Ya Allah, aku mohon ilmu yang bermanfaat, rezeki yang luas, dan kesembuhan' },
    ],
  },
  {
    categorySlug: 'doa-bepergian',
    data: [
      { title: 'Doa Naik Kendaraan', arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا', latin: 'Subhanalladzi sakhkhara lana hadza', translation: 'Maha Suci Allah yang menundukkan kendaraan ini untuk kami', source: 'QS. Az-Zukhruf: 13-14' },
      { title: 'Doa Bepergian', arabic: 'اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ', latin: 'Allahumma antash shahibu fis safar', translation: 'Ya Allah, Engkau teman dalam perjalanan' },
      { title: 'Doa Masuk Masjid', arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ', latin: 'Allahummaftah li abwaba rahmatik', translation: 'Ya Allah, bukalah pintu-pintu rahmat-Mu' },
      { title: 'Doa Keluar Masjid', arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ', latin: 'Allahumma inni as\'aluka min fadhlik', translation: 'Ya Allah, aku mohon karunia-Mu' },
      { title: 'Doa Naik Kapal / Pesawat', arabic: 'بِسْمِ اللَّهِ مَجْرَاهَا وَمُرْسَاهَا', latin: 'Bismillahi majraha wa mursaha', translation: 'Dengan nama Allah pada waktu berlayar dan berlabuhnya', source: 'QS. Hud: 41' },
    ],
  },
  {
    categorySlug: 'doa-ibadah',
    data: [
      { title: 'Niat Wudhu', arabic: 'نَوَيْتُ الْوُضُوءَ لِلَّهِ تَعَالَى', latin: 'Nawaitul wudhu\'a lillahi ta\'ala', translation: 'Aku niat berwudhu karena Allah Ta\'ala' },
      { title: 'Doa Setelah Wudhu', arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ', latin: 'Asyhadu alla ilaha illallah', translation: 'Aku bersaksi bahwa tiada Tuhan selain Allah', source: 'HR. Muslim No. 234' },
      { title: 'Bacaan Ruku\'', arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ', latin: 'Subhana rabbiyal \'azhim', translation: 'Maha Suci Tuhanku Yang Maha Agung' },
      { title: 'Bacaan Sujud', arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى', latin: 'Subhana rabbiyal a\'la', translation: 'Maha Suci Tuhanku Yang Maha Tinggi' },
      { title: 'Doa Iftitah', arabic: 'اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ', latin: 'Allahumma ba\'id bayni wa bayna khathayaya', translation: 'Ya Allah, jauhkan antara aku dan kesalahanku', source: 'HR. Bukhari No. 744' },
    ],
  },
  {
    categorySlug: 'doa-orang-tua',
    data: [
      { title: 'Doa Untuk Kedua Orang Tua', arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا', latin: 'Rabbi irhamhuma kama rabbayani shaghira', translation: 'Ya Tuhanku, sayangilah keduanya sebagaimana mereka menyayangiku di waktu kecil', source: 'QS. Al-Isra: 24' },
      { title: 'Doa Untuk Anak', arabic: 'رَبَّنَا هَبْ لَنَا قُرَّةَ أَعْيُنٍ', latin: 'Rabbana hab lana qurrata a\'yun', translation: 'Ya Tuhan kami, anugerahkan keturunan sebagai penyenang hati', source: 'QS. Al-Furqan: 74' },
      { title: 'Doa Mohon Keluarga Baik', arabic: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ', latin: 'Rabbij\'alni muqimash shalati', translation: 'Ya Tuhanku, jadikanlah aku yang mendirikan sholat', source: 'QS. Ibrahim: 40' },
    ],
  },
  {
    categorySlug: 'doa-ayat-pilihan',
    data: [
      { title: 'Ayat Kursi', arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...', latin: 'Allahu la ilaha illa huwal hayyul qayyum...', translation: 'Allah, tidak ada Tuhan selain Dia, Yang Maha Hidup, lagi Maha Terus Menerus Mengurus makhluk-Nya...', source: 'QS. Al-Baqarah: 255' },
      { title: 'Doa Mohon Keselamatan', arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً', latin: 'Rabbana atina fid dunya hasanah', translation: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan akhirat', source: 'QS. Al-Baqarah: 201' },
      { title: 'Doa Mohon Ampunan', arabic: 'رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا', latin: 'Rabbana la tu\'akhidzna in nasina', translation: 'Ya Tuhan kami, jangan hukum kami jika kami lupa', source: 'QS. Al-Baqarah: 286' },
      { title: 'Istighfar', arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ', latin: 'Astaghfirullahal \'azhim', translation: 'Aku mohon ampun kepada Allah Yang Maha Agung' },
      { title: 'Doa 3 Qul (Pagi & Petang)', arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ...', latin: 'Qul huwallahu ahad...', translation: 'Katakanlah: Dialah Allah, Yang Maha Esa...', source: 'QS. Al-Ikhlas, Al-Falaq, An-Nas' },
    ],
  },
]

async function main() {
  console.log('🌱 Seeding mariberdoa.com...\n')

  // Create categories
  const catMap: Record<string, string> = {}
  for (const cat of categoryData) {
    const result = await db.insert(categories).values({
      name: cat.name, slug: cat.slug, icon: cat.icon,
    }).onConflictDoNothing().returning({ id: categories.id, slug: categories.slug })
    
    if (result.length > 0) {
      catMap[result[0].slug] = result[0].id
      console.log(`  ✓ Kategori: ${cat.name}`)
    } else {
      // Already exists, fetch it
      const existing = await db.select({ id: categories.id }).from(categories).where(sql`${categories.slug} = ${cat.slug}`).limit(1)
      if (existing.length > 0) {
        catMap[cat.slug] = existing[0].id
        console.log(`  ~ Kategori: ${cat.name} (already exists)`)
      }
    }
  }

  // Wait a moment between inserts
  let totalDoa = 0
  for (const group of doaData) {
    for (const d of group.data) {
      const slug = d.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      const categoryId = catMap[group.categorySlug]
      if (!categoryId) {
        console.log(`  ✗ Skipped: ${d.title} (category not found)`)
        continue
      }
      await db.insert(doas).values({
        title: d.title,
        slug,
        arabic: d.arabic,
        latin: d.latin,
        translation: d.translation,
        source: d.source || null,
        categoryId,
        isActive: true,
      }).onConflictDoNothing()
      totalDoa++
    }
  }
  console.log(`  ✓ ${totalDoa} doa di-seed\n`)
  console.log('✅ Seed complete!')
}

main().catch(e => { console.error(e); process.exit(1) })

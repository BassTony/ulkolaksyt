/**
 * Canonical ulkoläksyt texts.
 *
 * Each chunk:
 *   id      – unique across all texts
 *   text    – 1–3 words as displayed
 *   type    – syntactic slot tag used for phrase-matched distractor selection
 *
 * Type vocabulary:
 *   addr      – address / vocative ("Isä meidän")
 *   rel       – relative/subordinate clause opener ("joka olet")
 *   verb      – finite verb phrase
 *   noun      – noun phrase
 *   adj       – adjective / participle phrase
 *   adv       – adverb / manner phrase
 *   prep      – prepositional / case phrase
 *   conj      – coordinating or subordinating conjunction
 *   name      – proper name / title
 *   num       – numeral phrase
 *   part      – particle / discourse marker
 *   pron      – pronoun-headed phrase
 *   pred      – predicate complement
 *   imp       – imperative verb
 *   quote     – quoted or appositive label
 */

export const TEXTS = [
  {
    id: 'isa_meidan',
    title: 'Isä meidän',
    subtitle: 'Herran rukous',
    chunks: [
      { id: 'im_01', text: 'Isä meidän,', type: 'addr' },
      { id: 'im_02', text: 'joka olet', type: 'rel' },
      { id: 'im_03', text: 'taivaissa.', type: 'prep' },
      { id: 'im_04', text: 'Pyhitetty olkoon', type: 'imp' },
      { id: 'im_05', text: 'sinun nimesi.', type: 'noun' },
      { id: 'im_06', text: 'Tulkoon sinun', type: 'verb' },
      { id: 'im_07', text: 'valtakuntasi.', type: 'noun' },
      { id: 'im_08', text: 'Tapahtukoon sinun', type: 'imp' },
      { id: 'im_09', text: 'tahtosi,', type: 'noun' },
      { id: 'im_10', text: 'niin maan päällä', type: 'adv' },
      { id: 'im_11', text: 'kuin taivaassakin.', type: 'adv' },
      { id: 'im_12', text: 'Anna meille tänä päivänä', type: 'imp' },
      { id: 'im_13', text: 'meidän jokapäiväinen', type: 'adj' },
      { id: 'im_14', text: 'leipämme.', type: 'noun' },
      { id: 'im_15', text: 'Ja anna meille', type: 'imp' },
      { id: 'im_16', text: 'anteeksi', type: 'adv' },
      { id: 'im_17', text: 'meidän syntimme,', type: 'noun' },
      { id: 'im_18', text: 'niin kuin mekin', type: 'conj' },
      { id: 'im_19', text: 'annamme anteeksi', type: 'verb' },
      { id: 'im_20', text: 'niille,', type: 'pron' },
      { id: 'im_21', text: 'jotka ovat', type: 'rel' },
      { id: 'im_22', text: 'meitä vastaan', type: 'prep' },
      { id: 'im_23', text: 'rikkoneet.', type: 'verb' },
      { id: 'im_24', text: 'Äläkä saata meitä', type: 'imp' },
      { id: 'im_25', text: 'kiusaukseen,', type: 'noun' },
      { id: 'im_26', text: 'vaan päästä meidät', type: 'imp' },
      { id: 'im_27', text: 'pahasta.', type: 'noun' },
      { id: 'im_28', text: 'Sillä sinun on', type: 'conj' },
      { id: 'im_29', text: 'valtakunta', type: 'noun' },
      { id: 'im_30', text: 'ja voima', type: 'conj' },
      { id: 'im_31', text: 'ja kunnia', type: 'conj' },
      { id: 'im_32', text: 'iankaikkisesti.', type: 'adv' },
      { id: 'im_33', text: 'Aamen.', type: 'part' },
    ],
  },

  {
    id: 'apostolinen',
    title: 'Apostolinen uskontunnustus',
    subtitle: '',
    chunks: [
      { id: 'ap_01', text: 'Minä uskon', type: 'verb' },
      { id: 'ap_02', text: 'Jumalaan,', type: 'name' },
      { id: 'ap_03', text: 'Isään', type: 'name' },
      { id: 'ap_04', text: 'kaikkivaltiaaseen,', type: 'adj' },
      { id: 'ap_05', text: 'taivaan ja maan', type: 'noun' },
      { id: 'ap_06', text: 'Luojaan.', type: 'noun' },
      { id: 'ap_07', text: 'Ja Jeesukseen', type: 'conj' },
      { id: 'ap_08', text: 'Kristukseen,', type: 'name' },
      { id: 'ap_09', text: 'Jumalan ainoaan', type: 'adj' },
      { id: 'ap_10', text: 'Poikaan,', type: 'noun' },
      { id: 'ap_11', text: 'meidän Herraamme,', type: 'noun' },
      { id: 'ap_12', text: 'joka on saanut', type: 'rel' },
      { id: 'ap_13', text: 'alkunsa', type: 'noun' },
      { id: 'ap_14', text: 'Pyhästä Hengestä,', type: 'noun' },
      { id: 'ap_15', text: 'syntynyt', type: 'adj' },
      { id: 'ap_16', text: 'neitsyt Mariasta,', type: 'noun' },
      { id: 'ap_17', text: 'kärsinyt', type: 'adj' },
      { id: 'ap_18', text: 'Pontius Pilatuksen', type: 'name' },
      { id: 'ap_19', text: 'aikana,', type: 'prep' },
      { id: 'ap_20', text: 'ristiinnaulittu,', type: 'adj' },
      { id: 'ap_21', text: 'kuollut', type: 'adj' },
      { id: 'ap_22', text: 'ja haudattu,', type: 'conj' },
      { id: 'ap_23', text: 'astunut alas', type: 'verb' },
      { id: 'ap_24', text: 'tuonelaan,', type: 'noun' },
      { id: 'ap_25', text: 'noussut ylös', type: 'verb' },
      { id: 'ap_26', text: 'kuolleista', type: 'noun' },
      { id: 'ap_27', text: 'kolmantena päivänä,', type: 'prep' },
      { id: 'ap_28', text: 'astunut ylös', type: 'verb' },
      { id: 'ap_29', text: 'taivaisiin,', type: 'noun' },
      { id: 'ap_30', text: 'istuva', type: 'adj' },
      { id: 'ap_31', text: 'Jumalan', type: 'name' },
      { id: 'ap_32', text: 'Isän', type: 'name' },
      { id: 'ap_33', text: 'kaikkivaltiaan', type: 'adj' },
      { id: 'ap_34', text: 'oikealla puolella,', type: 'prep' },
      { id: 'ap_35', text: 'tuleva', type: 'adj' },
      { id: 'ap_36', text: 'tuomitsemaan', type: 'verb' },
      { id: 'ap_37', text: 'eläviä', type: 'adj' },
      { id: 'ap_38', text: 'ja kuolleita.', type: 'conj' },
      { id: 'ap_39', text: 'Minä uskon', type: 'verb' },
      { id: 'ap_40', text: 'Pyhään Henkeen,', type: 'noun' },
      { id: 'ap_41', text: 'pyhän yhteisen', type: 'adj' },
      { id: 'ap_42', text: 'seurakunnan', type: 'noun' },
      { id: 'ap_43', text: 'yhteyteen,', type: 'noun' },
      { id: 'ap_44', text: 'pyhien yhteisyyteen,', type: 'noun' },
      { id: 'ap_45', text: 'syntien anteeksiantamiseen,', type: 'noun' },
      { id: 'ap_46', text: 'ruumiin ylösnousemukseen', type: 'noun' },
      { id: 'ap_47', text: 'ja iankaikkiseen', type: 'conj' },
      { id: 'ap_48', text: 'elämään.', type: 'noun' },
      { id: 'ap_49', text: 'Aamen.', type: 'part' },
    ],
  },

  {
    id: 'kymmenen_kaskya',
    title: 'Kymmenen käskyä',
    subtitle: '',
    chunks: [
      { id: 'kk_01', text: 'Minä olen', type: 'verb' },
      { id: 'kk_02', text: 'Herra,', type: 'name' },
      { id: 'kk_03', text: 'sinun Jumalasi.', type: 'noun' },
      { id: 'kk_04', text: 'Sinulla ei saa olla', type: 'imp' },
      { id: 'kk_05', text: 'muita jumalia.', type: 'noun' },
      { id: 'kk_06', text: 'Älä tee', type: 'imp' },
      { id: 'kk_07', text: 'itsellesi', type: 'pron' },
      { id: 'kk_08', text: 'jumalankuvaa.', type: 'noun' },
      { id: 'kk_09', text: 'Älä lausu', type: 'imp' },
      { id: 'kk_10', text: 'turhaan', type: 'adv' },
      { id: 'kk_11', text: 'Herran,', type: 'name' },
      { id: 'kk_12', text: 'sinun Jumalasi,', type: 'noun' },
      { id: 'kk_13', text: 'nimeä.', type: 'noun' },
      { id: 'kk_14', text: 'Muista pyhittää', type: 'imp' },
      { id: 'kk_15', text: 'lepopäivä.', type: 'noun' },
      { id: 'kk_16', text: 'Kunnioita', type: 'imp' },
      { id: 'kk_17', text: 'isääsi', type: 'noun' },
      { id: 'kk_18', text: 'ja äitiäsi.', type: 'conj' },
      { id: 'kk_19', text: 'Älä tapa.', type: 'imp' },
      { id: 'kk_20', text: 'Älä tee', type: 'imp' },
      { id: 'kk_21', text: 'aviorikosta.', type: 'noun' },
      { id: 'kk_22', text: 'Älä varasta.', type: 'imp' },
      { id: 'kk_23', text: 'Älä lausu', type: 'imp' },
      { id: 'kk_24', text: 'väärää todistusta', type: 'noun' },
      { id: 'kk_25', text: 'lähimmäisestäsi.', type: 'prep' },
      { id: 'kk_26', text: 'Älä tavoittele', type: 'imp' },
      { id: 'kk_27', text: 'lähimmäisesi', type: 'noun' },
      { id: 'kk_28', text: 'kotia,', type: 'noun' },
      { id: 'kk_29', text: 'puolisoa,', type: 'noun' },
      { id: 'kk_30', text: 'työntekijöitä,', type: 'noun' },
      { id: 'kk_31', text: 'karjaa', type: 'noun' },
      { id: 'kk_32', text: 'äläkä mitään,', type: 'imp' },
      { id: 'kk_33', text: 'mikä hänelle', type: 'pron' },
      { id: 'kk_34', text: 'kuuluu.', type: 'verb' },
    ],
  },

  {
    id: 'joh_316',
    title: 'Joh. 3:16',
    subtitle: 'Pienoisevankeliumi',
    chunks: [
      { id: 'j3_01', text: 'Jumala rakasti', type: 'verb' },
      { id: 'j3_02', text: 'maailmaa niin paljon,', type: 'noun' },
      { id: 'j3_03', text: 'että hän antoi', type: 'conj' },
      { id: 'j3_04', text: 'ainoan Poikansa,', type: 'noun' },
      { id: 'j3_05', text: 'jotta jokainen,', type: 'rel' },
      { id: 'j3_06', text: 'joka häneen uskoo,', type: 'rel' },
      { id: 'j3_07', text: 'ei joutuisi', type: 'verb' },
      { id: 'j3_08', text: 'kadotukseen', type: 'noun' },
      { id: 'j3_09', text: 'vaan saisi', type: 'conj' },
      { id: 'j3_10', text: 'iankaikkisen elämän.', type: 'noun' },
    ],
  },

  {
    id: 'matt_2818',
    title: 'Matt. 28:18–20',
    subtitle: 'Kaste- ja lähetyskäsky',
    chunks: [
      { id: 'mt_01', text: 'Jeesus tuli', type: 'verb' },
      { id: 'mt_02', text: 'heidän luokseen', type: 'prep' },
      { id: 'mt_03', text: 'ja puhui heille:', type: 'verb' },
      { id: 'mt_04', text: '»Minulle on annettu', type: 'verb' },
      { id: 'mt_05', text: 'kaikki valta', type: 'noun' },
      { id: 'mt_06', text: 'taivaassa', type: 'prep' },
      { id: 'mt_07', text: 'ja maan päällä.', type: 'conj' },
      { id: 'mt_08', text: 'Menkää siis', type: 'imp' },
      { id: 'mt_09', text: 'ja tehkää', type: 'conj' },
      { id: 'mt_10', text: 'kaikki kansat', type: 'noun' },
      { id: 'mt_11', text: 'opetuslapsikseni:', type: 'noun' },
      { id: 'mt_12', text: 'kastakaa heitä', type: 'imp' },
      { id: 'mt_13', text: 'Isän', type: 'name' },
      { id: 'mt_14', text: 'ja Pojan', type: 'conj' },
      { id: 'mt_15', text: 'ja Pyhän Hengen', type: 'conj' },
      { id: 'mt_16', text: 'nimeen,', type: 'noun' },
      { id: 'mt_17', text: 'ja opettakaa', type: 'imp' },
      { id: 'mt_18', text: 'heitä noudattamaan', type: 'verb' },
      { id: 'mt_19', text: 'kaikkea,', type: 'adj' },
      { id: 'mt_20', text: 'mitä minä', type: 'pron' },
      { id: 'mt_21', text: 'olen käskenyt', type: 'verb' },
      { id: 'mt_22', text: 'teidän.', type: 'pron' },
      { id: 'mt_23', text: 'Ja katso,', type: 'conj' },
      { id: 'mt_24', text: 'minä olen', type: 'verb' },
      { id: 'mt_25', text: 'teidän kanssanne', type: 'prep' },
      { id: 'mt_26', text: 'kaikki päivät', type: 'noun' },
      { id: 'mt_27', text: 'maailman loppuun', type: 'prep' },
      { id: 'mt_28', text: 'asti.»', type: 'adv' },
    ],
  },

  {
    id: 'herran_siunaus',
    title: 'Herran siunaus',
    subtitle: '4. Moos. 6:24–26',
    chunks: [
      { id: 'hs_01', text: 'Herra siunatkoon', type: 'imp' },
      { id: 'hs_02', text: 'sinua', type: 'pron' },
      { id: 'hs_03', text: 'ja varjelkoon', type: 'conj' },
      { id: 'hs_04', text: 'sinua.', type: 'pron' },
      { id: 'hs_05', text: 'Herra valistakoon', type: 'imp' },
      { id: 'hs_06', text: 'kasvonsa', type: 'noun' },
      { id: 'hs_07', text: 'sinulle', type: 'pron' },
      { id: 'hs_08', text: 'ja olkoon', type: 'conj' },
      { id: 'hs_09', text: 'sinulle armollinen.', type: 'adj' },
      { id: 'hs_10', text: 'Herra kääntäköön', type: 'imp' },
      { id: 'hs_11', text: 'kasvonsa', type: 'noun' },
      { id: 'hs_12', text: 'sinuun päin', type: 'prep' },
      { id: 'hs_13', text: 'ja antakoon', type: 'conj' },
      { id: 'hs_14', text: 'sinulle rauhan.', type: 'noun' },
      { id: 'hs_15', text: 'Aamen.', type: 'part' },
    ],
  },
]

/** Flat list of all chunks across all texts — used for distractor sampling */
export const ALL_CHUNKS = TEXTS.flatMap(t =>
  t.chunks.map(c => ({ ...c, textId: t.id }))
)

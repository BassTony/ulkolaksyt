/**
 * Canonical ulkoläksyt texts — sourced from texts.md.
 *
 * chunk fields:
 *   id      – unique across all texts
 *   text    – 1–3 words as displayed
 *   type    – syntactic slot for phrase-matched distractor selection
 *   fixed   – if true, auto-confirmed (not a puzzle choice); used for commandment numbers
 *
 * Type vocabulary:
 *   addr  – address/vocative        name  – proper name/title
 *   rel   – relative clause opener  num   – numeral label (fixed)
 *   verb  – finite verb phrase       noun  – noun phrase
 *   adj   – adjective/participle     adv   – adverb/manner
 *   prep  – prepositional phrase     conj  – conjunction
 *   pron  – pronoun phrase           pred  – predicate complement
 *   imp   – imperative verb          part  – particle/discourse marker
 */

export const TEXTS = [
  // ── Isä meidän ─────────────────────────────────────────────────────────────
  {
    id: 'isa_meidan',
    title: 'Isä meidän',
    subtitle: '',
    chunks: [
      { id: 'im_01', text: 'Isä meidän,',            type: 'addr' },
      { id: 'im_02', text: 'joka olet',              type: 'rel'  },
      { id: 'im_03', text: 'taivaissa.',             type: 'prep' },
      { id: 'im_04', text: 'Pyhitetty olkoon',       type: 'imp'  },
      { id: 'im_05', text: 'sinun nimesi.',          type: 'noun' },
      { id: 'im_06', text: 'Tulkoon sinun',          type: 'verb' },
      { id: 'im_07', text: 'valtakuntasi.',          type: 'noun' },
      { id: 'im_08', text: 'Tapahtukoon sinun',      type: 'imp'  },
      { id: 'im_09', text: 'tahtosi,',               type: 'noun' },
      { id: 'im_10', text: 'myös maan päällä',       type: 'adv'  },
      { id: 'im_11', text: 'niin kuin taivaassa.',   type: 'adv'  },
      { id: 'im_12', text: 'Anna meille',            type: 'imp'  },
      { id: 'im_13', text: 'tänä päivänä',           type: 'prep' },
      { id: 'im_14', text: 'meidän jokapäiväinen',   type: 'adj'  },
      { id: 'im_15', text: 'leipämme.',              type: 'noun' },
      { id: 'im_16', text: 'Ja anna meille',         type: 'imp'  },
      { id: 'im_17', text: 'meidän syntimme',        type: 'noun' },
      { id: 'im_18', text: 'anteeksi,',              type: 'adv'  },
      { id: 'im_19', text: 'niin kuin mekin',        type: 'conj' },
      { id: 'im_20', text: 'anteeksi annamme',       type: 'verb' },
      { id: 'im_21', text: 'niille,',                type: 'pron' },
      { id: 'im_22', text: 'jotka ovat',             type: 'rel'  },
      { id: 'im_23', text: 'meitä vastaan',          type: 'prep' },
      { id: 'im_24', text: 'rikkoneet.',             type: 'verb' },
      { id: 'im_25', text: 'Äläkä saata meitä',      type: 'imp'  },
      { id: 'im_26', text: 'kiusaukseen,',           type: 'noun' },
      { id: 'im_27', text: 'vaan päästä meidät',     type: 'imp'  },
      { id: 'im_28', text: 'pahasta.',               type: 'noun' },
      { id: 'im_29', text: 'Sillä sinun on',         type: 'conj' },
      { id: 'im_30', text: 'valtakunta',             type: 'noun' },
      { id: 'im_31', text: 'ja voima',               type: 'conj' },
      { id: 'im_32', text: 'ja kunnia',              type: 'conj' },
      { id: 'im_33', text: 'iankaikkisesti.',        type: 'adv'  },
      { id: 'im_34', text: 'Aamen.',                 type: 'part' },
    ],
  },

  // ── Apostolinen uskontunnustus ──────────────────────────────────────────────
  {
    id: 'apostolinen',
    title: 'Apostolinen uskontunnustus',
    subtitle: '',
    chunks: [
      { id: 'ap_01', text: 'Minä uskon',             type: 'verb' },
      { id: 'ap_02', text: 'Jumalaan,',              type: 'name' },
      { id: 'ap_03', text: 'Isään',                  type: 'name' },
      { id: 'ap_04', text: 'Kaikkivaltiaaseen,',     type: 'adj'  },
      { id: 'ap_05', text: 'taivaan ja maan',        type: 'noun' },
      { id: 'ap_06', text: 'Luojaan,',               type: 'noun' },
      { id: 'ap_07', text: 'ja Jeesukseen',          type: 'conj' },
      { id: 'ap_08', text: 'Kristukseen,',           type: 'name' },
      { id: 'ap_09', text: 'Jumalan ainoaan',        type: 'adj'  },
      { id: 'ap_10', text: 'Poikaan,',               type: 'noun' },
      { id: 'ap_11', text: 'meidän Herraamme,',      type: 'noun' },
      { id: 'ap_12', text: 'joka sikisi',            type: 'rel'  },
      { id: 'ap_13', text: 'Pyhästä Hengestä,',      type: 'noun' },
      { id: 'ap_14', text: 'syntyi',                 type: 'verb' },
      { id: 'ap_15', text: 'neitsyt Mariasta,',      type: 'noun' },
      { id: 'ap_16', text: 'kärsi',                  type: 'verb' },
      { id: 'ap_17', text: 'Pontius Pilatuksen',     type: 'name' },
      { id: 'ap_18', text: 'aikana,',                type: 'prep' },
      { id: 'ap_19', text: 'ristiinnaulittiin,',     type: 'verb' },
      { id: 'ap_20', text: 'kuoli',                  type: 'verb' },
      { id: 'ap_21', text: 'ja haudattiin,',         type: 'conj' },
      { id: 'ap_22', text: 'astui alas',             type: 'verb' },
      { id: 'ap_23', text: 'tuonelaan,',             type: 'noun' },
      { id: 'ap_24', text: 'nousi',                  type: 'verb' },
      { id: 'ap_25', text: 'kolmantena päivänä',     type: 'prep' },
      { id: 'ap_26', text: 'kuolleista,',            type: 'noun' },
      { id: 'ap_27', text: 'astui ylös',             type: 'verb' },
      { id: 'ap_28', text: 'taivaisiin,',            type: 'noun' },
      { id: 'ap_29', text: 'istuu',                  type: 'verb' },
      { id: 'ap_30', text: 'Jumalan,',               type: 'name' },
      { id: 'ap_31', text: 'Isän',                   type: 'name' },
      { id: 'ap_32', text: 'Kaikkivaltiaan,',        type: 'adj'  },
      { id: 'ap_33', text: 'oikealla puolella,',     type: 'prep' },
      { id: 'ap_34', text: 'on sieltä tuleva',       type: 'verb' },
      { id: 'ap_35', text: 'tuomitsemaan',           type: 'verb' },
      { id: 'ap_36', text: 'eläviä',                 type: 'adj'  },
      { id: 'ap_37', text: 'ja kuolleita,',          type: 'conj' },
      { id: 'ap_38', text: 'ja Pyhään',              type: 'conj' },
      { id: 'ap_39', text: 'Henkeen,',               type: 'noun' },
      { id: 'ap_40', text: 'pyhän yhteisen',         type: 'adj'  },
      { id: 'ap_41', text: 'seurakunnan,',           type: 'noun' },
      { id: 'ap_42', text: 'pyhäin yhteyden,',       type: 'noun' },
      { id: 'ap_43', text: 'syntien',                type: 'noun' },
      { id: 'ap_44', text: 'anteeksiantamisen,',     type: 'noun' },
      { id: 'ap_45', text: 'ruumiin',                type: 'noun' },
      { id: 'ap_46', text: 'ylösnousemisen',         type: 'noun' },
      { id: 'ap_47', text: 'ja iankaikkisen',        type: 'conj' },
      { id: 'ap_48', text: 'elämän.',                type: 'noun' },
    ],
  },

  // ── Kymmenen käskyä ─────────────────────────────────────────────────────────
  // Numbers (fixed: true) are auto-confirmed in the puzzle — not interactive choices.
  {
    id: 'kymmenen_kaskya',
    title: 'Kymmenen käskyä',
    subtitle: '',
    chunks: [
      { id: 'kk_n1',  text: '1.',                        type: 'num', fixed: true },
      { id: 'kk_01',  text: 'Minä olen',                 type: 'verb' },
      { id: 'kk_02',  text: 'Herra,',                    type: 'name' },
      { id: 'kk_03',  text: 'sinun Jumalasi.',           type: 'noun' },
      { id: 'kk_04',  text: 'Sinulla ei saa olla',       type: 'imp'  },
      { id: 'kk_05',  text: 'muita jumalia.',            type: 'noun' },
      { id: 'kk_n2',  text: '2.',                        type: 'num', fixed: true },
      { id: 'kk_06',  text: 'Älä käytä väärin',         type: 'imp'  },
      { id: 'kk_07',  text: 'Herran,',                   type: 'name' },
      { id: 'kk_08',  text: 'Jumalasi',                  type: 'noun' },
      { id: 'kk_09',  text: 'nimeä.',                    type: 'noun' },
      { id: 'kk_n3',  text: '3.',                        type: 'num', fixed: true },
      { id: 'kk_10',  text: 'Pyhitä',                    type: 'imp'  },
      { id: 'kk_11',  text: 'lepopäivä.',                type: 'noun' },
      { id: 'kk_n4',  text: '4.',                        type: 'num', fixed: true },
      { id: 'kk_12',  text: 'Kunnioita',                 type: 'imp'  },
      { id: 'kk_13',  text: 'isääsi',                    type: 'noun' },
      { id: 'kk_14',  text: 'ja äitiäsi.',               type: 'conj' },
      { id: 'kk_n5',  text: '5.',                        type: 'num', fixed: true },
      { id: 'kk_15',  text: 'Älä tapa.',                 type: 'imp'  },
      { id: 'kk_n6',  text: '6.',                        type: 'num', fixed: true },
      { id: 'kk_16',  text: 'Älä tee',                   type: 'imp'  },
      { id: 'kk_17',  text: 'aviorikosta.',              type: 'noun' },
      { id: 'kk_n7',  text: '7.',                        type: 'num', fixed: true },
      { id: 'kk_18',  text: 'Älä varasta.',              type: 'imp'  },
      { id: 'kk_n8',  text: '8.',                        type: 'num', fixed: true },
      { id: 'kk_19',  text: 'Älä lausu',                 type: 'imp'  },
      { id: 'kk_20',  text: 'väärää todistusta',        type: 'noun' },
      { id: 'kk_21',  text: 'lähimmäisestäsi.',         type: 'prep' },
      { id: 'kk_n9',  text: '9.',                        type: 'num', fixed: true },
      { id: 'kk_22',  text: 'Älä tavoittele',            type: 'imp'  },
      { id: 'kk_23',  text: 'lähimmäisesi',             type: 'noun' },
      { id: 'kk_24',  text: 'omaisuutta.',              type: 'noun' },
      { id: 'kk_n10', text: '10.',                       type: 'num', fixed: true },
      { id: 'kk_25',  text: 'Älä tavoittele',            type: 'imp'  },
      { id: 'kk_26',  text: 'lähimmäisesi',             type: 'noun' },
      { id: 'kk_27',  text: 'puolisoa,',                type: 'noun' },
      { id: 'kk_28',  text: 'työntekijöitä,',           type: 'noun' },
      { id: 'kk_29',  text: 'karjaa',                   type: 'noun' },
      { id: 'kk_30',  text: 'äläkä mitään,',            type: 'imp'  },
      { id: 'kk_31',  text: 'mikä hänelle',             type: 'pron' },
      { id: 'kk_32',  text: 'kuuluu.',                  type: 'verb' },
    ],
  },

  // ── Joh. 3:16 ───────────────────────────────────────────────────────────────
  {
    id: 'joh_316',
    title: 'Joh. 3:16',
    subtitle: 'Pienoisevankeliumi',
    chunks: [
      { id: 'j3_01', text: 'Jumala on rakastanut',   type: 'verb' },
      { id: 'j3_02', text: 'maailmaa niin paljon,',  type: 'adv'  },
      { id: 'j3_03', text: 'että antoi',             type: 'conj' },
      { id: 'j3_04', text: 'ainoan Poikansa,',       type: 'noun' },
      { id: 'j3_05', text: 'jottei yksikään,',       type: 'conj' },
      { id: 'j3_06', text: 'joka häneen uskoo,',     type: 'rel'  },
      { id: 'j3_07', text: 'joutuisi kadotukseen,',  type: 'verb' },
      { id: 'j3_08', text: 'vaan saisi',             type: 'conj' },
      { id: 'j3_09', text: 'iankaikkisen elämän.',   type: 'noun' },
    ],
  },

  // ── Matt. 28:18–20 ───────────────────────────────────────────────────────────
  {
    id: 'matt_2818',
    title: 'Matt. 28:18–20',
    subtitle: 'Kaste- ja lähetyskäsky',
    chunks: [
      { id: 'mt_01', text: 'Minulle on annettu',     type: 'verb' },
      { id: 'mt_02', text: 'kaikki valta',           type: 'noun' },
      { id: 'mt_03', text: 'taivaassa',              type: 'prep' },
      { id: 'mt_04', text: 'ja maan päällä.',        type: 'conj' },
      { id: 'mt_05', text: 'Menkää siis',            type: 'imp'  },
      { id: 'mt_06', text: 'ja tehkää',              type: 'conj' },
      { id: 'mt_07', text: 'kaikki kansat',          type: 'noun' },
      { id: 'mt_08', text: 'minun opetuslapsikseni:', type: 'noun' },
      { id: 'mt_09', text: 'kastakaa heitä',         type: 'imp'  },
      { id: 'mt_10', text: 'Isän',                   type: 'name' },
      { id: 'mt_11', text: 'ja Pojan',               type: 'conj' },
      { id: 'mt_12', text: 'ja Pyhän Hengen',        type: 'conj' },
      { id: 'mt_13', text: 'nimeen',                 type: 'noun' },
      { id: 'mt_14', text: 'ja opettakaa',           type: 'imp'  },
      { id: 'mt_15', text: 'heitä noudattamaan',     type: 'verb' },
      { id: 'mt_16', text: 'kaikkea,',               type: 'adj'  },
      { id: 'mt_17', text: 'mitä minä',              type: 'pron' },
      { id: 'mt_18', text: 'olen käskenyt',          type: 'verb' },
      { id: 'mt_19', text: 'teidän noudattaa.',      type: 'verb' },
      { id: 'mt_20', text: 'Ja katso,',              type: 'conj' },
      { id: 'mt_21', text: 'minä olen',              type: 'verb' },
      { id: 'mt_22', text: 'teidän kanssanne',       type: 'prep' },
      { id: 'mt_23', text: 'kaikki päivät',          type: 'noun' },
      { id: 'mt_24', text: 'maailman loppuun',       type: 'prep' },
      { id: 'mt_25', text: 'asti.',                  type: 'adv'  },
    ],
  },

  // ── Herran siunaus ───────────────────────────────────────────────────────────
  {
    id: 'herran_siunaus',
    title: 'Herran siunaus',
    subtitle: '',
    chunks: [
      { id: 'hs_01', text: 'Herra siunatkoon',       type: 'imp'  },
      { id: 'hs_02', text: 'teitä',                  type: 'pron' },
      { id: 'hs_03', text: 'ja varjelkoon',          type: 'conj' },
      { id: 'hs_04', text: 'teitä.',                 type: 'pron' },
      { id: 'hs_05', text: 'Herra kirkastakoon',     type: 'imp'  },
      { id: 'hs_06', text: 'kasvonsa',               type: 'noun' },
      { id: 'hs_07', text: 'teille',                 type: 'pron' },
      { id: 'hs_08', text: 'ja olkoon',              type: 'conj' },
      { id: 'hs_09', text: 'teille armollinen.',     type: 'adj'  },
      { id: 'hs_10', text: 'Herra kääntäköön',       type: 'imp'  },
      { id: 'hs_11', text: 'kasvonsa',               type: 'noun' },
      { id: 'hs_12', text: 'teidän puoleenne',       type: 'prep' },
      { id: 'hs_13', text: 'ja antakoon',            type: 'conj' },
      { id: 'hs_14', text: 'teille rauhan.',         type: 'noun' },
      { id: 'hs_15', text: 'Isän',                   type: 'name' },
      { id: 'hs_16', text: 'ja Pojan',               type: 'conj' },
      { id: 'hs_17', text: 'ja Pyhän Hengen',        type: 'conj' },
      { id: 'hs_18', text: 'nimeen.',                type: 'noun' },
      { id: 'hs_19', text: 'Aamen.',                 type: 'part' },
    ],
  },
]

/** Flat list of all interactive (non-fixed) chunks — used for distractor sampling */
export const ALL_CHUNKS = TEXTS.flatMap(t =>
  t.chunks
    .filter(c => !c.fixed)
    .map(c => ({ ...c, textId: t.id }))
)

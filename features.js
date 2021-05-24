function setFeatures(hash, features, featuresReduced) {
  let PYRAMID_1,
      PYRAMID_2,
      PYRAMID_3,
      PYRAMID_4,
      PYRAMID_5,
      ANIMATING_PUPIL,
      PY_EYE,
      PY_EYE_INVERSE,
      PY_TOP_CIRCLE,
      PY_BOTTOM_CIRCLE,
      PY_TRIANGLE,
      PY_TRIANGLE_INVERSE,
      PY_PUPIL,

      BACKGROUND_TYPE,

      SHOW_TRI,
      TRI_T1,
      TRI_T2,
      TRI_C1,
      TRI_C2,
      TRI_TE,
      TRI_CE,
      TRI_N,
      TRI_SPACING,
      TRI_W,
      INVERTED_TRI,
      TRI_CROSS1,
      TRI_CROSS2,

      SHOW_COLUMN,
      COLUMN_T,
      COLUMN_W,
      SHOW_WINGS,
      WING_W,
      TOP_BOTTOM_ANIMATION,
      TOP_BOTTOM_MIN,
      TOP_BOTTOM_MAX,
      TOP_BOTTOM_W,
      SIDES_PRIMARY,
      SIDES_SECONDARY,
      SIDES_T,

      SHOW_ARCH_CORNERS,
      ARCH_E,
      ARCH_S,
      ARCH_DYN_E,
      ARCH_DYN_S,
      ARCH_E_ANIM,
      ARCH_S_ANIM,
      ARCH_DYN_E_ANIM,
      ARCH_DYN_S_ANIM,
      ARCH_SIZE_ADJ,
      ARCH_W,
      ARCH_SPACING,
      ARCH_INVERTED,
      ARCH_VERTED,
      ARCH_DOUBLE_COEFF,
      COLOR_SCHEME


  const prb = (x) => rnd() < x
  const btwn = (m, mx) => m + rnd() * (mx - m)
  const sample = (a) => a[Math.floor(a.length * rnd())]
  let seed = parseInt(hash.slice(0, 16), 16)
  function rnd() {
     seed ^= seed << 13
     seed ^= seed >> 17
     seed ^= seed << 5
     return (((seed < 0) ? ~seed + 1 : seed) % 1000) / 1000
  }

  let hshUsed = 0
  function hshrnd(h) {
    const str = tokenData.hash.slice(2 + hshUsed, 2 + hshUsed + h)
    const num = parseInt(str, 16)
    hshUsed += h
    return num / (16**h)
  }
  const hshprb = (h, p) => hshrnd(h) < p


  const colorSeed = hshrnd(2)
  hshrnd(3)
  hshrnd(3)

  // matte 49%
  if (colorSeed < 0.49) {
    COLOR_SCHEME = 'Matte'

  // neon 16%
  }  else if (colorSeed < 0.65) {
    COLOR_SCHEME = 'Luminous'

  // neon dark 16%
  }  else if (colorSeed < 0.81) {
    COLOR_SCHEME = 'Shadow'

  // bright 16%
  }  else if (colorSeed < 0.97) {
    COLOR_SCHEME = 'Neon'

  // b&w 2%
  } else if (colorSeed < 0.99) {
    COLOR_SCHEME = 'Yin/Yang'

  // w&b 1%
  } else {
    COLOR_SCHEME = 'Yang/Yin'
  }



  PY_EYE = hshprb(1, 0.4275)
  const tCProb = hshprb(1, 0.5)
  const bCProb = hshprb(1, 0.5)
  const eIProb = hshprb(1, 0.5)
  const pt = hshrnd(2)

  PY_TOP_CIRCLE = !PY_EYE && tCProb // 30%
  PY_BOTTOM_CIRCLE = !PY_EYE && bCProb // 30%
  PY_EYE_INVERSE = !PY_EYE && !PY_TOP_CIRCLE && !PY_BOTTOM_CIRCLE && eIProb // 16%
  PY_TRIANGLE = pt < 0.85
  PY_TRIANGLE_INVERSE = pt > 0.85 && pt < 0.95
  PY_PUPIL = hshprb(1, 0.9)

  if (hshprb(1, 0.65)) PYRAMID_1 = true
  if (hshprb(1, 0.65)) PYRAMID_2 = true
  if (hshprb(1, 0.65)) PYRAMID_3 = true
  if (hshprb(1, 0.65)) PYRAMID_4 = true
  if (
    hshprb(1, 0.65)
    || !(PYRAMID_1 || PYRAMID_2 || PYRAMID_3 || PYRAMID_4)
  ) PYRAMID_5 = true

  if (hshprb(2, 0.02)) {
    ANIMATING_PUPIL = true
  }




  const bgSeed = hshrnd(2)

  if (bgSeed < 0.2) {
    BACKGROUND_TYPE = 'Sacred Geometry'
    // tri pyramid
    SHOW_TRI = true
    TRI_CROSS1 = hshprb(1, 0.1875)
    TRI_CROSS2 = hshprb(1, TRI_CROSS1 ? 0.5 : 0.1875)
    TRI_T1 = hshprb(1, 0.4275)
    TRI_T2 = hshprb(1, 0.4275)
    TRI_C1 = hshprb(1, 0.4275)
    TRI_C2 = hshprb(1, 0.4275)
    TRI_TE = hshprb(2, 0.1)
    TRI_CE = hshprb(2, 0.1)
    if (!(TRI_T1 || TRI_T2 || TRI_C1 || TRI_C2 || TRI_CROSS1 || TRI_CROSS2)) {
      if (hshprb(1, 0.5)) TRI_T1 = true
      else TRI_T2 = true
    }

    if (!TRI_T1 || !TRI_C1 || !TRI_CROSS1) {
      if (hshprb(1, 0.5)) TRI_T1 = true
      else TRI_C1 = true
    }

    TRI_W = 1 + rnd() * 4
    TRI_SPACING = 14 * TRI_W + rnd() * 30
    TRI_N = Math.floor(700/TRI_SPACING + rnd() * 12)
    INVERTED_TRI = hshprb(1, 0.3125)

  } else if (bgSeed < 0.9) {
    BACKGROUND_TYPE = 'Archs'

    SHOW_ARCH_CORNERS = true

    ARCH_SIZE_ADJ = rnd() * 500 - 100

    const archSeed = hshrnd(2)
    if (archSeed < 0.6) ARCH_VERTED = true
    else if (archSeed < 0.9) ARCH_INVERTED = true
    else {
      ARCH_VERTED = true
      ARCH_INVERTED = true
    }

    ARCH_W = btwn(1, 9)
    ARCH_SPACING = ARCH_W + rnd() * 5

    if (hshprb(1, 0.125)) ARCH_DOUBLE_COEFF = rnd() * ARCH_W

    ARCH_E = hshprb(1, 0.2) ? 0 : rnd() * 720 - 360
    ARCH_S = hshprb(1, 0.2) ? 0 : rnd() * 720 - 360
    const dynE = hshrnd(1)
    ARCH_DYN_E =
      dynE < 0.5 ? 0 :
      dynE < 0.75 ? rnd() * 0.6 - 0.3 :
      rnd() * 160 - 80
    const dynS = hshrnd(1)
    ARCH_DYN_S =
      dynS < 0.5 ? 0 :
      dynS < 0.75 ? rnd() * 0.6 - 0.3 :
      rnd() * 160 - 80


    if (hshprb(1, 0.1875)) ARCH_DYN_S = ARCH_DYN_E
    if (hshprb(2, 0.05)) ARCH_E_ANIM = btwn(2, 20) * (hshprb(1, 0.5) ? 1 : -1)
    if (hshprb(2, 0.05)) ARCH_S_ANIM = btwn(2, 20) * (hshprb(1, 0.5) ? 1 : -1)
    if (hshprb(2, 0.05)) ARCH_DYN_E_ANIM = btwn(600, 6600) * (hshprb(1, 0.5) ? 1 : -1)
    if (hshprb(2, 0.05)) ARCH_DYN_S_ANIM = btwn(600, 6600) * (hshprb(1, 0.5) ? 1 : -1)

  } else if (bgSeed < 0.99) {
    BACKGROUND_TYPE = 'Divinity'
    // column + wings
    COLUMN_W = 10 + rnd() * 40

    if (hshprb(1, 0.5)) {
      SHOW_COLUMN = true
      COLUMN_T = hshprb(1, 0.6875) ? btwn(110, 460) : btwn(530, 660)
    }

    if (hshprb(1, 0.125)) {
      SHOW_WINGS = true
    }

    if (hshprb(1, 0.125)) {
      TOP_BOTTOM_ANIMATION = true
      TOP_BOTTOM_MIN = btwn(390, 430)
      TOP_BOTTOM_MAX = TOP_BOTTOM_MIN + 40
      TOP_BOTTOM_W = Math.max(COLUMN_W/2, 3)
    }

    if (!SHOW_WINGS && !TOP_BOTTOM_ANIMATION && !SHOW_COLUMN) {
      SIDES_T = btwn(720, 820)
      SIDES_PRIMARY = true
      if (hshprb(1, 0.75)) {
        SIDES_SECONDARY = true
      }
    } else {
      SIDES_T = btwn(590, 665)
    }

    if (hshprb(2, 0.05)) {
      SIDES_PRIMARY = true
      if (hshprb(1, 0.75)) {
        SIDES_SECONDARY = true
      }
    }


  } else {
    BACKGROUND_TYPE = 'Purity'
  }


  const addFeatures = (str) => features.push(str)
  const addFeaturesReduced = (str) => featuresReduced.push(str)
  const addFeaturesBoth = (str) => {
    addFeatures(str)
    addFeaturesReduced(str)
  }

  addFeaturesBoth(`Color Spectrum: ${COLOR_SCHEME}`)
  addFeaturesBoth(`Background: ${BACKGROUND_TYPE}`)


  if (PY_EYE) {
    addFeaturesBoth('Eye of Providence')
  } else if (PY_TOP_CIRCLE && PY_BOTTOM_CIRCLE) {
    addFeaturesBoth('Infinite Gaze')
  } else if (PY_TOP_CIRCLE) {
    addFeaturesBoth('Downward Gaze')
  } else if (PY_BOTTOM_CIRCLE) {
    addFeaturesBoth('Upward Gaze')
  } else if (PY_EYE_INVERSE) {
    addFeaturesBoth('Golden Gaze')
  }

  if (!PY_PUPIL && !ANIMATING_PUPIL) {
    addFeaturesBoth('Blinded')
  } else if (ANIMATING_PUPIL) {
    addFeaturesBoth("Charon's Obol")
  }

  if (PY_TRIANGLE_INVERSE) {
    addFeaturesBoth('False Profit')
  } else if (!PY_TRIANGLE) {
    addFeaturesBoth('Invisible Hand')
  }

  if (
    (!PYRAMID_1 && !PYRAMID_3 && !PYRAMID_5)
    || (!PYRAMID_2 && !PYRAMID_4)
  ) {
    addFeaturesBoth('Monolithic')
  }


  if (BACKGROUND_TYPE === 'Divinity') {

    if (TOP_BOTTOM_ANIMATION) {
      addFeaturesBoth('Heaven and Earth')
    }

    if (SIDES_SECONDARY || SIDES_PRIMARY) {
      addFeaturesBoth('Vestigial Vessel')
    }

    if (SHOW_WINGS) {
      addFeaturesBoth('Angelic Affluence')
    }

    if (COLUMN_T) {
      addFeatures(`Astral Projection Coefficient: ${COLUMN_T.toFixed(4)}`)
      addFeaturesReduced('Astral Projection')
    }
  }

  if (BACKGROUND_TYPE === 'Archs') {

    const absS = (ARCH_S + 360) % 360
    const absE = (ARCH_E + 360) % 360
    if (!(
      ARCH_E ||
      ARCH_S ||
      ARCH_DYN_E ||
      ARCH_DYN_S ||
      ARCH_E_ANIM ||
      ARCH_S_ANIM ||
      ARCH_DYN_E_ANIM ||
      ARCH_DYN_S_ANIM
    )) {
      addFeaturesBoth('Legal Tender')

    } else if (ARCH_DYN_S && ARCH_DYN_S === ARCH_DYN_E) {
      addFeaturesBoth('Cycle of Rebirth')
    } else if (!ARCH_E && !ARCH_S) {
      addFeaturesBoth('Cosmic Contango')
    } else if (
      !ARCH_DYN_S && !ARCH_DYN_E &&
      absS - 60 < absE &&
      absS >= 130 && absE <= 230
    ) {
      addFeaturesBoth('Mystical Munificence')

    } else if (!ARCH_DYN_S && !ARCH_DYN_E) {
      addFeaturesBoth('Gravy Train')
    }

    if (ARCH_DYN_S || ARCH_DYN_E) {
      addFeaturesReduced(`Cosmic Inflation`)
      addFeatures(`Cosmic Inflation Rate: ${Math.abs(ARCH_DYN_S - ARCH_DYN_E).toFixed(4)}`)
    }

    if (ARCH_E_ANIM || ARCH_S_ANIM || ARCH_DYN_E_ANIM || ARCH_DYN_S_ANIM) {
      addFeaturesBoth('5D Time Dilation')
    }

    if (Math.abs(ARCH_S - ARCH_E)) {
      addFeaturesReduced(`Karmic Interest`)
      addFeatures(`Karmic Interest Rate: ${Math.abs(ARCH_S - ARCH_E).toFixed(4)}`)
    }

    if (ARCH_W) {
      addFeaturesReduced(`Financial Burden: ${Math.round(ARCH_W)}`)
      addFeatures(`Financial Burden: ${ARCH_W.toFixed(4)}`)
    }

    if (ARCH_DOUBLE_COEFF) {
      addFeaturesBoth('Arch Amulet')
    }

    if (ARCH_VERTED && ARCH_INVERTED) {
      addFeaturesBoth('Six Pillars')
    } else if (ARCH_INVERTED) {
      addFeaturesBoth('Blood Diamonds')
    } else if (ARCH_VERTED) {
      addFeaturesBoth('Three Jewels')
    }
  }


  if (BACKGROUND_TYPE === 'Sacred Geometry') {
    const cross = (TRI_CROSS1 || TRI_CROSS2)
    const circle = (TRI_C1 || TRI_C2)
    const triangle = (TRI_T1 || TRI_T2)

    if (TRI_CROSS1 && TRI_CROSS2) {
      addFeaturesBoth('Gilded Holy Cross')
    } else if (TRI_CROSS1) {
      addFeaturesBoth('Holy Cross')
    } else if (TRI_CROSS2) {
      addFeaturesBoth('Gilded Cross')
    }

    if (TRI_C1 && TRI_C2) {
      addFeaturesBoth('Gilded Holy Token')
    } else if (TRI_C1) {
      addFeaturesBoth('Holy Token')
    } else if (TRI_C2) {
      addFeaturesBoth('Gilded Token')
    }

    if (TRI_T1 && TRI_T2 && INVERTED_TRI) {
      addFeaturesBoth('Gilded Unholy Trinity')
    } else if (TRI_T1 && TRI_T2) {
      addFeaturesBoth('Gilded Holy Trinity')

    } else if (TRI_T1 && INVERTED_TRI) {
      addFeaturesBoth('Unholy Trinity')
    } else if (TRI_T1) {
      addFeaturesBoth('Holy Trinity')
    } else if (TRI_T2) {
      addFeaturesBoth('Gilded Trinity')
    }


    if (TRI_TE || TRI_CE) {
      addFeaturesBoth('Aura of Affluence')
    }
  }
}


setFeatures(tokenData.hash, features, featuresReduced)

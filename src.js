
///////// DEV FUNCTIONS
function genTokenData(projectNum) {
  let hash = '0x'
  for (let i = 0; i < 64; i++) {
      hash += Math.floor(Math.random() * 16).toString(16)
  }

  return {
    hash,
    tokenId: projectNum * 1000000 + Math.floor(Math.random() * 1000)
  }
}
let tokenData = genTokenData(99)

///////
///////
///////
///////
///////
///////
///////
///////


let elapsed = 0
let SCALE,
    PRIMARY_C,
    SECONDARY_C,

    PYRAMID_1,
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

    SHOW_ARC_CORNERS,
    ARC_E,
    ARC_S,
    ARC_DYN_E,
    ARC_DYN_S,
    ARC_E_ANIM,
    ARC_S_ANIM,
    ARC_DYN_E_ANIM,
    ARC_DYN_S_ANIM,
    ARC_SIZE_ADJ,
    ARC_W,
    ARC_SPACING,
    ARC_INVERTED,
    ARC_VERTED,
    ARC_DOUBLE_COEFF



const prb = (x) => rnd() < x
const btwn = (m, mx) => m + rnd() * (mx - m)
const sample = (a) => a[floor(a.length * rnd())]

let hshUsed = 0
function hshrnd(h) {
  const str = tokenData.hash.slice(2 + hshUsed, 2 + hshUsed + h)
  const num = parseInt(str, 16)
  hshUsed += h
  return num / (16**h)
}
const hshprb = (h, p) => hshrnd(h) < p

function setColors() {
  const seed = hshrnd(2)
  const pDeg = floor(hshrnd(3) * 360)
  const sDeg = floor(hshrnd(3) * 360)

  // matte 49%
  if (seed < 0.49) {
    PRIMARY_C = color(`hsb(${pDeg},18.18%,73.33%)`)
    SECONDARY_C = color(`hsb(${sDeg},100%,26.67%)`)

  // neon 16%
  }  else if (seed < 0.65) {
    PRIMARY_C = color(`hsb(${pDeg},100%,100%)`)
    SECONDARY_C = color('#000')

  // neon dark 16%
  }  else if (seed < 0.81) {
    PRIMARY_C = color('#000')
    SECONDARY_C = color(`hsb(${sDeg},100%,100%)`)

  // bright 16%
  }  else if (seed < 0.97) {
    PRIMARY_C = color(`hsb(${pDeg},100%,100%)`)
    SECONDARY_C = color(`hsb(${(180 + pDeg) % 360},100%,100%)`)

  // b&w 2%
  } else if (seed < 0.99) {
    PRIMARY_C = color('#000')
    SECONDARY_C = color('#fff')

  // w&b 1%
  } else {
    PRIMARY_C = color('#fff')
    SECONDARY_C = color('#000')
  }
}

function setPyramidStyle() {
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
}

function setBackground() {
  const bgSeed = hshrnd(2)

  if (bgSeed < 0.2) {
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
    TRI_N = floor(700/TRI_SPACING + rnd() * 12)
    INVERTED_TRI = hshprb(1, 0.3125)

  } else if (bgSeed < 0.9) {
    SHOW_ARC_CORNERS = true

    ARC_SIZE_ADJ = rnd() * 500 - 100

    const archSeed = hshrnd(2)
    if (archSeed < 0.6) ARC_VERTED = true
    else if (archSeed < 0.9) ARC_INVERTED = true
    else {
      ARC_VERTED = true
      ARC_INVERTED = true
    }

    ARC_W = btwn(1, 9)
    ARC_SPACING = ARC_W + rnd() * 5

    if (hshprb(1, 0.125)) ARC_DOUBLE_COEFF = rnd() * ARC_W

    ARC_E = hshprb(1, 0.2) ? 0 : rnd() * 720 - 360
    ARC_S = hshprb(1, 0.2) ? 0 : rnd() * 720 - 360
    const dynE = hshrnd(1)
    ARC_DYN_E =
      dynE < 0.5 ? 0 :
      dynE < 0.75 ? rnd() * 0.6 - 0.3 :
      rnd() * 160 - 80
    const dynS = hshrnd(1)
    ARC_DYN_S =
      dynS < 0.5 ? 0 :
      dynS < 0.75 ? rnd() * 0.6 - 0.3 :
      rnd() * 160 - 80


    if (hshprb(1, 0.1875)) ARC_DYN_S = ARC_DYN_E
    if (hshprb(2, 0.05)) ARC_E_ANIM = btwn(2, 20) * (hshprb(1, 0.5) ? 1 : -1)
    if (hshprb(2, 0.05)) ARC_S_ANIM = btwn(2, 20) * (hshprb(1, 0.5) ? 1 : -1)
    if (hshprb(2, 0.05)) ARC_DYN_E_ANIM = btwn(600, 6600) * (hshprb(1, 0.5) ? 1 : -1)
    if (hshprb(2, 0.05)) ARC_DYN_S_ANIM = btwn(600, 6600) * (hshprb(1, 0.5) ? 1 : -1)

  } else if (bgSeed < 0.99) {
    // column + wings
    COLUMN_W = 10 + rnd() * 40

    if (hshprb(1, 0.5)) {
      SHOW_COLUMN = true
      COLUMN_T = hshprb(1, 0.6875) ? btwn(110, 460) : btwn(530, 660)
    }

    if (hshprb(1, 0.125)) {
      SHOW_WINGS = true
      WING_W = max(COLUMN_W/2, 3)
    }

    if (hshprb(1, 0.125)) {
      TOP_BOTTOM_ANIMATION = true
      TOP_BOTTOM_MIN = btwn(390, 430)
      TOP_BOTTOM_MAX = TOP_BOTTOM_MIN + 40
      TOP_BOTTOM_W = max(COLUMN_W/2, 3)
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
  }
}

let audioRunning = false
let audio = null

function keyPressed() {
  if (keyCode !== 32) return
  if (!audioRunning && !audio) {
    audio = startAudio()
  }

  audio.forEach(a => audioRunning
    ? a.stop()
    : a.start()
  )
  audioRunning = !audioRunning
}


function mouseWheel(event) {
  SCALE -= (SCALE*event.delta/500)
}

function setup() {
  print('ALL HAIL CRYPTOGODKING')
  createCanvas(window.innerWidth, window.innerHeight)

  SCALE = min(width, height)/790
  setColors()
  document.body.style.backgroundColor = PRIMARY_C.toString()
  setPyramidStyle()
  setBackground()

  document.body.style.overflow = 'hidden'
  document.body.scroll = 'no'

  console.log(`
    *************
    ** HASH: ${tokenData.hash}
    ** SCALE: ${SCALE}
    *************

    ================= COLORS ================
    -- PRIMARY_C: ${PRIMARY_C}
    -- SECONDARY_C: ${SECONDARY_C}

    ================= PYRAMID ================
    -- PYRAMID_1: ${PYRAMID_1}
    -- PYRAMID_2: ${PYRAMID_2}
    -- PYRAMID_3: ${PYRAMID_3}
    -- PYRAMID_4: ${PYRAMID_4}
    -- PYRAMID_5: ${PYRAMID_5}
    -- ANIMATING_PUPIL: ${ANIMATING_PUPIL}
    -- PY_EYE: ${PY_EYE}
    -- PY_EYE_INVERSE: ${PY_EYE_INVERSE}
    -- PY_TOP_CIRCLE: ${PY_TOP_CIRCLE}
    -- PY_BOTTOM_CIRCLE: ${PY_BOTTOM_CIRCLE}
    -- PY_TRIANGLE: ${PY_TRIANGLE}
    -- PY_TRIANGLE_INVERSE: ${PY_TRIANGLE_INVERSE}
    -- PY_PUPIL: ${PY_PUPIL}

    ================= BACKGROUND ================

    ---------TRI PYRAMID ------
    SHOW_TRI: ${SHOW_TRI}
    -- TRI_T1: ${TRI_T1}
    -- TRI_T2: ${TRI_T2}
    -- TRI_C1: ${TRI_C1}
    -- TRI_C2: ${TRI_C2}
    -- TRI_TE: ${TRI_TE}
    -- TRI_CE: ${TRI_CE}
    -- TRI_CROSS1: ${TRI_CROSS1}
    -- TRI_CROSS2: ${TRI_CROSS2}
    -- TRI_N: ${TRI_N}
    -- TRI_W: ${TRI_W}
    -- TRI_SPACING: ${TRI_SPACING}

    --------- COLUMN ----------
    SHOW_COLUMN: ${SHOW_COLUMN}
    -- COLUMN_T: ${COLUMN_T}
    -- COLUMN_W: ${COLUMN_W}
    -- SHOW_WINGS: ${SHOW_WINGS}
    -- WING_W: ${WING_W}
    -- TOP_BOTTOM_ANIMATION: ${TOP_BOTTOM_ANIMATION}
    -- TOP_BOTTOM_MIN: ${TOP_BOTTOM_MIN}
    -- TOP_BOTTOM_MAX: ${TOP_BOTTOM_MAX}
    -- TOP_BOTTOM_W: ${TOP_BOTTOM_W}
    -- SIDES_T: ${SIDES_T}
    -- SIDES_PRIMARY: ${SIDES_PRIMARY}
    -- SIDES_SECONDARY: ${SIDES_SECONDARY}

    -----------ARCHES----------
    SHOW_ARC_CORNERS: ${SHOW_ARC_CORNERS}
    -- ARC_SIZE_ADJ: ${ARC_SIZE_ADJ}
    -- ARC_W: ${ARC_W}
    -- ARC_SPACING: ${ARC_SPACING}
    -- ARC_E (anim): ${ARC_E} ${ARC_E_ANIM}
    -- ARC_S (anim): ${ARC_S} ${ARC_S_ANIM}
    -- ARC_DYN_E (anim): ${ARC_DYN_E} ${ARC_DYN_E_ANIM}
    -- ARC_DYN_S (anim): ${ARC_DYN_S} ${ARC_DYN_S_ANIM}
    -- ARC_VERTED: ${ARC_VERTED}
    -- ARC_INVERTED: ${ARC_INVERTED}
    -- ARC_DOUBLE_COEFF: ${ARC_DOUBLE_COEFF}
  `)
}


function draw() {
  scale(SCALE)
  translate(width/(2*SCALE), height/(2*SCALE))

  const tBase = 250

  rectMode(CENTER)
  background(PRIMARY_C)

  if (SHOW_TRI) {
    drawTri(TRI_N, TRI_SPACING, TRI_W,
      {
        showC1: TRI_C1,
        showT1: TRI_T1,
        showC2: TRI_C2,
        showT2: TRI_T2,
        showCross1: TRI_CROSS1,
        showCross2: TRI_CROSS2,
        inverted: INVERTED_TRI,
      }
    )

    if (TRI_CE || TRI_TE) {
      drawEminatingShapeAnimation(
        {
          strokeW: 3,
          circle: TRI_CE,
          triangle: TRI_TE
        }
      )
    }
  }

  if (SHOW_ARC_CORNERS) {
    const params = {
      sAdj: ARC_S_ANIM ? elapsed / ARC_S_ANIM : ARC_S,
      eAdj: ARC_E_ANIM ? elapsed / ARC_E_ANIM : ARC_E,
      dynSAdj: ARC_DYN_S_ANIM ? elapsed / ARC_DYN_S_ANIM : ARC_DYN_S,
      dynEAdj: ARC_DYN_E_ANIM ? elapsed / ARC_DYN_E_ANIM : ARC_DYN_E,
      inverted: ARC_INVERTED,
      doubleCoeff: ARC_DOUBLE_COEFF,
      fade: ARC_S_ANIM || ARC_E_ANIM || ARC_DYN_S_ANIM || ARC_DYN_E_ANIM
    }
    if (ARC_VERTED) drawTriangleCornerArcs(tBase + ARC_SIZE_ADJ, ARC_SPACING, ARC_W, {...params, inverted: false})
    if (ARC_INVERTED) drawTriangleCornerArcs(tBase + ARC_SIZE_ADJ, ARC_SPACING, ARC_W, {...params, inverted: true})
  }

  if (SHOW_COLUMN) {
    drawDoubleEcho(COLUMN_T, SECONDARY_C, PRIMARY_C, COLUMN_W, COLUMN_W/10)
  }
  if (SHOW_WINGS) {
    drawWingAnimation(WING_W)
  }

  if (TOP_BOTTOM_ANIMATION) {
    drawTopBottomAnimation(TOP_BOTTOM_MIN, TOP_BOTTOM_MAX, TOP_BOTTOM_W)
  }

  if (SIDES_PRIMARY) {
    drawEchoPattern(SIDES_T, SECONDARY_C, 7)
  }
  if (SIDES_SECONDARY) {
    drawEchoPattern(SIDES_T, PRIMARY_C, 1)
  }


  const noAnimations = (!ARC_E_ANIM && !ARC_S_ANIM && !ARC_DYN_E_ANIM && !ARC_DYN_S_ANIM)

  const trueArchS = (ARC_S + 360) % 360
  const trueArchE = (ARC_E + 420) % 360
  const archDiff =  trueArchE - trueArchS
  const anglesCovering = archDiff > 0
  ? (trueArchS < 45) && (trueArchE < 15 || trueArchE > trueArchS + 20)
  : (trueArchE > 45) && (trueArchS < trueArchE - 20) || trueArchS > trueArchE

  const flipPrimary = (
    !PYRAMID_1 // flipPrimary colors if only pys are bg color
    && !PYRAMID_3
    && !PYRAMID_5
    && !SHOW_TRI  // and there's not tri background
    && ( // and arcs don't help out...
      !SHOW_ARC_CORNERS // either no arcs at all
      || (noAnimations && !anglesCovering) // or the angles don't match up
    )
  )
  const flipSecondary = (
    !PYRAMID_2
    && !PYRAMID_4
    && SHOW_ARC_CORNERS
    && noAnimations
    && anglesCovering
    && ARC_W > 2.5
  )

  const pyParams = {
    topCircle: PY_TOP_CIRCLE,
    bottomCircle: PY_BOTTOM_CIRCLE,
    eye: PY_EYE,
    inverseEye: PY_EYE_INVERSE,
    triangle: PY_TRIANGLE,
    invertedTriangle: PY_TRIANGLE_INVERSE,
    pupil: PY_PUPIL
  }
  if (PYRAMID_1) drawPyramid(tBase, flipSecondary ? PRIMARY_C : SECONDARY_C, 45, pyParams)
  if (PYRAMID_2) drawPyramid(tBase, flipPrimary ? SECONDARY_C : PRIMARY_C, 35, pyParams)
  if (PYRAMID_3) drawPyramid(tBase, flipSecondary ? PRIMARY_C : SECONDARY_C, 25, pyParams)
  if (PYRAMID_4) drawPyramid(tBase, flipPrimary ? SECONDARY_C : PRIMARY_C, 15, pyParams)
  if (PYRAMID_5) drawPyramid(tBase, flipSecondary ? PRIMARY_C : SECONDARY_C, 5, pyParams)



  //////// FOREGROUND ANIMATIONS
  if (ANIMATING_PUPIL) {
    drawEyeAnimation()
  }

  elapsed++
}

///// BACKGROUNDS
function drawTri(
  n,
  spacing,
  weight,
  {showT1, showT2, showC1, showC2, showCross1, showCross2, inverted} = {}
) {
  noFill()

  stroke(SECONDARY_C)
  strokeWeight(weight * 4)
  for (let i = 1; i < n; i++) {
    if (showC1) drawCircle(spacing * i)
    if (showCross1) drawCross((i-1)*weight)
    if (showT1 && inverted) drawInvertedTriangle(spacing * i)
    else if (showT1 && !inverted) drawTriangle(spacing * i)
  }

  stroke(PRIMARY_C)
  strokeWeight(weight)
  for (let i = 1; i < n; i++) {
    if (showC2) drawCircle(spacing * i)
    if (i%2 && showCross2) drawCross((i-1)*weight)
    if (showT2 && inverted) drawInvertedTriangle(spacing * i)
    else if (showT2 && !inverted) drawTriangle(spacing * i)
  }
}


function drawEminatingShapeAnimation(
  {
    circle = true,
    triangle = true,
    n = 30,
    maxFrames = 1200,
    minFrames = 600,
    strokeW=10
  } = {}
) {
  const start = -65
  const t = easeInOut(minFrames, maxFrames, 0.25)

  noFill()
  stroke(PRIMARY_C)
  strokeWeight(strokeW)
  for (let i=0; i < n; i++) {
    const size = max((i * start) + t + i, 0)
    if (triangle) drawTriangle(size)
    if (circle) drawCircle(size)
  }
  stroke(SECONDARY_C)
  strokeWeight(strokeW/3)
  for (let i=0; i < n; i++) {
    const size = max((i * start) + t + i, 0)
    if (triangle) drawTriangle(size)
    if (circle) drawCircle(size)
  }
}

function drawTriangleCornerArcs(
  tBase,
  spacing,
  strokeW,
  {
    sAdj = 0,
    eAdj=0,
    dynSAdj = 0,
    dynEAdj = 0,
    inverted = false,
    doubleCoeff = 0,
    fade=false
  } = {}
) {

  const { tHeight, heightOfCenter } = triStats(tBase)

  const x1 =  -tBase / 2
  const y1 = inverted
    ? -heightOfCenter
    : heightOfCenter
  const x2 = tBase / 2
  const y2 = inverted
    ? -heightOfCenter
    : heightOfCenter
  const x3 = 0
  const y3 = inverted
    ? (tHeight - heightOfCenter)
    : -1 * (tHeight - heightOfCenter)

  const s1 = inverted ? radians(0 + sAdj) : radians(300 + sAdj)
  const e1 = inverted ? radians(60 + eAdj) : radians(360 + eAdj)
  const s2 = inverted ? radians(120 + sAdj) : radians(180 + sAdj)
  const e2 = inverted ? radians(180 + eAdj) : radians(240 + eAdj)
  const s3 = inverted ? radians(240 + sAdj) : radians(60 + sAdj)
  const e3 = inverted ? radians(300 + eAdj) : radians(120 + eAdj)
  noFill()
  strokeWeight(strokeW)
  stroke(SECONDARY_C)

  for (let i = 0; i < tBase/spacing; i++) {
    let e = i * dynEAdj
    let s = i * dynSAdj
    let r = spacing * i
    drawCornerArc(x1, y1, r , s1 - s, e1 - e, tHeight, tBase, fade)
    drawCornerArc(x2, y2, r , s2 - s, e2 - e, tHeight, tBase, fade)
    drawCornerArc(x3, y3, r , s3 - s, e3 - e, tHeight, tBase, fade)
  }

  if (doubleCoeff) {
    strokeWeight(doubleCoeff)
    stroke(PRIMARY_C)
    for (let i = 0; i < tBase/spacing; i++) {
      let e = i * dynEAdj
      let s = i * dynSAdj
      let r = spacing * i
      drawCornerArc(x1, y1, r - doubleCoeff, s1 - s, e1 - e, tHeight, tBase, fade)
      drawCornerArc(x2, y2, r - doubleCoeff, s2 - s, e2 - e, tHeight, tBase, fade)
      drawCornerArc(x3, y3, r - doubleCoeff, s3 - s, e3 - e, tHeight, tBase, fade)
    }
  }
}

const normalize = deg => ((deg % TWO_PI) + TWO_PI) % TWO_PI
function drawCornerArc(x, y, r, start, end, maxR, base, fade=false) {
  const d = r * 2
  const f = abs(normalize(start) - normalize(end))
  const doFade = fade && (f < 0.1 || f > TWO_PI - 0.1)

  if (doFade) {
    push()
    const c = color(_renderer._cachedStrokeStyle)
    c.setAlpha(f * 2550)
    stroke(c)
  }

  // if (r <= maxR || !contain) {
  arc(x, y, d, d, start, end)
  // } else {
  //   const oAngle = PI/3
  //   const beta = asin(base * sin(oAngle) / r)
  //   const angle = PI - PI/3 - beta

  //   arc(x, y, diameter, diameter, start, end - angle)
  //   arc(x, y, diameter, diameter, start + angle, end)
  // }

  if (doFade) pop()
}

function drawDoubleEcho(
  t,
  stroke2C,
  stroke1C,
  stroke1W = 3,
  stroke2W = 1
) {
  drawEchoPattern(t, stroke1C, stroke1W)
  drawEchoPattern(t, stroke2C, stroke2W)
}

function drawEchoPattern(
  t,
  strokeC,
  strokeW,
  n = 25
) {
  strokeWeight(strokeW)
  stroke(strokeC)
  noFill()

  const w =
    tan(radians(30)) *
    t *
    (tan(radians(60)) - tan(radians(30)))

  for (let i = 0; i < n; i++) {
    const deg = t + 2 * i
    const size = w / sin(radians(deg / 2))
    const yOffset = (tan(radians(deg / 2)) * w) / 2

    arc(
      0,
      yOffset,
      size,
      size,
      radians(180 + deg / 2),
      radians(360 - deg / 2),
      OPEN
    )

    arc(
      0,
      -yOffset,
      size,
      size,
      radians(0 + deg / 2),
      radians(180 - deg / 2),
      OPEN
    )
  }
}

function drawTopBottomAnimation(min, max, weight) {
  const t = easeInOut(min, max, 0.05)
  drawDoubleEcho(t, PRIMARY_C, SECONDARY_C, weight, weight/3)
}

function drawWingAnimation(weight) {
  const max = 265
  const min = 220

  const t = easeInOut(min, max, 0.15)
  drawEchoPattern(t, SECONDARY_C, weight)
  drawEchoPattern(t, PRIMARY_C, weight/3)
}


//////// FOREGROUND ANIMATIONS

function drawEyeAnimation() {
  const max = 165
  const ms = elapsed % max
  const t = ms < max / 2 ? ms : max - ms
  drawDoubleEcho(t, SECONDARY_C, PRIMARY_C)
  fill(PRIMARY_C)
  drawCircle(30)
}

//////// PYRAMID
function drawPyramid(tBase, strokeC, strokeW = 45, {
  topCircle = false,
  bottomCircle = false,
  eye = false,
  inverseEye = false,
  triangle = false,
  invertedTriangle = false,
  pupil = false
} = {}) {
  noFill()
  strokeWeight(strokeW)
  stroke(strokeC)

  if (triangle) drawTriangle(tBase)
  if (invertedTriangle) drawInvertedTriangle(tBase)
  if (eye) drawEye(tBase, 130)
  if (inverseEye) drawEye(tBase, 230)
  if (pupil) point(0, 0)
  if (topCircle) drawEyeCircle(tBase, 1)
  if (bottomCircle) drawEyeCircle(tBase, 0)

}



//////// SHAPES

function drawCross(s) {
  let x = max(width, height) * 2
  line(-x, s, x, s)
  line(-x, -s, x, -s)
  line(s, -x, s, x)
  line(-s, -x, -s, x)
}


function drawTriangle(tBase) {
  const { tHeight, heightOfCenter } = triStats(tBase)

  const x1 = -tBase / 2
  const y1 = heightOfCenter
  const x2 = tBase / 2
  const y2 = heightOfCenter
  const x3 = 0
  const y3 = -1 * (tHeight - heightOfCenter)

  triangle(x1, y1, x2, y2, x3, y3)
}

function drawInvertedTriangle(tBase) {
  const { tHeight, heightOfCenter } = triStats(tBase)
  const top = -heightOfCenter
  const x1 = -tBase / 2
  const y1 = top
  const x2 = tBase / 2
  const y2 = top
  const x3 = 0
  const y3 = top + tHeight

  triangle(x1, y1, x2, y2, x3, y3)
}

function drawEyeCircle(tBase, position = 1) {
  const { centerW } = triStats(tBase)
  const size = centerW / sin(radians(65))
  const yOffset = cos(radians((position === 1 ? 235 : 124)/ 2)) * (centerW / 2)
  circle(0, yOffset, size)
}

function drawEye(tBase, deg, scale = 1) {
  const { centerW } = triStats(tBase)

  const size = (centerW * scale) / sin(radians(deg / 2))
  const yOffset = cos(radians(deg / 2)) * (size / 2)

  arc(
    0,
    yOffset,
    size,
    size,
    radians(270 - deg / 2),
    radians(270 + deg / 2),
    OPEN
  )

  arc(
    0,
    -yOffset,
    size,
    size,
    radians(90 - deg / 2),
    radians(90 + deg / 2),
    OPEN
  )
}

function drawCircle(diameter) {
  circle(0, 0, 2 * tan(radians(30)) * diameter)
}

function triStats(tBase) {
  const tHeight = sin(radians(60)) * tBase
  const heightOfCenter = (tan(radians(30)) * tBase) / 2
  const heightDiff = tHeight - heightOfCenter
  const centerW = tan(radians(30)) * heightDiff * 2

  return {
    tHeight,
    heightOfCenter,
    heightDiff,
    centerW,
  }
}

//////// AUDIO
function startAudio() {
  const base = btwn(150, 250)
  const baseAdj = btwn(1, 10)
  const ratio = sample([1.125, 1.25, 1.3333333, 1.5])

  const sec = base * ratio
  const secAdj = btwn(1, 10)

  return [
    createAudioSource(base),
    createAudioSource(base + baseAdj),
    createAudioSource(sec),
    createAudioSource(sec + secAdj)
  ]
}

function createAudioSource(freq) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)()

  const src = ctx.createOscillator()
  const gain = ctx.createGain()

  src.connect(gain)
  gain.connect(ctx.destination)

  src.frequency.value = freq

  src.type = 'sine'
  gain.gain.value = 0
  src.start()

  return {
    start() {
      gain.gain.setTargetAtTime(0.065, ctx.currentTime, 0.5);
    },
    stop() {
      gain.gain.setTargetAtTime(0.00, ctx.currentTime, 0.5);
    }
  }

}


////// UTIL
function easeInOut(min, max, speed = 1) {
  const diff = max - min
  const perc = (elapsed * speed % diff) / diff
  const adj = (sin(perc * TWO_PI) + 1) / 2
  return (max - min) * adj + min
}

let seed = parseInt(tokenData.hash.slice(0, 16), 16)
function rnd() {
   seed ^= seed << 13
   seed ^= seed >> 17
   seed ^= seed << 5
   return (((seed < 0) ? ~seed + 1 : seed) % 1000) / 1000
}

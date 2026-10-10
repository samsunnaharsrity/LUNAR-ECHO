import { LearningModule } from '../types';

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'module-1',
    title: 'The Apollo 11 Retroreflector',
    description: 'Discover why Neil Armstrong and Buzz Aldrin placed a 100-corner-cube optical array in Mare Tranquillitatis and why it still operates today without batteries.',
    estimatedTime: '8 min read & interactive',
    objectives: [
      'Identify the physical components of the Apollo 11 Lunar Laser Ranging Retroreflector (LRRR).',
      'Explain the crucial difference between passive optical reflection and active radio transmission.',
      'Understand how 100 fused-silica corner cubes direct laser pulses back to Earth regardless of incident angle.'
    ],
    contentSections: [
      {
        heading: 'An Instrument Left Behind in Mare Tranquillitatis',
        body: [
          'On July 21, 1969, during their historic lunar surface extravehicular activity (EVA), Apollo 11 astronauts Neil Armstrong and Buzz Aldrin set up the Early Apollo Scientific Experiments Package (EASEP). Among the gear was a compact, 77-pound (35 kg) pallet: the Lunar Laser Ranging Retroreflector (LRRR).',
          'While other instruments such as the Passive Seismic Experiment stopped transmitting once their batteries or solar power cells degraded, the retroreflector contained no electronics, no power supply, and no moving parts. It was designed purely as a high-precision optical mirror array.'
        ],
        keyTakeaway: 'The Apollo 11 retroreflector requires zero electrical power. It is an entirely passive optical target that remains permanently ready to reflect light.'
      },
      {
        heading: 'Why Regular Flat Mirrors Would Fail',
        body: [
          'If astronauts had placed an ordinary flat bathroom mirror on the Moon, the experiment would have been impossible. A flat mirror obeys the law of specular reflection (angle of incidence equals angle of reflection). A laser beamed from Earth at an angle of even 0.001 degrees off normal would bounce away into deep space, missing Earth completely.',
          'Instead, the array consists of 100 optical corner cubes (prisms cut from solid Suprasil fused silica). In a corner cube, three flat reflective surfaces meet at precise 90-degree right angles, forming the corner of an interior cube. By geometric optical law, any ray that enters bounces off all three faces and exits exactly parallel to its incoming vector.'
        ],
        keyTakeaway: 'The three perpendicular faces ensure incoming photons are reflected antiparallel (back along their original path) directly to the transmitting telescope on Earth.'
      }
    ],
    activity: {
      type: 'calculation',
      title: 'Corner-Cube Reflection Vector Check',
      instructions: 'Examine how vector reflection works: If a laser photon arrives at velocity vector [Vx, Vy, Vz], each 90° reflection inverts one component. After 3 reflections, the exit vector is [-Vx, -Vy, -Vz].',
      initialData: { vx: 120, vy: -250, vz: 85 }
    },
    reviewQuestions: [
      {
        question: 'Why does the Apollo 11 retroreflector still function more than 50 years after deployment?',
        options: [
          'It has a nuclear radioisotope thermoelectric generator (RTG).',
          'It is a completely passive optical array with no batteries or electronics that can expire.',
          'Astronauts periodically service it with remote robotic rovers.',
          'It recharges its lithium capacitors using solar panels.'
        ],
        correctIndex: 1,
        feedback: 'Correct! The retroreflector has no electronics, batteries, or moving parts. As long as the quartz prisms remain intact and relatively clear of dust, they continue reflecting laser light indefinitely.'
      },
      {
        question: 'What optical geometry makes a corner cube retroreflector different from a standard mirror?',
        options: [
          'It uses curved magnifying lenses to focus sunlight.',
          'It contains three mutually perpendicular (90°) reflective faces that bounce light back parallel to its arrival direction.',
          'It rotates continuously to track the Earth with gyroscopes.',
          'It absorbs laser light and re-emits it at radio frequencies.'
        ],
        correctIndex: 1,
        feedback: 'Exactly right! Three mutually perpendicular reflective faces ensure that the photon exits exactly 180° reversed (antiparallel) relative to its entry angle.'
      },
      {
        question: 'How many corner-cube prisms are mounted in the Apollo 11 array?',
        options: ['100 prisms', '12 prisms', '300 prisms', '1 single giant crystal'],
        correctIndex: 0,
        feedback: 'Correct! The Apollo 11 array features 100 circular fused-silica corner cubes in a 10x10 aluminum pallet.'
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Light and Distance: The Speed of Light Formula',
    description: 'Master the fundamental physics of laser ranging: how measuring round-trip light travel time with picosecond accuracy allows millimeter-level lunar distance determination.',
    estimatedTime: '10 min read & calculation lab',
    objectives: [
      'Learn the precise speed of light constant in vacuum: c = 299,792.458 km/s.',
      'Apply the two-way ranging equation: d = (c × Δt) / 2.',
      'Differentiate between round-trip transit time (~2.56 seconds) and one-way travel time (~1.28 seconds).'
    ],
    contentSections: [
      {
        heading: 'The Ranging Principle: Time as Distance',
        body: [
          'Lunar Laser Ranging does not measure distance with a physical tape measure or radar wave envelope. Instead, it measures elapsed time (time-of-flight, Δt) of ultra-short laser pulses with extreme precision.',
          'Because the pulse travels from Earth to the Moon and then back to Earth, the total distance covered by the light is twice the Earth-Moon distance: 2 × d.',
          'Using the internationally defined constant for the speed of light in vacuum, c = 299,792.458 km/s (or 299,792,458 m/s), the distance is simply: d = (c × Δt) / 2.'
        ],
        keyTakeaway: 'Distance is derived from round-trip time: d = (c × Δt) / 2. Every 1 nanosecond of timing error corresponds to approximately 15 centimeters of distance error.'
      },
      {
        heading: 'The Challenge of Scale: Photon Budget',
        body: [
          'A modern ranging observatory (like APOLLO at Apache Point) transmits approximately 10^17 photons (100 quadrillion photons) in each 100-picosecond pulse.',
          'As the beam travels 384,400 km through Earth atmosphere and space, diffraction causes it to spread out. By the time it strikes the Moon, the laser beam is roughly 2 kilometers wide!',
          'The Apollo 11 retroreflector has an area of only about 0.2 square meters. Only an infinitesimal fraction strikes the prisms. On the return trip, diffraction spreads the reflected beam to roughly 15 kilometers wide on Earth. As a result, typically only 1 to 3 photons return to the telescope per laser shot!'
        ],
        keyTakeaway: 'Lunar Laser Ranging is a single-photon counting science. Over 10^17 photons leave Earth; often only a single photon arrives back into the detector.'
      }
    ],
    activity: {
      type: 'calculation',
      title: 'Round-Trip Light Travel Time Solver',
      instructions: 'Calculate Δt for the Moon at average distance (384,400 km) and perigee (363,300 km).',
      initialData: { speedOfLight: 299792.458, avgDistKm: 384400, perigeeKm: 363300 }
    },
    reviewQuestions: [
      {
        question: 'What is the exact internationally accepted speed of light in vacuum?',
        options: ['300,000,000 km/s', '299,792.458 km/s', '150,000 km/s', '384,400 km/s'],
        correctIndex: 1,
        feedback: 'Correct! The speed of light c in vacuum is exactly defined as 299,792.458 km/s (299,792,458 m/s).'
      },
      {
        question: 'If the measured round-trip time Δt is 2.5644 seconds, why must we divide by 2 when calculating distance?',
        options: [
          'Because the Moon orbits Earth at half the orbital period.',
          'Because the laser beam travels to the Moon and back, covering twice the one-way distance.',
          'Because quantum mechanics dictates photon duality.',
          'Because atmospheric refraction doubles the effective distance.'
        ],
        correctIndex: 1,
        feedback: 'Correct! The laser light traverses the distance twice (outbound and return), so the one-way distance is (c × Δt) / 2.'
      },
      {
        question: 'Out of roughly 100 quadrillion (10^17) photons launched in a laser pulse, approximately how many photons return to the Earth telescope detector on average?',
        options: ['Millions of photons', 'Hundreds of thousands of photons', 'Around 1 to a few individual photons', 'Half of them'],
        correctIndex: 2,
        feedback: 'Correct! Due to $1/r^4$ double-divergence over ~768,000 km, only 1 or a few individual photons strike the detector per shot.'
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Scientific Data: Noise, Residuals & Normal Points',
    description: 'Learn how scientists transform raw, noisy photon arrival timestamps into millimeter-precision scientific datasets archived by NASA CDDIS and ILRS.',
    estimatedTime: '10 min read & investigation',
    objectives: [
      'Understand what a "Normal Point" is in ILRS laser ranging archives.',
      'Identify sources of measurement error: atmospheric delay, thermal expansion, tidal deformation.',
      'Differentiate between raw observations, normal points, and mathematical orbit models.'
    ],
    contentSections: [
      {
        heading: 'Why a Single Photon Is Not Enough',
        body: [
          'Detecting a single photon does not provide a definitive orbit measurement. Photons may hit during atmospheric turbulence, detector jitter can introduce picosecond timing variance, and thermal changes expand the telescope structure.',
          'Furthermore, random ambient lunar sunlight and background starlight can trigger the detector (background noise).',
          'To overcome this, observatories fire pulses at high repetition rates (e.g. 20 Hz to kilohertz) and record thousands of shots over a 5 to 15-minute window.'
        ],
        keyTakeaway: 'Scientists aggregate hundreds of photon returns over an observation window to filter out random background noise from true coherent laser returns.'
      },
      {
        heading: 'The Creation of Normal Points',
        body: [
          'A "Normal Point" is a compressed, statistically vetted representative observation. It combines raw photon events within a session, corrects for Earth atmospheric delay (tropospheric refraction), observatory tidal uplift, and relativistic time dilation.',
          'NASA’s Crustal Dynamics Data Information System (CDDIS) and the International Laser Ranging Service (ILRS) archive these normal points in standard formats (such as the Consolidated Range Data / CRD format).',
          'Modern normal points achieve range residuals below 15 picoseconds—equivalent to measuring the distance between Earth and Moon with sub-millimeter precision!'
        ],
        keyTakeaway: 'ILRS normal points provide researchers globally with standardized, peer-reviewed data without forcing everyone to process raw detector pulses.'
      }
    ],
    activity: {
      type: 'investigation',
      title: 'Residual Distribution Filter',
      instructions: 'Explore how photon arrival residuals cluster around zero (true reflection) while background noise is randomly distributed.',
      initialData: { totalPhotons: 200, signalCount: 160, noiseCount: 40 }
    },
    reviewQuestions: [
      {
        question: 'What is an ILRS "Normal Point"?',
        options: [
          'A point on the Moon where astronauts landed.',
          'A statistically aggregated and calibrated summary observation derived from multiple photon returns during a session.',
          'The average temperature of the retroreflector.',
          'A theoretical model with no real measurements.'
        ],
        correctIndex: 1,
        feedback: 'Correct! A normal point combines and corrects multiple raw photon arrival times into an accurate, calibrated data point.'
      },
      {
        question: 'Which international organization coordinates lunar and satellite laser ranging archives worldwide?',
        options: [
          'ILRS (International Laser Ranging Service) and NASA CDDIS',
          'International Maritime Organization',
          'World Meteorological Organization',
          'United Nations Postal Union'
        ],
        correctIndex: 0,
        feedback: 'Correct! The ILRS and NASA CDDIS maintain the global archives and operational standards for satellite and lunar laser ranging.'
      },
      {
        question: 'What happens to the laser pulse as it passes through Earth’s atmosphere?',
        options: [
          'It travels faster than light.',
          'It experiences a slight delay and refraction (bending) that must be mathematically corrected using barometric pressure and humidity readings.',
          'It changes from green light to microwave radio waves.',
          'Nothing, vacuum rules apply on Earth.'
        ],
        correctIndex: 1,
        feedback: 'Correct! Atmospheric refraction slows light down slightly. Observatories log barometric pressure, temperature, and humidity to apply precise tropospheric corrections.'
      }
    ]
  },
  {
    id: 'module-4',
    title: 'From Observation to Discovery: Lunar Recession & Einstein',
    description: 'Explore the monumental scientific discoveries enabled by 50+ years of LLR: testing Einstein’s Equivalence Principle, measuring lunar recession, and probing the Moon’s molten core.',
    estimatedTime: '9 min read',
    objectives: [
      'Learn why the Moon is receding from Earth at 3.8 cm per year due to tidal friction.',
      'Understand how LLR provides the most stringent test of the Equivalence Principle (General Relativity).',
      'Discover how lunar physical librations proved the existence of a liquid lunar core.'
    ],
    contentSections: [
      {
        heading: 'Discovery 1: The Moon Is Drifting Away (3.8 cm / year)',
        body: [
          'Thanks to continuous LLR measurements spanning over five decades, scientists proved that the Moon’s average semi-major axis is expanding by approximately 3.8 centimeters (1.5 inches) every year.',
          'Why? Earth’s oceans bulge due to the Moon’s gravitational pull. Because Earth rotates faster (once every 24 hours) than the Moon orbits (once every 27.3 days), the tidal bulge leads the Moon slightly, creating a gravitational tug that transfers rotational energy from Earth into the Moon’s orbit.',
          'This slows Earth’s rotation (lengthening the day by ~1.7 milliseconds per century) and pushes the Moon into a slightly higher orbit.'
        ],
        keyTakeaway: 'LLR provided the first direct, high-precision measurement of lunar tidal recession: 3.8 cm/year.'
      },
      {
        heading: 'Discovery 2: Testing Einstein’s Equivalence Principle',
        body: [
          'Einstein’s Equivalence Principle (the cornerstone of General Relativity) states that all objects fall with the exact same acceleration in a gravitational field, regardless of their composition or gravitational self-energy.',
          'Earth has a massive iron core with significant gravitational binding energy, while the Moon has a much smaller core. If the Strong Equivalence Principle were violated, the Sun’s gravity would pull Earth and Moon with slightly different accelerations, polarizing the lunar orbit toward the Sun.',
          'LLR data confirms that Earth and Moon fall toward the Sun at the exact same rate within an astonishing uncertainty of parts in 10^13, verifying General Relativity with unprecedented accuracy.'
        ],
        keyTakeaway: 'LLR provides one of the cleanest, most stringent experimental tests of Einstein’s General Relativity in the Solar System.'
      }
    ],
    activity: {
      type: 'calculation',
      title: 'Lunar Recession Extrapolator',
      instructions: 'Calculate how much further the Moon is today compared to the Apollo 11 landing in July 1969.',
      initialData: { rateCmPerYear: 3.82, yearsPassed: 57 }
    },
    reviewQuestions: [
      {
        question: 'At what rate is the Moon spiraling away from Earth?',
        options: ['3.8 cm per year', '3.8 meters per day', 'Zero — the orbit is completely stationary', '1 kilometer per century'],
        correctIndex: 0,
        feedback: 'Correct! Tidal friction transfers angular momentum, causing the Moon to recede by approximately 3.8 cm per year.'
      },
      {
        question: 'How did LLR test Einstein’s Strong Equivalence Principle?',
        options: [
          'By verifying whether Earth and Moon accelerate toward the Sun at the identical rate despite differences in mass and gravitational binding energy.',
          'By measuring the speed of sound in space.',
          'By calculating the temperature of Apollo 11 footprints.',
          'By showing that light bends backwards in vacuum.'
        ],
        correctIndex: 0,
        feedback: 'Correct! Both bodies fall in the Sun’s gravitational field; LLR measures their relative orbit with sub-centimeter accuracy, finding zero deviation from General Relativity.'
      },
      {
        question: 'What internal lunar feature was confirmed by analyzing the Moon’s rotational wobble (librations) with LLR data?',
        options: [
          'A hollow hollow chamber filled with water.',
          'A partially molten or fluid core creating energy dissipation at the core-mantle boundary.',
          'An active thermonuclear reactor.',
          'Giant subterranean ice caverns.'
        ],
        correctIndex: 1,
        feedback: 'Correct! Variations in lunar rotation (physical librations) measured via LLR revealed tidal dissipation that confirmed a fluid or partially molten core.'
      }
    ]
  }
];

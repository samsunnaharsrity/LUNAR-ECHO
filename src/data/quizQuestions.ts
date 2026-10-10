import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'In what year did Apollo 11 astronauts deploy the first Lunar Laser Ranging Retroreflector on the Moon?',
    options: ['1957', '1969', '1975', '1982'],
    correctAnswer: 1,
    category: 'Apollo History',
    explanation: 'Apollo 11 astronauts Neil Armstrong and Buzz Aldrin deployed the Lunar Laser Ranging Retroreflector in Mare Tranquillitatis on July 21, 1969.'
  },
  {
    id: 2,
    question: 'What is the primary optical component of the Apollo 11 retroreflector array?',
    options: [
      'A parabolic curved magnifying mirror',
      '100 fused-silica corner-cube prisms arranged in a 10×10 pallet',
      'A digital electronic laser repeater',
      'A radio beacon that broadcasts satellite telemetry'
    ],
    correctAnswer: 1,
    category: 'Instrument Design',
    explanation: 'The array houses 100 high-purity fused-silica (Suprasil) corner-cube prisms, each designed with 3 mutually perpendicular faces.'
  },
  {
    id: 3,
    question: 'Why is the Apollo 11 retroreflector classified as a "passive" instrument rather than an "active" one?',
    options: [
      'It has run out of nuclear fuel.',
      'It requires no internal power supply, batteries, or transmitter; it merely reflects photons directed at it from Earth.',
      'It only takes photographs when illuminated by sunlight.',
      'It requires remote commands from ground control to turn on.'
    ],
    correctAnswer: 1,
    category: 'Instrument Physics',
    explanation: 'Passive instruments produce no signal on their own and require no electrical power. They reflect incident energy according to their physical and optical design.'
  },
  {
    id: 4,
    question: 'What is the exact internationally accepted speed of light in vacuum (c)?',
    options: ['300,000,000 km/s', '299,792.458 km/s', '186,000 km/s', '248,120.500 km/s'],
    correctAnswer: 1,
    category: 'Fundamental Physics',
    explanation: 'By international SI definition since 1983, the speed of light c in vacuum is exactly 299,792.458 km/s (or 299,792,458 m/s).'
  },
  {
    id: 5,
    question: 'If the average Earth–Moon distance is roughly 384,400 km, what is the approximate round-trip light travel time?',
    options: ['1.28 seconds', '2.56 seconds', '5.12 seconds', '8.33 minutes'],
    correctAnswer: 1,
    category: 'Ranging Calculations',
    explanation: 'Because light must travel to the Moon and return (2 × 384,400 km ≈ 768,800 km), round-trip time is (2 × d) / c ≈ 2.564 seconds. (1.28 s is only the one-way transit time).'
  },
  {
    id: 6,
    question: 'What is the key scientific distinction between an observational measurement and a computer simulation?',
    options: [
      'Simulations are always more accurate than observations.',
      'An observation represents empirical data gathered by real physical detectors measuring the real world, while a simulation is a mathematical model based on assumed rules.',
      'Observations and simulations are identical in scientific status.',
      'Observations only occur in space, whereas simulations occur on Earth.'
    ],
    correctAnswer: 1,
    category: 'Scientific Methodology',
    explanation: 'Observations represent empirical physical reality with associated measurement uncertainties. Simulations are idealized calculations useful for education and hypothesis testing.'
  },
  {
    id: 7,
    question: 'What role do NASA’s CDDIS and the ILRS play in lunar laser ranging?',
    options: [
      'They build commercial rocket launchpads for private tourism.',
      'They archive, standardize, and distribute global satellite and lunar laser ranging normal points and ephemerides to researchers worldwide.',
      'They maintain military defense satellites.',
      'They broadcast commercial radio programs.'
    ],
    correctAnswer: 1,
    category: 'Data Provenance',
    explanation: 'The International Laser Ranging Service (ILRS) and NASA’s Crustal Dynamics Data Information System (CDDIS) serve as the permanent, open scientific repositories for laser ranging data.'
  },
  {
    id: 8,
    question: 'When analyzing raw laser returns, what is an ILRS "Normal Point"?',
    options: [
      'The exact point on Earth where the laser was manufactured.',
      'A statistically vetted, calibrated summary record derived from multiple photon arrival times within an observation session, corrected for atmospheric and instrumental factors.',
      'A measurement that had zero uncertainty.',
      'An uncalibrated single photon detection.'
    ],
    correctAnswer: 1,
    category: 'Data Analysis',
    explanation: 'Normal points combine dozens or hundreds of photon timestamps from a single session, correcting for tropospheric delay, system calibration, and clock drift to maximize signal-to-noise ratio.'
  },
  {
    id: 9,
    question: 'Which factor causes laser pulses to travel slightly slower than the vacuum speed of light near Earth?',
    options: [
      'The Moon’s magnetic field',
      'Atmospheric refraction and molecular delay in Earth’s troposphere',
      'Solar wind pressure',
      'The Earth’s orbital velocity'
    ],
    correctAnswer: 1,
    category: 'Measurement Physics',
    explanation: 'Earth’s atmosphere (troposphere) introduces an optical delay of roughly 2 meters (equivalent to ~13 nanoseconds round-trip) that observatories must calculate and subtract using local meteorological readings.'
  },
  {
    id: 10,
    question: 'What long-term planetary discovery has 50+ years of Lunar Laser Ranging directly measured?',
    options: [
      'The Moon is spiraling outward away from Earth at approximately 3.8 cm per year due to tidal energy dissipation.',
      'The Moon is falling into the Earth at 1 meter per year.',
      'The speed of light has slowed down by 50%.',
      'The Moon has stopped rotating completely.'
    ],
    correctAnswer: 0,
    category: 'Scientific Discoveries',
    explanation: 'Tidal friction between Earth’s oceans and the Moon transfers angular momentum from Earth’s rotation into the lunar orbit, expanding the Moon’s semi-major axis by 3.8 cm per year.'
  }
];

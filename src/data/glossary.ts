import { GlossaryTerm } from '../types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Lunar Laser Ranging (LLR)',
    category: 'Astronomy',
    definition: 'The astronomical and geodetic technique of measuring the round-trip travel time of short laser pulses reflected back to Earth by retroreflector arrays left on the lunar surface.',
    relevanceToLLR: 'Provides the most precise measurements of Earth-Moon distance, lunar orbit evolution, and gravitational physics.',
    sourceCitation: 'ILRS Lunar Laser Ranging Science Overview (NASA GSFC)'
  },
  {
    term: 'Retroreflector (Corner Cube)',
    category: 'Optics',
    definition: 'An optical device consisting of three mutually perpendicular flat reflective surfaces designed to reflect light back in the direction of the source, regardless of the angle of incidence.',
    relevanceToLLR: 'The optical principle enabling passive arrays deployed by Apollo 11, 14, 15, and Lunokhod missions to return laser photons directly to Earth.',
    sourceCitation: 'Faller et al. (1969) / NASA Science Documentation'
  },
  {
    term: 'Normal Point',
    category: 'Data Science',
    definition: 'A standardized, compressed data record generated from multiple raw photon return events within an observation session, corrected for instrument calibration and atmospheric propagation delays.',
    relevanceToLLR: 'The primary data product archived and distributed by NASA CDDIS and ILRS for celestial mechanics research.',
    sourceCitation: 'ILRS CRD / Normal Point Formatting Guidelines'
  },
  {
    term: 'Consolidated Range Data (CRD)',
    category: 'Data Science',
    definition: 'The official standard data exchange format adopted by the International Laser Ranging Service (ILRS) for satellite and lunar laser ranging normal points and full-rate measurements.',
    relevanceToLLR: 'Format used for all modern (post-2012) LLR archives at CDDIS and EDC.',
    sourceCitation: 'ILRS Format Working Group (Ricklefs et al., 2012)'
  },
  {
    term: 'Tidal Dissipation & Recession',
    category: 'Astronomy',
    definition: 'The friction-driven conversion of rotational kinetic energy into heat in Earth’s oceans caused by lunar gravitational tides, resulting in a transfer of angular momentum that expands the Moon’s orbit.',
    relevanceToLLR: 'LLR has determined the lunar recession rate to be 3.82 ± 0.07 cm/year over five continuous decades.',
    sourceCitation: 'Williams, Boggs, et al., J. Geophys. Res. (2014)'
  },
  {
    term: 'Equivalence Principle',
    category: 'Relativity',
    definition: 'The fundamental postulate of Einstein’s General Relativity stating that the gravitational mass and inertial mass of any body are strictly equivalent, meaning all bodies free-fall identically.',
    relevanceToLLR: 'LLR verifies that Earth and the Moon accelerate at identical rates toward the Sun to within (dη) < 10^-13.',
    sourceCitation: 'Nordtvedt Effect Tests / Murphy et al. (2012)'
  },
  {
    term: 'Libration',
    category: 'Astronomy',
    definition: 'The apparent and physical wobbling of the Moon that allows Earth observers to see up to 59% of its total surface over time. Physical librations are caused by gravitational torques on its non-spherical shape.',
    relevanceToLLR: 'LLR measurements of physical librations proved the existence of energy dissipation at a fluid core-mantle boundary inside the Moon.',
    sourceCitation: 'Williams et al., Science 294 (2001)'
  },
  {
    term: 'Single-Photon Detection',
    category: 'Instruments',
    definition: 'The capability of specialized optical detectors (such as Silicon Avalanche Photodiodes or SPADs) to register the arrival of a solitary photon packet with sub-nanosecond jitter.',
    relevanceToLLR: 'Essential for LLR because typical returns yield only 1 to 3 photons from an initial pulse of 10^17 photons.',
    sourceCitation: 'APOLLO Instrument Overview (Murphy et al., 2008)'
  },
  {
    term: 'Tropospheric Refraction Delay',
    category: 'Optics',
    definition: 'The optical path delay experienced by light passing through Earth’s atmospheric gas column due to an index of refraction slightly greater than 1.0 (approx. 1.00028 at sea level).',
    relevanceToLLR: 'Adds approximately 2 meters of equivalent path length at zenith (~13 ns round-trip) and must be modeled using local surface pressure, temperature, and relative humidity.',
    sourceCitation: 'Mendes & Pavlis Tropospheric Model (2004)'
  },
  {
    term: 'Perigee and Apogee',
    category: 'Astronomy',
    definition: 'The closest (perigee, ~363,104 km) and farthest (apogee, ~405,696 km) points in the Moon’s elliptical orbit around the Earth.',
    relevanceToLLR: 'Causes the round-trip light travel time to vary cyclically between approximately 2.42 seconds and 2.71 seconds throughout the 27.55-day anomalistic month.',
    sourceCitation: 'NASA Lunar Ephemeris DE440/DE441'
  }
];

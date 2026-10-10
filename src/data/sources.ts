export interface ScientificSource {
  id: string;
  organization: string;
  title: string;
  url: string;
  roleInProject: string;
  temporalCoverage: string;
  dataFormats: string[];
  limitationsAndProcessing: string;
  verifiedStatus: 'OFFICIAL_ARCHIVE' | 'PEER_REVIEWED_PAPER' | 'MISSION_DOCUMENTATION';
}

export const SCIENTIFIC_SOURCES: ScientificSource[] = [
  {
    id: 'source-1',
    organization: 'NASA CDDIS (Crustal Dynamics Data Information System)',
    title: 'CDDIS Lunar Laser Ranging Data Archive',
    url: 'https://data.nasa.gov/dataset/cddis-llr-data',
    roleInProject: 'Primary data repository reference for verified historical and operational lunar laser ranging observations.',
    temporalCoverage: '1969 to Present',
    dataFormats: ['Pre-CRD normal points', 'CRD/CRD2 (Consolidated Range Data)'],
    limitationsAndProcessing: 'Raw observational archives require calibration for station eccentricities, tropospheric delay, and center-of-mass corrections before orbit fitting.',
    verifiedStatus: 'OFFICIAL_ARCHIVE'
  },
  {
    id: 'source-2',
    organization: 'International Laser Ranging Service (ILRS)',
    title: 'Availability of Lunar Laser Ranging Data',
    url: 'https://ilrs.gsfc.nasa.gov/science/scienceContributions/lunar_data.html',
    roleInProject: 'Official operational status of lunar retroreflector targets, station coordinates, and archive mirrors.',
    temporalCoverage: '1969 to Present',
    dataFormats: ['Normal Points (NPT)', 'CRD standard format'],
    limitationsAndProcessing: 'Historical data (1969–2012) uses legacy column formats; post-2012 observations use CRD record structures (H, C, 11, etc.).',
    verifiedStatus: 'OFFICIAL_ARCHIVE'
  },
  {
    id: 'source-3',
    organization: 'International Laser Ranging Service (ILRS)',
    title: 'Lunar Laser Ranging Science Overview',
    url: 'https://ilrs.gsfc.nasa.gov/science/scienceContributions/lunar.html',
    roleInProject: 'Authoritative scientific overview of general relativity tests, lunar geophysics, and tidal recession values.',
    temporalCoverage: 'Multidecadal Analysis',
    dataFormats: ['Scientific synthesis and documentation'],
    limitationsAndProcessing: 'Provides peer-reviewed summary constants rather than individual station logs.',
    verifiedStatus: 'OFFICIAL_ARCHIVE'
  },
  {
    id: 'source-4',
    organization: 'NASA Goddard Space Flight Center',
    title: 'Apollo 11 Lunar Laser Ranging Retroreflector (LRRR) Experiment',
    url: 'https://cddis.nasa.gov/',
    roleInProject: 'Instrument deployment record, 100 corner-cube optical assembly specs, and mission historical logs.',
    temporalCoverage: 'Deployed July 21, 1969',
    dataFormats: ['Apollo EASEP Technical Reports', 'NASA SP-214'],
    limitationsAndProcessing: 'Reflectivity has decreased over 50+ years due to microscopic lunar dust deposition and micrometeoroid pitting.',
    verifiedStatus: 'MISSION_DOCUMENTATION'
  },
  {
    id: 'source-5',
    organization: 'Astronomical Society of the Pacific / APOLLO Collaboration',
    title: 'The Apache Point Observatory Lunar Laser-ranging Operation (APOLLO)',
    url: 'https://iopscience.iop.org/article/10.1086/588825',
    roleInProject: 'Technical basis for single-photon detection statistics, link budget calculations, and sub-millimeter ranging precision.',
    temporalCoverage: '2006 to 2024',
    dataFormats: ['Peer-reviewed publication (Murphy et al.)'],
    limitationsAndProcessing: 'Describes 3.5-meter telescope aperture operations with multi-element avalanche photodiode arrays.',
    verifiedStatus: 'PEER_REVIEWED_PAPER'
  },
  {
    id: 'source-6',
    organization: 'Journal of Geophysical Research: Planets',
    title: 'Lunar Geophysics, Geodesy, and Dynamics with Lunar Laser Ranging',
    url: 'https://agupubs.onlinelibrary.wiley.com/doi/abs/10.1002/2013JE004559',
    roleInProject: 'Source for lunar recession rate (3.8 cm/yr), core fluid boundary dissipation, and GM precision.',
    temporalCoverage: '1969 to 2014 compilation',
    dataFormats: ['Peer-reviewed publication (Williams & Boggs)'],
    limitationsAndProcessing: 'Requires multi-parameter numerical integration (DE430/DE440 planetary ephemeris) to extract geophysical parameters.',
    verifiedStatus: 'PEER_REVIEWED_PAPER'
  }
];

export const METHODOLOGY_NOTES = {
  speedOfLight: '299,792.458 km/s (exact SI definition established in 1983 by the 17th CGPM).',
  rangingFormula: 'Two-way distance is derived as d = (c × Δt) / 2 where Δt is round-trip transit time in vacuum.',
  simulationAssumptions: 'The interactive Laser Lab simulator uses an idealized vacuum propagation model. In real astronomical observations, teams apply tropospheric refraction corrections (approx. 2.0 to 2.5 meters excess delay), tectonic plate motion of ground observatories, general relativistic Shapiro time delay, and lunar libration geometry.',
  dataDistinction: 'The site maintains an uncompromising boundary: REAL SOURCE DATA refers solely to genuine ILRS/CDDIS records; EDUCATIONAL SIMULATION refers to interactive student models; and DEMO DATA refers to illustrative local fixture records.'
};

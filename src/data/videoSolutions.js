/**
 * Video Solutions Data
 * Maps question IDs to video solution URLs with metadata
 * Add new entries for questions that have video solutions
 */

export const videoSolutions = {
  'array-001': 'https://youtu.be/gGtmacuQu-k?si=QLMa5n6zVxq_akDw',
  'array-002': 'https://youtu.be/MsaSgHxZTFE?si=9qiL4rtSdTPycrlY',
  'array-003': 'https://youtu.be/aXJ-p3Qa4TY?si=xjL4yvQaKSVc-gWx',
  'array-004': 'https://youtu.be/J48aGjfjYTI?si=jMoZTLHSniuonsUb',
  'array-005': 'https://youtu.be/T9tzE3NeZl8?si=aSUQb2u1fsyCuVqi&t=16',
  'array-006': 'https://youtu.be/wvcQg43_V8U?si=uFNd2ipMrwtt970z&t=2585',
  'array-007': 'https://youtu.be/wvcQg43_V8U?si=SvBnpzWWRHLojjfe&t=3540',
  'array-008': 'https://youtu.be/U6CeqvSGWF8?si=0ZU-mpkf78LMH5nv',
  'array-009': 'https://youtu.be/HCL4_bOd3-4?si=izQ21lDr6ekXn-VX',
  'array-010': 'https://youtu.be/FbwS1Uc1G5g?si=TTLz8ZztwRpefLTO',
  'array-011': 'https://youtu.be/_6QpiqTw_ew?si=XE1Jgoz84WbkhiPt',
  'array-012': 'https://youtu.be/oVa8DfUDKTw?si=LUU7GZQS7s1pilrO&t=1827',
  'array-013': 'https://youtu.be/n7uwj04E0I4?si=9yt6VTiO-eDGUkij',
  'array-014': 'https://youtu.be/AHZpyENo7k4?si=GXSzte_YgRFjUvkd',
  'array-015': 'https://youtu.be/IexN60k62jo?si=1-qukY3iCb4RJlQC',
  'array-016': 'https://youtu.be/JDOXKqF60RQ?si=IhiNcCWmopPx-kG4',
  'array-017': 'https://youtu.be/AseUmwVNaoY?si=1n89sPpi9zcdYUS3',
  'array-018': 'https://youtu.be/E2-heUEnZKU?si=p581RJo4LhUH6DRW',
  'array-019': 'https://youtu.be/Q7v239y-Tik?si=QupbZFVq7xjFfhiq',
  'array-020': 'https://youtu.be/NC9r8D2QnHk?si=JzdOyBQ-bO5tbDAX',
  'array-021': 'https://youtu.be/p1M7Ou4E5fo?si=sEWaVLH8s-RzsnQp',
  'array-022': 'https://youtu.be/h4aBagy4Uok?si=mGuTWLulCFeAsxSJ',
  'array-023': 'https://youtu.be/xvNwoz-ufXA?si=a3mNJGnYwCWfW_aH',
  'array-024': 'https://youtu.be/KDH4mhFVvHw?si=4n1mdbgADx71vb3N',
  'array-025': 'https://youtu.be/K-RsltkN63w?si=FS8sKwX0yK8sOX4O',
  'array-026': 'https://youtu.be/UHHp8USwx4M?si=lawROQjkIgyHKCoo',
  'array-027': 'https://youtu.be/TW2m8m_FNJE?si=FELYIDjgTtzIUnpJ',
  'array-028': 'https://youtu.be/oYNU1TD9W5Y?si=bhJePdchCW5S4jj5',
  'array-029': 'https://youtu.be/nYvx3kRl9eU?si=45-NI-G8j3bbx33P',
  'array-030': 'https://youtu.be/ihNJWLadLHI?si=k4XLHAMzncbeLvT3',
  "matrix-001": "https://youtu.be/3Zv-s9UUrFM?si=iVe_m8Zk8EdJWx9z",
  "matrix-002": "",
  "matrix-003": "",
  "matrix-004": "",
  "matrix-005": "",
  "matrix-006": "",
  "matrix-007": "",
  "matrix-008": "",
  "matrix-009": "",
  "matrix-010": "",
  "matrix-011": "",
  "matrix-012": "",
  "matrix-013": "",
  "matrix-014": "",
  "matrix-015": "",
  "matrix-016": "",
  "matrix-017": "",
  "matrix-018": "",
  "matrix-019": "",
  "matrix-020": "",
  "matrix-021": "",
  "matrix-022": "",
  "matrix-023": "",
  "matrix-024": "",
  "matrix-025": "",
};

/**
 * Video solution metadata
 * Optional: Add duration, quality, channel info
 */
export const videoMetadata = {
  // Example: 'question-id': { duration: '12:34', quality: 'HD', channel: 'Striver' },
};

/**
 * Get video solution URL for a question
 * @param {string} questionId - The question ID
 * @returns {string|null} - The video URL or null if not available
 */
export const getVideoSolution = (questionId) => {
  return videoSolutions[questionId] || null;
};

/**
 * Check if a question has a video solution
 * @param {string} questionId - The question ID
 * @returns {boolean} - True if video solution exists
 */
export const hasVideoSolution = (questionId) => {
  return !!videoSolutions[questionId];
};

/**
 * Add a new video solution
 * Use this to programmatically add solutions
 * @param {string} questionId - The question ID
 * @param {string} videoUrl - The video URL
 * @param {object} metadata - Optional metadata { duration, quality, channel }
 */
export const addVideoSolution = (questionId, videoUrl, metadata = {}) => {
  if (questionId && videoUrl) {
    videoSolutions[questionId] = videoUrl;
    if (Object.keys(metadata).length > 0) {
      videoMetadata[questionId] = metadata;
    }
  }
};

/**
 * Get video metadata
 * @param {string} questionId - The question ID
 * @returns {object} - Metadata or empty object
 */
export const getVideoMetadata = (questionId) => {
  return videoMetadata[questionId] || {};
};

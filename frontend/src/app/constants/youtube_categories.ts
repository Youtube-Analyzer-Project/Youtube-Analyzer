/**
 * Mapping of YouTube Video Category IDs to Category Names.
 * Source: YouTube Data API v3 (Region: RO)
 */
export const CATEGORY_ID_MAP: Record<string, string> = {
  '1': 'Film & Animation',
  '2': 'Autos & Vehicles',
  '10': 'Music',
  '15': 'Pets & Animals',
  '17': 'Sports',
  '18': 'Short Movies',
  '19': 'Travel & Events',
  '20': 'Gaming',
  '21': 'Videoblogging',
  '22': 'People & Blogs',
  '23': 'Comedy',
  '24': 'Entertainment',
  '25': 'News & Politics',
  '26': 'Howto & Style',
  '27': 'Education',
  '28': 'Science & Technology',
  '30': 'Movies',
  '31': 'Anime/Animation',
  '32': 'Action/Adventure',
  '33': 'Classics',
  '34': 'Comedy',
  '35': 'Documentary',
  '36': 'Drama',
  '37': 'Family',
  '38': 'Foreign',
  '39': 'Horror',
  '40': 'Sci-Fi/Fantasy',
  '41': 'Thriller',
  '42': 'Shorts',
  '43': 'Shows',
  '44': 'Trailers',
};

/**
 * Array of category objects, useful for dropdowns or iteration.
 * Includes 'assignable' status from the source data.
 */
export const VIDEO_CATEGORIES = [
  { id: '1', title: 'Film & Animation', assignable: true },
  { id: '2', title: 'Autos & Vehicles', assignable: true },
  { id: '10', title: 'Music', assignable: true },
  { id: '15', title: 'Pets & Animals', assignable: true },
  { id: '17', title: 'Sports', assignable: true },
  { id: '18', title: 'Short Movies', assignable: false },
  { id: '19', title: 'Travel & Events', assignable: true },
  { id: '20', title: 'Gaming', assignable: true },
  { id: '21', title: 'Videoblogging', assignable: false },
  { id: '22', title: 'People & Blogs', assignable: true },
  { id: '23', title: 'Comedy', assignable: true },
  { id: '24', title: 'Entertainment', assignable: true },
  { id: '25', title: 'News & Politics', assignable: true },
  { id: '26', title: 'Howto & Style', assignable: true },
  { id: '27', title: 'Education', assignable: true },
  { id: '28', title: 'Science & Technology', assignable: true },
  { id: '30', title: 'Movies', assignable: false },
  { id: '31', title: 'Anime/Animation', assignable: false },
  { id: '32', title: 'Action/Adventure', assignable: false },
  { id: '33', title: 'Classics', assignable: false },
  { id: '34', title: 'Comedy', assignable: false },
  { id: '35', title: 'Documentary', assignable: false },
  { id: '36', title: 'Drama', assignable: false },
  { id: '37', title: 'Family', assignable: false },
  { id: '38', title: 'Foreign', assignable: false },
  { id: '39', title: 'Horror', assignable: false },
  { id: '40', title: 'Sci-Fi/Fantasy', assignable: false },
  { id: '41', title: 'Thriller', assignable: false },
  { id: '42', title: 'Shorts', assignable: false },
  { id: '43', title: 'Shows', assignable: false },
  { id: '44', title: 'Trailers', assignable: false },
];

/**
 * Helper function to safely get a category name.
 * Returns "Unknown Category" if ID is not found.
 */
export const getCategoryName = (id: string): string => {
  return CATEGORY_ID_MAP[id] || 'Unknown Category';
};

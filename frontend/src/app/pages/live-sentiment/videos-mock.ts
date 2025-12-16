import {LiveVideo} from '../../types/live-video.type';

export const VIDEOS: LiveVideo[] = [
  {
    _id: "A1bC2dE3F4G",
    title: "Global Tech Summit Live",
    channel: "TechGlobal",
    avgSentiment: 0.81,
    totalMessages: 2100,
    lastUpdated: "2025-12-14T13:00:00.000Z",
    sentimentHistory: [
      { ts: "2025-12-14T12:20:00.000Z", avg: 0.68, messages: 120 },
      { ts: "2025-12-14T12:25:00.000Z", avg: 0.72, messages: 150 },
      { ts: "2025-12-14T12:30:00.000Z", avg: 0.75, messages: 190 },
      { ts: "2025-12-14T12:35:00.000Z", avg: 0.78, messages: 230 },
      { ts: "2025-12-14T12:40:00.000Z", avg: 0.80, messages: 260 }
    ],
    recentMessages: [
      { author: "Alex", text: "Great keynote!", ts: "2025-12-14T12:59:10.000Z" },
      { author: "Maria", text: "Really inspiring talks", ts: "2025-12-14T12:59:25.000Z" },
      { author: "John", text: "Loved the AI section", ts: "2025-12-14T12:59:40.000Z" }
    ]
  },

  {
    _id: "H7JkL9M2QwE",
    title: "Champions League Watchalong",
    channel: "FootballLive",
    avgSentiment: 0.57,
    totalMessages: 5400,
    lastUpdated: "2025-12-14T13:01:00.000Z",
    sentimentHistory: [
      { ts: "2025-12-14T12:20:00.000Z", avg: 0.60, messages: 400 },
      { ts: "2025-12-14T12:25:00.000Z", avg: 0.52, messages: 520 },
      { ts: "2025-12-14T12:30:00.000Z", avg: 0.48, messages: 610 },
      { ts: "2025-12-14T12:35:00.000Z", avg: 0.55, messages: 720 },
      { ts: "2025-12-14T12:40:00.000Z", avg: 0.62, messages: 810 }
    ],
    recentMessages: [
      { author: "Leo", text: "GOOOAL!!!", ts: "2025-12-14T13:00:10.000Z" },
      { author: "Radu", text: "That referee is blind", ts: "2025-12-14T13:00:22.000Z" },
      { author: "Mihai", text: "What a match!", ts: "2025-12-14T13:00:35.000Z" }
    ]
  },

  {
    _id: "Z9X8C7V6B5N",
    title: "Indie Game Launch Live",
    channel: "IndieGames",
    avgSentiment: 0.33,
    totalMessages: 3100,
    lastUpdated: "2025-12-14T12:59:00.000Z",
    sentimentHistory: [
      { ts: "2025-12-14T12:20:00.000Z", avg: 0.62, messages: 260 },
      { ts: "2025-12-14T12:25:00.000Z", avg: 0.50, messages: 320 },
      { ts: "2025-12-14T12:30:00.000Z", avg: 0.44, messages: 380 },
      { ts: "2025-12-14T12:35:00.000Z", avg: 0.38, messages: 420 },
      { ts: "2025-12-14T12:40:00.000Z", avg: 0.34, messages: 460 }
    ],
    recentMessages: [
      { author: "PlayerOne", text: "This looks unfinished...", ts: "2025-12-14T12:58:30.000Z" },
      { author: "DevFan", text: "Give them time!", ts: "2025-12-14T12:58:45.000Z" },
      { author: "Critic", text: "Expected more tbh", ts: "2025-12-14T12:59:00.000Z" }
    ]
  },
  {
    _id: "Q1W2E3R4T5Y",
    title: "NASA Space Mission Live",
    channel: "NASA",
    avgSentiment: 0.87,
    totalMessages: 6200,
    lastUpdated: "2025-12-14T13:02:00.000Z",
    sentimentHistory: [
      { ts: "2025-12-14T12:20:00.000Z", avg: 0.82, messages: 420 },
      { ts: "2025-12-14T12:25:00.000Z", avg: 0.84, messages: 520 },
      { ts: "2025-12-14T12:30:00.000Z", avg: 0.86, messages: 610 },
      { ts: "2025-12-14T12:35:00.000Z", avg: 0.88, messages: 720 },
      { ts: "2025-12-14T12:40:00.000Z", avg: 0.87, messages: 810 }
    ],
    recentMessages: [
      { author: "SpaceFan", text: "This is historic!", ts: "2025-12-14T13:01:20.000Z" },
      { author: "Engineer", text: "Everything looks nominal", ts: "2025-12-14T13:01:35.000Z" },
      { author: "Viewer42", text: "So exciting!", ts: "2025-12-14T13:01:50.000Z" }
    ]
  },

  {
    _id: "U7I8O9P0ASD",
    title: "Formula 1 Qualifying Live",
    channel: "F1 Official",
    avgSentiment: 0.63,
    totalMessages: 4800,
    lastUpdated: "2025-12-14T13:03:00.000Z",
    sentimentHistory: [
      { ts: "2025-12-14T12:20:00.000Z", avg: 0.60, messages: 380 },
      { ts: "2025-12-14T12:25:00.000Z", avg: 0.58, messages: 460 },
      { ts: "2025-12-14T12:30:00.000Z", avg: 0.62, messages: 540 },
      { ts: "2025-12-14T12:35:00.000Z", avg: 0.66, messages: 620 },
      { ts: "2025-12-14T12:40:00.000Z", avg: 0.64, messages: 700 }
    ],
    recentMessages: [
      { author: "MaxFan", text: "That lap was insane!", ts: "2025-12-14T13:02:10.000Z" },
      { author: "F1Stats", text: "Sector 2 purple!", ts: "2025-12-14T13:02:25.000Z" },
      { author: "Viewer", text: "Quali is intense today", ts: "2025-12-14T13:02:40.000Z" }
    ]
  }
];

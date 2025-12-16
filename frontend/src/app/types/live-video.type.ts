export interface LiveVideo {
  _id: string;
  title: string;
  channel: string;
  avgSentiment: number;
  totalMessages: number;
  lastUpdated: string;
  sentimentHistory: {
    ts: string;
    avg: number;
    messages: number;
  }[];
  recentMessages: {
    author: string;
    text: string;
    ts: string;
  }[]
}

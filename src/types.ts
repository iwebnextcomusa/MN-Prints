export interface User {
  id: string;
  email: string;
  name: string;
  companyName?: string;
  phone?: string;
  isAdmin?: boolean;
}

export type QuoteStatus = 'pending_review' | 'quoted' | 'approved' | 'in_production' | 'shipped' | 'completed';

export interface QuoteRequest {
  id: string;
  userId?: string; // linked if submitted while logged in
  name: string;
  company: string;
  email: string;
  phone: string;
  productType: string;
  quantity: number;
  sizes: string;
  printingMethod: string;
  artworkUrl?: string;
  artworkName?: string;
  deadline: string;
  additionalDetails: string;
  status: QuoteStatus;
  estimatedPrice?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export type OrderStatus = 'submitted' | 'processing' | 'in_production' | 'quality_check' | 'shipped' | 'delivered';

export interface TrackingMilestone {
  status: OrderStatus;
  label: string;
  description: string;
  date: string;
  completed: boolean;
}

export interface OrderTrack {
  id: string; // Order Number e.g. MNP-74829
  userId?: string;
  quoteId?: string;
  productName: string;
  productType?: string;
  quantity: number;
  printingMethod: string;
  status: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  milestones: TrackingMilestone[];
  createdAt: string;
  sizes?: string;
  artworkName?: string;
  trackingCode?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  createdAt: string;
}

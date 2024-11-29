export interface Database {
  public: {
    Tables: {
      restaurants: {
        Row: {
          id: string;
          name: string;
          cuisine: string;
          image: string;
          location: { lat: number; lng: number };
          owner_id: string;
          approved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['restaurants']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['restaurants']['Insert']>;
      };
      deals: {
        Row: {
          id: string;
          restaurant_id: string;
          title: string;
          description: string;
          discount: string;
          valid_until: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['deals']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['deals']['Insert']>;
      };
    };
  };
}
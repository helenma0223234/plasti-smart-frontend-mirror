
export interface AvatarAccessories {
    id: number;
    unlocked: boolean;
    cost: number;
}
  
export interface AvatarsOwned {
    id: number;
    unlocked: boolean;
    cost: number;
    colors: AvatarColors[];
}
  
export interface AvatarColors {
    id: number;
    unlocked: boolean;
    cost: number;
};

export interface AvatarCustomization {
    AvatarsOwned: AvatarsOwned[];
    AvatarAccessories: AvatarAccessories[];
};
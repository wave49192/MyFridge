export interface Ingredient {
  id: number;
  name: string;
  group: string;
}

export interface InventoryItem {
  id: number;
  ingredient: Ingredient;
  quantity: number;
  unit: string;
}

export interface Inventory {
  id: number;
  items: InventoryItem[];
  owned_by: number;
}

export const getEmojiByGroupName = (group: string) => {
    switch (group) {
        case "Pantry Essentials": return "Pantry Essentials 🧑🏻‍🍳";
        case "Vegetables & Greens": return "Vegetables & Greens 🥦🥬";
        case "Mushrooms": return "Mushrooms 🍄";
        case "Fruits": return "Fruits 🍉🍍";
        case "Berries": return "Berries 🫐";
        case "Nuts & Seeds": return "Nuts & Seeds 🥜";
        case "Cheeses": return "Cheeses 🧀";
        case "Dairy & Eggs": return "Dairy & Eggs 🍳🥛";
        case "Dairy-Free & Meat Substitutes": return "Dairy-Free & Meat Substitutes 🌾";
        case "Meats": return "Meats 🥩";
        case "Poultry": return "Poultry 🐓🐓";
        case "Fish": return "Fish 🐟";
        case "Seafood & Seaweed": return "Seafood & Seaweed 🦐🦑";
        case "Herbs & Spices": return "Herbs & Spices 🌶️";
        case "Sugar & Sweeteners": return "Sugar & Sweeteners 🍯";
        case "Seasonings & Spice Blends": return "Seasonings & Spice Blends 🧂";
        case "Baking": return "Baking 🍰";
        case "Pre-Made Doughs & Wrappers": return "Pre-Made Doughs & Wrappers";
        case "Grains & Cereals": return "Grains & Cereals 🍚";
        case "Legumes": return "Legumes 🫘";
        case "Pasta": return "Pasta 🍝";
        case "Bread & Salty Snacks": return "Bread & Salty Snacks 🍞";
        case "Oils & Fats": return "Oils & Fats";
        default: return group
    }
}
// Food menu data with Indian Rupee prices
// Categories and items based on the UI screenshots

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number; // in INR
  image: string;
  category: string;
  rating: number;
}

export const categories = [
  { id: "salad", name: "Salad", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop" },
  { id: "rolls", name: "Rolls", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200&h=200&fit=crop" },
  { id: "deserts", name: "Deserts", image: "https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=200&h=200&fit=crop" },
  { id: "sandwich", name: "Sandwich", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200&h=200&fit=crop" },
  { id: "cake", name: "Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop" },
  { id: "pure-veg", name: "Pure Veg", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200&h=200&fit=crop" },
  { id: "pasta", name: "Pasta", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop" },
  { id: "noodles", name: "Noodles", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop" },
];

export const foodItems: FoodItem[] = [
  // Salads
  { id: "1", name: "Greek Salad", description: "Fresh vegetables with feta cheese and olives, drizzled with olive oil dressing", price: 249, image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop", category: "salad", rating: 4.5 },
  { id: "2", name: "Caesar Salad", description: "Crisp romaine lettuce with parmesan, croutons and classic Caesar dressing", price: 299, image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&h=400&fit=crop", category: "salad", rating: 4.3 },
  { id: "3", name: "Garden Fresh Salad", description: "Mixed greens with cherry tomatoes, cucumber and balsamic vinaigrette", price: 199, image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=500&h=400&fit=crop", category: "salad", rating: 4.2 },
  { id: "4", name: "Quinoa Bowl", description: "Healthy quinoa with roasted vegetables, avocado and lemon tahini dressing", price: 349, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop", category: "salad", rating: 4.6 },

  // Rolls
  { id: "5", name: "Paneer Tikka Roll", description: "Grilled paneer with mint chutney wrapped in a soft roti", price: 179, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&h=400&fit=crop", category: "rolls", rating: 4.4 },
  { id: "6", name: "Chicken Seekh Roll", description: "Spicy chicken seekh kebab wrapped with onions and green chutney", price: 199, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=400&fit=crop", category: "rolls", rating: 4.5 },
  { id: "7", name: "Egg Roll", description: "Fluffy egg omelette rolled with veggies and tangy sauce", price: 149, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=400&fit=crop", category: "rolls", rating: 4.1 },
  { id: "8", name: "Veg Spring Roll", description: "Crispy fried rolls stuffed with fresh vegetables and glass noodles", price: 159, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&h=400&fit=crop", category: "rolls", rating: 4.3 },

  // Deserts
  { id: "9", name: "Chocolate Brownie", description: "Rich and fudgy chocolate brownie served with vanilla ice cream", price: 199, image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500&h=400&fit=crop", category: "deserts", rating: 4.7 },
  { id: "10", name: "Gulab Jamun", description: "Soft milk dumplings soaked in rose-flavored sugar syrup", price: 129, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=400&fit=crop", category: "deserts", rating: 4.8 },
  { id: "11", name: "Rasmalai", description: "Soft cheese patties soaked in sweetened, thickened milk with cardamom", price: 149, image: "https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=500&h=400&fit=crop", category: "deserts", rating: 4.6 },
  { id: "12", name: "Tiramisu", description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone", price: 299, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=400&fit=crop", category: "deserts", rating: 4.5 },

  // Sandwich
  { id: "13", name: "Club Sandwich", description: "Triple-layered sandwich with chicken, lettuce, tomato and mayo", price: 249, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&h=400&fit=crop", category: "sandwich", rating: 4.4 },
  { id: "14", name: "Grilled Veggie Sandwich", description: "Grilled vegetables with pesto and melted cheese on sourdough", price: 199, image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=400&fit=crop", category: "sandwich", rating: 4.2 },
  { id: "15", name: "Paneer Tikka Sandwich", description: "Spiced paneer with bell peppers and onions in toasted bread", price: 179, image: "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=500&h=400&fit=crop", category: "sandwich", rating: 4.3 },
  { id: "16", name: "Chicken Mayo Sandwich", description: "Tender chicken with creamy mayo, lettuce and tomato", price: 229, image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=500&h=400&fit=crop", category: "sandwich", rating: 4.5 },

  // Cake
  { id: "17", name: "Red Velvet Cake", description: "Moist red velvet layers with cream cheese frosting", price: 399, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop", category: "cake", rating: 4.7 },
  { id: "18", name: "Black Forest Cake", description: "Chocolate sponge with whipped cream, cherries and chocolate shavings", price: 449, image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500&h=400&fit=crop", category: "cake", rating: 4.6 },
  { id: "19", name: "Cheesecake", description: "Creamy New York style cheesecake with berry compote", price: 349, image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=500&h=400&fit=crop", category: "cake", rating: 4.5 },
  { id: "20", name: "Mango Mousse Cake", description: "Light and airy mango mousse on a sponge cake base", price: 379, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=400&fit=crop", category: "cake", rating: 4.4 },

  // Pure Veg
  { id: "21", name: "Paneer Butter Masala", description: "Cottage cheese cubes in rich, creamy tomato gravy", price: 279, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&h=400&fit=crop", category: "pure-veg", rating: 4.8 },
  { id: "22", name: "Dal Makhani", description: "Slow-cooked black lentils in a buttery, creamy sauce", price: 249, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=400&fit=crop", category: "pure-veg", rating: 4.7 },
  { id: "23", name: "Veg Biryani", description: "Fragrant basmati rice with mixed vegetables and aromatic spices", price: 299, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&h=400&fit=crop", category: "pure-veg", rating: 4.5 },
  { id: "24", name: "Chole Bhature", description: "Spicy chickpea curry with fluffy fried bread", price: 199, image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&h=400&fit=crop", category: "pure-veg", rating: 4.6 },

  // Pasta
  { id: "25", name: "Penne Arrabiata", description: "Penne pasta in a spicy tomato sauce with garlic and chili", price: 299, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=400&fit=crop", category: "pasta", rating: 4.3 },
  { id: "26", name: "Alfredo Pasta", description: "Creamy white sauce pasta with mushrooms and herbs", price: 329, image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&h=400&fit=crop", category: "pasta", rating: 4.5 },
  { id: "27", name: "Spaghetti Bolognese", description: "Classic spaghetti with rich meat sauce and parmesan", price: 349, image: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=500&h=400&fit=crop", category: "pasta", rating: 4.4 },
  { id: "28", name: "Mac and Cheese", description: "Elbow pasta in a creamy, cheesy sauce baked to perfection", price: 279, image: "https://images.unsplash.com/photo-1543339308-d595c53d4135?w=500&h=400&fit=crop", category: "pasta", rating: 4.2 },

  // Noodles
  { id: "29", name: "Hakka Noodles", description: "Stir-fried noodles with vegetables in soy sauce and chili", price: 199, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=400&fit=crop", category: "noodles", rating: 4.4 },
  { id: "30", name: "Pad Thai", description: "Thai-style rice noodles with tamarind sauce, peanuts and lime", price: 279, image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&h=400&fit=crop", category: "noodles", rating: 4.6 },
  { id: "31", name: "Chow Mein", description: "Crispy fried noodles with mixed vegetables in a savory sauce", price: 219, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&h=400&fit=crop", category: "noodles", rating: 4.3 },
  { id: "32", name: "Singapore Noodles", description: "Thin rice vermicelli with curry powder, shrimp and vegetables", price: 259, image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&h=400&fit=crop", category: "noodles", rating: 4.5 },
];

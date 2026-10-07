import type { Dish } from "@/components/ui/FoodArt";

/** What you can cook at home, and what you can order in. */
export type HomeDish = { id: string; name: string; art: Dish; blurb: string; pantry: number; cookSecs: number; hunger: number; fun: number; order: number };

export const HOME_MENU: HomeDish[] = [
  { id: "jollof", name: "Jollof rice and chicken", art: "jollof", blurb: "Party rice, smoky and bright.", pantry: 1, cookSecs: 5, hunger: 62, fun: 6, order: 4500 },
  { id: "friedrice", name: "Fried rice and plantain", art: "rice", blurb: "Peas, carrots and sweet plantain.", pantry: 1, cookSecs: 5, hunger: 60, fun: 5, order: 4000 },
  { id: "amala", name: "Amala, gbegiri and ewedu", art: "amala", blurb: "The Ibadan classic.", pantry: 1, cookSecs: 5, hunger: 66, fun: 6, order: 3500 },
  { id: "pounded", name: "Pounded yam and egusi", art: "pounded", blurb: "Soft yam, rich melon soup.", pantry: 2, cookSecs: 6, hunger: 74, fun: 6, order: 5000 },
  { id: "ofada", name: "Ofada rice and stew", art: "ofada", blurb: "Local rice, peppery sauce.", pantry: 1, cookSecs: 5, hunger: 64, fun: 6, order: 4200 },
  { id: "moimoi", name: "Moin-moin and pap", art: "moimoi", blurb: "Steamed bean pudding.", pantry: 1, cookSecs: 4, hunger: 42, fun: 4, order: 2000 },
  { id: "akara", name: "Akara and custard", art: "akara", blurb: "Bean fritters for breakfast.", pantry: 1, cookSecs: 4, hunger: 38, fun: 4, order: 1500 },
  { id: "soup", name: "Pepper soup", art: "soup", blurb: "Hot, spicy and comforting.", pantry: 1, cookSecs: 4, hunger: 46, fun: 6, order: 3000 },
  { id: "chicken", name: "Grilled chicken and chips", art: "chicken", blurb: "Crispy chicken, golden chips.", pantry: 1, cookSecs: 5, hunger: 58, fun: 6, order: 4800 },
  { id: "burger", name: "Burger and fries", art: "burger", blurb: "Cheese, lettuce, the lot.", pantry: 1, cookSecs: 4, hunger: 54, fun: 8, order: 3800 },
];

export const dishById = (id: string | undefined) => HOME_MENU.find((d) => d.id === id);

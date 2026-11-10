// Google reviews of ALIIGNSPACE Home Interiors (Jawahar Colony, Jubilee Hills), shown on the home page
// and the ads landing page. Names, star ratings and text are kept exactly as posted on Google —
// typos included — so do not edit or shorten them.
// `verified: true` = checked word-for-word against a screenshot of the original review
// (public/lp/client-wins-3..5.webp). The others are carried over from the previous site and still
// need checking against Google.
export interface GoogleReview {
  name: string;
  rating: number;
  review: string;
  location?: string;
  verified?: boolean;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    name: "Satish Kondeti",
    rating: 4,
    verified: true,
    review:
      "We were relocating to Hyderabad, so wanted to get our 20 yrs old flat fully renovated and give it a modern makeover.\nAliignspace was more than ready to take up complete renovation which most of the designers are unwilling as it required lot of  demolition works.\nAliignspace has a strong design team with Samhita leading from front. They listened to our inputs  of design, colours , theme, budget and come up with very professional & pleasing design phase with alternate suggestions.\nEven though there were some issues in the execution phase, due to age of the flat or labour engaged and timelines ( which I believe is quite common) things were sorted out with regular communication. The team was very flexible in the last moment changes also.\nThe final outcome was amazing and had that ‘ WOW’ feel and we  are enjoying the stay in our new home .\nI would strongly recommend to approach Aliignspace for your interior works or renovation.\nI wish the team ALL THE BEST ! in their future endeavours.",
  },
  {
    name: "kurmarao A",
    rating: 5,
    location: "Vizag",
    verified: true,
    review:
      "We engaged M/s Aliign Space, Hyderabad, for the interior design of our residence at vizag. and the outcome has been truly spectacular. Their design approach seamlessly blended creativity with practicality, aligning perfectly with our functional requirements and aesthetic preferences.\nThe design phase was handled with great professionalism, involving collaborative discussions that ensured smooth progress and timely completion. The team demonstrated exceptional attention to detail and maintained high standards of quality throughout the project execution.\nSpecial mention to Ms. Samhita, who played a pivotal role in the design aspects. Her visualization skills and meticulous detailing were instrumental in bringing our vision to life.\nI wholeheartedly recommend M/s Aliign Space for any interior design projects that demand aesthetics, space management, passion, innovation, and economic with excellence.",
  },
  {
    name: "Dishhiraa Konduru",
    rating: 5,
    verified: true,
    review:
      "Working with Aliignspace was a great experience. From the first meeting to the final installation, everything went smoothly. The whole were very patient with our ideas and gave us the best possible output. Our home looks elegant and perfectly matches our style. Great experience!",
  },
  {
    name: "Adharvam Sree Raagav Thutupalli",
    rating: 5,
    review:
      "We had an amazing experience with this interior design company. From the initial consultation to the final execution, everything was handled with professionalism and creativity. They truly understood our vision and transformed our space into something beyond our expectations.",
  },
  {
    name: "Arun Rej",
    rating: 5,
    review:
      "We had an absolutely wonderful experience working with Samhitha and team. From the initial consultation to project completion, everything was handled exceptionally well. They truly understood our vision and transformed our space into a beautiful home.",
  },
  {
    name: "Thupupalli Ravindra",
    rating: 4,
    review:
      "I was extremely delighted with the team work of Alignspace. Three best qualities they have: 1. Design to actual — 100%. 2. Time schedule — delivered within agreed time. 3. Reasonable pricing and documentation.",
  },
];

export const GOOGLE_SCORE = "4.9";

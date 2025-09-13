const quotes = [
  "Saving lives is a noble cause. Thank you for your service.",
  "Your organization is a beacon of hope for many.",
  "Connecting donors and recipients, one pint at a time.",
  "Every drop of blood counts, and so does every act of kindness.",
  "Heroes don’t always wear capes—sometimes they donate blood.",
  "Your compassion creates ripples of hope in countless lives.",
  "Blood donation is the gift of life that costs nothing but means everything.",
  "One donation can save up to three lives—your impact is immeasurable.",
  "When you give blood, you give someone another sunrise.",
  "Together, we build a community of hope, strength, and resilience.",
  "The smallest act of care can make the biggest difference.",
  "Healing starts with people like you, who choose to give.",
  "In the story of life, you are writing hope into someone’s chapter.",
  "Generosity flows not just from the heart, but through every vein.",
  "You may never meet the life you save, but your kindness lives within them.",
];

export default function Quote() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <>
      <div>
        <p className="italic text-red-600 text-lg font-medium text-center">
          “{randomQuote}”
        </p>
      </div>
    </>
  );
}

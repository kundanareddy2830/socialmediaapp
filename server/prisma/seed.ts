import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create users
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'kundana@example.com',
        username: 'candy',
        password: 'password123',
      },
      {
        email: 'alexc@example.com',
        username: 'alexc',
        password: 'password123',
      },
      {
        email: 'emilyr@example.com',
        username: 'emily_r',
        password: 'password123',
      },
      {
        email: 'marcusj@example.com',
        username: 'marcusj',
        password: 'password123',
      },
      {
        email: 'sophiak@example.com',
        username: 'sophiak',
        password: 'password123',
      },
      {
        email: 'davidthompson@example.com',
        username: 'davidthompson',
        password: 'password123',
      },
      {
        email: 'lunamartinez@example.com',
        username: 'lunamartinez',
        password: 'password123',
      },
      {
        email: 'ryanoconnor@example.com',
        username: 'ryanoconnor',
        password: 'password123',
      },
      {
        email: 'jessicaw@example.com',
        username: 'jessicaw',
        password: 'password123',
      },
      {
        email: 'mikechang@example.com',
        username: 'mikechang',
        password: 'password123',
      },
      {
        email: 'ariapatel@example.com',
        username: 'ariapatel',
        password: 'password123',
      },
      {
        email: 'carlosr@example.com',
        username: 'carlosr',
        password: 'password123',
      },
    ],
    // skipDuplicates: true,
  });

  // Create posts (authorId is 1-based index)
  await prisma.post.createMany({
    data: [
      {
        content: "Just launched my new creative project! 🎨 Been working on this for months and I'm so excited to finally share it with everyone. What do you think about the color palette? #CreativeLife #DesignInspiration #NewProject",
        authorId: 1,
      },
      {
        content: "Golden hour magic ✨ Sometimes the best shots happen when you least expect them. This was taken during my morning walk in the city.",
        authorId: 4,
      },
      {
        content: "Exciting news! Just deployed a new React app with some amazing performance optimizations. The load time improved by 60%! 🚀 Always love seeing those green lighthouse scores.",
        authorId: 2,
      },
      {
        content: "Street food adventures in Bangkok! 🍜 This pad thai from a local vendor was absolutely incredible. Sometimes the best meals come from the most unexpected places.",
        authorId: 7,
      },
      {
        content: "Content marketing tip: Authenticity beats perfection every time! 💡 Share your real experiences, challenges, and wins. Your audience will connect with the genuine you.",
        authorId: 3,
      },
      {
        content: "Working on a new mobile app design and I'm really excited about the user flow we've created. Clean, intuitive, and accessible. Can't wait to see it come to life! 📱",
        authorId: 5,
      },
      {
        content: "Monday motivation: Your body can do it. It's your mind you need to convince! 💪 Starting the week strong with a 6am workout. What's your fitness goal this week?",
        authorId: 6,
      },
      {
        content: "Late night studio session 🎵 Working on some new beats and the energy is just incredible tonight. Music has this amazing power to connect us all.",
        authorId: 8,
      },
      {
        content: "Grateful for all the support on my recent project! 🙏 The feedback has been amazing and it's motivating me to keep pushing creative boundaries.",
        authorId: 1,
      },
      {
        content: "Tokyo streets at night 🌃 The neon lights and bustling energy make this city absolutely magical. Already planning my next adventure!",
        authorId: 7,
      },
      {
        content: "Behind the scenes at Paris Fashion Week! ✨ The energy here is absolutely incredible. So many talented designers showcasing their vision. #PFW #Fashion #BehindTheScenes",
        authorId: 9,
      },
      {
        content: "Excited to announce our AI startup just raised Series A! 🚀 We're building tools that will revolutionize how we interact with technology. The future is here! #AI #Startup #TechNews",
        authorId: 10,
      },
      {
        content: "Climate data from this week shows we're making progress! 🌍 Small actions by individuals are adding up to real change. Every choice matters. #ClimateAction #Sustainability #Environment",
        authorId: 11,
      },
      {
        content: "New recipe alert! 👨‍🍳 My grandmother's secret paella recipe that's been in our family for generations. Finally ready to share it with the world! #FamilyRecipes #SpanishCuisine #Cooking",
        authorId: 12,
      },
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
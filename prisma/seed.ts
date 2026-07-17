import { PrismaClient, OptionType, SignalStatus } from "@prisma/client";

const prisma = new PrismaClient();

function pnl(entryPrice: number, sellPrice: number) {
  return ((sellPrice - entryPrice) / entryPrice) * 100;
}

function hoursAgo(h: number) {
  return new Date(Date.now() - h * 60 * 60 * 1000);
}

async function main() {
  await prisma.signal.deleteMany();
  await prisma.subscriber.deleteMany();

  const signals: Array<{
    strike: number;
    optionType: OptionType;
    entryPrice: number;
    stopLoss: number;
    targets: number[];
    priceAtSignal: number;
    sellPrice: number | null;
    status: SignalStatus;
    signalTime: Date;
    closedTime: Date | null;
    rawMessage: string;
  }> = [
    {
      strike: 77300,
      optionType: OptionType.CE,
      entryPrice: 150,
      stopLoss: 145,
      targets: [170],
      priceAtSignal: 145,
      sellPrice: 170,
      status: SignalStatus.TARGET_HIT,
      signalTime: hoursAgo(240),
      closedTime: hoursAgo(238),
      rawMessage: "77300 ce\nAbove -150\nSL -145\nTrgt -170\nNow -145\nselling price 170",
    },
    {
      strike: 76800,
      optionType: OptionType.PE,
      entryPrice: 120,
      stopLoss: 110,
      targets: [140, 155],
      priceAtSignal: 118,
      sellPrice: 108,
      status: SignalStatus.SL_HIT,
      signalTime: hoursAgo(216),
      closedTime: hoursAgo(215),
      rawMessage: "76800 pe\nAbove -120\nSL -110\nTrgt -140,155\nNow -118\nsell price 108",
    },
    {
      strike: 51200,
      optionType: OptionType.CE,
      entryPrice: 95,
      stopLoss: 88,
      targets: [110, 125],
      priceAtSignal: 93,
      sellPrice: 122,
      status: SignalStatus.TARGET_HIT,
      signalTime: hoursAgo(192),
      closedTime: hoursAgo(190),
      rawMessage: "51200 ce\nAbove -95\nSL -88\nTrgt -110,125\nNow -93\nselling price 122",
    },
    {
      strike: 51400,
      optionType: OptionType.PE,
      entryPrice: 80,
      stopLoss: 74,
      targets: [95],
      priceAtSignal: 79,
      sellPrice: 74,
      status: SignalStatus.SL_HIT,
      signalTime: hoursAgo(168),
      closedTime: hoursAgo(167),
      rawMessage: "51400 pe\nAbove -80\nSL -74\nTrgt -95\nNow -79\nsell price 74",
    },
    {
      strike: 77500,
      optionType: OptionType.CE,
      entryPrice: 160,
      stopLoss: 148,
      targets: [180, 200],
      priceAtSignal: 158,
      sellPrice: 198,
      status: SignalStatus.TARGET_HIT,
      signalTime: hoursAgo(144),
      closedTime: hoursAgo(142),
      rawMessage: "77500 ce\nAbove -160\nSL -148\nTrgt -180,200\nNow -158\nselling price 198",
    },
    {
      strike: 51000,
      optionType: OptionType.PE,
      entryPrice: 105,
      stopLoss: 98,
      targets: [120],
      priceAtSignal: 104,
      sellPrice: 119,
      status: SignalStatus.TARGET_HIT,
      signalTime: hoursAgo(120),
      closedTime: hoursAgo(119),
      rawMessage: "51000 pe\nAbove -105\nSL -98\nTrgt -120\nNow -104\nsell price 119",
    },
    {
      strike: 77800,
      optionType: OptionType.CE,
      entryPrice: 175,
      stopLoss: 162,
      targets: [195, 215],
      priceAtSignal: 172,
      sellPrice: 161,
      status: SignalStatus.SL_HIT,
      signalTime: hoursAgo(96),
      closedTime: hoursAgo(95),
      rawMessage: "77800 ce\nAbove -175\nSL -162\nTrgt -195,215\nNow -172\nselling price 161",
    },
    {
      strike: 51600,
      optionType: OptionType.CE,
      entryPrice: 88,
      stopLoss: 81,
      targets: [100, 112],
      priceAtSignal: 87,
      sellPrice: 111,
      status: SignalStatus.TARGET_HIT,
      signalTime: hoursAgo(72),
      closedTime: hoursAgo(70),
      rawMessage: "51600 ce\nAbove -88\nSL -81\nTrgt -100,112\nNow -87\nsell price 111",
    },
    {
      strike: 76900,
      optionType: OptionType.PE,
      entryPrice: 130,
      stopLoss: 121,
      targets: [148],
      priceAtSignal: 128,
      sellPrice: 146,
      status: SignalStatus.CLOSED_MANUAL,
      signalTime: hoursAgo(48),
      closedTime: hoursAgo(46),
      rawMessage: "76900 pe\nAbove -130\nSL -121\nTrgt -148\nNow -128\nselling price 146",
    },
    {
      strike: 78100,
      optionType: OptionType.CE,
      entryPrice: 140,
      stopLoss: 130,
      targets: [160, 175],
      priceAtSignal: 138,
      sellPrice: null,
      status: SignalStatus.OPEN,
      signalTime: hoursAgo(20),
      closedTime: null,
      rawMessage: "78100 ce\nAbove -140\nSL -130\nTrgt -160,175\nNow -138",
    },
    {
      strike: 51100,
      optionType: OptionType.PE,
      entryPrice: 92,
      stopLoss: 85,
      targets: [105],
      priceAtSignal: 91,
      sellPrice: null,
      status: SignalStatus.OPEN,
      signalTime: hoursAgo(6),
      closedTime: null,
      rawMessage: "51100 pe\nAbove -92\nSL -85\nTrgt -105\nNow -91",
    },
  ];

  for (const s of signals) {
    await prisma.signal.create({
      data: {
        ...s,
        pnlPercent: s.sellPrice != null ? pnl(s.entryPrice, s.sellPrice) : null,
      },
    });
  }

  await prisma.subscriber.createMany({
    data: [
      { name: "Arun Kumar", phone: "9876543210", email: "arun@example.com" },
      { name: "Priya Menon", phone: "9123456780", email: null },
      { name: "Vignesh Raja", phone: "9988776655", email: "vignesh@example.com" },
    ],
  });

  console.log(`Seeded ${signals.length} signals and 3 subscribers.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

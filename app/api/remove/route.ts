import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: any, res: any) {
  const events = await prisma.eventDetection.findMany();
  res.json(events);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const detectionDate = formData.get("detectionDate")?.toString();
  const detectionLocation = formData.get("detectionLocation")?.toString();
  const environmentalDamage = formData.get("environmentalDamage")?.toString();
  const debrisType = formData.get("debrisType")?.toString();
  const debrisApproxSize = formData.get("debrisApproxSize")?.toString();
  const result = prisma.eventDetection.create({
    data: {
      detectionDate: detectionDate,
      detectionLocation: detectionLocation,
      environmentalDamage: environmentalDamage,
      debrisType: debrisType,
      debrisApproxSize: debrisApproxSize,
    },
  });
  return Response.json((await result).id);
}

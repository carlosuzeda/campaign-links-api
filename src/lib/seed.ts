import { hashPassword } from "../utils/hash";
import { prisma } from "./prisma";

async function seed() {
  console.log("Iniciando seed...");

  // Limpa o banco na ordem correta para respeitar as foreign keys
  await prisma.linkParameter.deleteMany();
  await prisma.redirect.deleteMany();
  await prisma.link.deleteMany();
  await prisma.parameter.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  console.log("Banco limpo. ✅");

  // Usuários
  const passwordHash = await hashPassword("senha123");

  const jose = await prisma.user.create({
    data: {
      name: "José Silva",
      email: "jose@email.com",
      passwordHash,
    },
  });

  const david = await prisma.user.create({
    data: {
      name: "David Costa",
      email: "david@email.com",
      passwordHash,
    },
  });

  console.log("Usuários criados. ✅");

  // Projetos
  const projetoJose = await prisma.project.create({
    data: {
      name: "Campanha Black Friday",
      userId: jose.id,
    },
  });

  const projetoDavid = await prisma.project.create({
    data: {
      name: "Campanha Natal",
      userId: david.id,
    },
  });

  console.log("Projetos criados. ✅");

  // Parâmetros reutilizáveis
  const utmSourceFB = await prisma.parameter.create({
    data: { key: "utm_source", value: "FB" },
  });

  const utmSourceGoogle = await prisma.parameter.create({
    data: { key: "utm_source", value: "Google" },
  });

  const utmMediumCPC = await prisma.parameter.create({
    data: { key: "utm_medium", value: "cpc" },
  });

  const utmCampaignBF = await prisma.parameter.create({
    data: { key: "utm_campaign", value: "black-friday" },
  });

  const utmCampaignNatal = await prisma.parameter.create({
    data: { key: "utm_campaign", value: "natal-2026" },
  });

  console.log("Parâmetros criados. ✅");

  // Links do José
  const linkFacebookJose = await prisma.link.create({
    data: {
      name: "Link Facebook - Black Friday",
      baseUrl: "https://loja.com/black-friday",
      projectId: projetoJose.id,
    },
  });

  const linkGoogleJose = await prisma.link.create({
    data: {
      name: "Link Google Ads - Black Friday",
      baseUrl: "https://loja.com/black-friday",
      projectId: projetoJose.id,
    },
  });

  // Links do David
  const linkFacebookDavid = await prisma.link.create({
    data: {
      name: "Link Facebook - Natal",
      baseUrl: "https://loja.com/natal",
      projectId: projetoDavid.id,
    },
  });

  console.log("Links criados. ✅");

  // Vincula parâmetros aos links
  await prisma.linkParameter.createMany({
    data: [
      { linkId: linkFacebookJose.id, parameterId: utmSourceFB.id },
      { linkId: linkFacebookJose.id, parameterId: utmMediumCPC.id },
      { linkId: linkFacebookJose.id, parameterId: utmCampaignBF.id },

      { linkId: linkGoogleJose.id, parameterId: utmSourceGoogle.id },
      { linkId: linkGoogleJose.id, parameterId: utmMediumCPC.id },
      { linkId: linkGoogleJose.id, parameterId: utmCampaignBF.id },

      { linkId: linkFacebookDavid.id, parameterId: utmSourceFB.id },
      { linkId: linkFacebookDavid.id, parameterId: utmCampaignNatal.id },
    ],
  });

  console.log("Parâmetros vinculados aos links. ✅");

  // Redirects
  await prisma.redirect.create({
    data: {
      linkId: linkFacebookJose.id,
      destinationUrl: "https://loja.com/produto/tenis-nike",
    },
  });

  await prisma.redirect.create({
    data: {
      linkId: linkFacebookDavid.id,
      destinationUrl: "https://loja.com/produto/kit-natal",
    },
  });

  console.log("Redirects criados. ✅");

  console.log("\nSeed concluído com sucesso! ✅");
  console.log("\nCredenciais para teste:");
  console.log("   José  → jose@email.com  / senha123");
  console.log("   David → david@email.com / senha123");
  console.log("\nIDs dos links para testar o /generate:");
  console.log(`   José  (Facebook) → /links/${linkFacebookJose.id}/generate`);
  console.log(`   José  (Google)   → /links/${linkGoogleJose.id}/generate`);
  console.log(`   David (Facebook) → /links/${linkFacebookDavid.id}/generate`);
  console.log("\nURLs esperadas após o /generate:");
  console.log(
    `   José  (Facebook) → https://loja.com/black-friday?utm_source=FB&utm_medium=cpc&utm_campaign=black-friday&redirect=https://loja.com/produto/tenis-nike`,
  );
  console.log(
    `   José  (Google)   → https://loja.com/black-friday?utm_source=Google&utm_medium=cpc&utm_campaign=black-friday`,
  );
  console.log(
    `   David (Facebook) → https://loja.com/natal?utm_source=FB&utm_campaign=natal-2024&redirect=https://loja.com/produto/kit-natal`,
  );
}

seed()
  .catch((err) => {
    console.error("Erro durante o seed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

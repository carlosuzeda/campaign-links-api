import { Prisma, Redirect } from "@/generated/prisma/client";

export interface RedirectsRepository {
  findByLinkId(linkId: string): Promise<Redirect | null>;
  create(data: Prisma.RedirectCreateInput): Promise<Redirect>;
  update(linkId: string, destinationUrl: string): Promise<Redirect>;
  delete(linkId: string): Promise<void>;
}

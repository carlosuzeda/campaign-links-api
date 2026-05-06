import { Link, Prisma } from "@/generated/prisma/client";

export type LinkWithRelations = Link & {
  linkParameters: {
    parameter: {
      key: string;
      value: string;
    };
  }[];
  redirect: {
    destinationUrl: string;
  } | null;
};

export interface LinksRepository {
  findById(id: string): Promise<LinkWithRelations | null>;
  findManyByProjectId(projectId: string): Promise<LinkWithRelations[]>;
  create(data: Prisma.LinkCreateInput): Promise<Link>;
  update(id: string, data: Prisma.LinkUpdateInput): Promise<Link>;
  delete(id: string): Promise<void>;
}

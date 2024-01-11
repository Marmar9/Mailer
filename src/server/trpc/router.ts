import { router, publicProcedure } from "@/server/trpc/trpc";
import { z } from "zod";
import { DBMESSAGE, DBMESSAGES } from "@/types/main";

import data from "@/mock_data.json";
import AppRouter from "next/dist/client/components/app-router";
import { TRPCError } from "@trpc/server";
import Messages from "@/server/db/messages";
import { db } from "../db/main";
async function getMessages({
  limit,
  cursor,
}: {
  limit: number;
  cursor: number;
}): Promise<DBMESSAGES> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.slice(cursor, cursor + limit));
    }, 500);
  });
}
async function getMessage({ id }: { id: string }): Promise<DBMESSAGE> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const message = data.find((message) => message.id === id);
      if (message === undefined) {
        reject("No message found with id " + id);
      } else {
        resolve(message);
      }
    }, 500);
  });
}

const items: Array<Number> = [];
export const appRouter = router({
  getMessagesProcedure: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number(), // <-- "cursor" needs to exist, but can be any type
      })
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 25;
      let { cursor } = input;

      // const messages = await getMessages({ cursor, limit });
      const messages = await Messages.find().limit(limit).skip(cursor);

      cursor += limit;

      return {
        meta: { totalRowCount: data.length },
        messages,
        cursor,
      };
    }),

  getMessageProcedure: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      console.log("id", id);

      try {
        const data = await getMessage({ id });

        return data;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching the message",
        });
      }
    }),
  createMesssageProcedure: publicProcedure
    .input(
      z.object({
        title: z.string(),
        sendersEmail: z.string(),
        sendersName: z.string(),
        receiversEmail: z.string(),
        content: z.string(),
        contentType: z.literal("plaintext").or(z.literal("html")),
        date: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const {
        content,
        contentType,
        date,
        receiversEmail,
        sendersEmail,
        sendersName,
        title,
      } = input;

      new Messages({
        content,
        contentType,
        date,
        receiversEmail,
        sendersEmail,
        sendersName,
        title,
      }).save();
      return;
    }),
  deleteMessageProcedure: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      // const a = await db.models.users.find();
      // return a;
    }),
});

export type AppRouter = typeof appRouter;

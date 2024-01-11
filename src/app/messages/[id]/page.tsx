"use client";
import { trpc } from "@/lib/trpc/trpc-client";
import { PulseLoader } from "react-spinners";
import parse from "react-html-parser";
import ShadowDom from "react-shadow";
import React from "react";
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const message = trpc.getMessageProcedure.useQuery({ id });
  return (
    <div className="flex flex-col flex-1">
      <MenubarDemo />

      {message.isLoading ? (
        <PulseLoader color="#f8fafc" loading={true} className="pr-5" />
      ) : (
        <div className="flex flex-col flex-1 items-start p-0 lg:pr-4 lg:pl-4 lg:pb-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {message.data?.title}
          </h2>
          <div className="flex items-center gap-2">
            <div className="text-lg font-semibold">
              {message.data?.sendersName}
            </div>
            <p className="text-sm text-muted-foreground">
              {"<"}
              {message.data?.sendersEmail}
              {">"}
            </p>
          </div>
          <div className="flex-1 p-0 lg:pr-4 lg:pb-4 w-full relative">
            {message.data?.contentType == "html" ? (
              <HtmlParser content={message.data?.content} />
            ) : (
              <PlaintextParser content={message.data?.content} />
            )}
          </div>
          {/* {JSON.stringify(message.data)} */}
        </div>
      )}
    </div>
  );
}

function HtmlParser({ content }: { content: string }) {
  const parsedContent = parse(content);
  const resetStyles = `html, body {
    height: auto;
    width: auto;
    margin: 0;
    padding: 0;
    font-size: 100%;
    font-family: inherit;
    line-height: 1.15;
    color: initial;
    background: initial;
  }
  `;
  return (
    <div className="contain absolute w-full h-full bg-[#f8fafc] box-border isolate rounded-lg break-words overflow-y-scroll">
      <ShadowDom.div>
        <style>{resetStyles}</style>
        {parsedContent}
      </ShadowDom.div>
    </div>
  );
}
function PlaintextParser({ content }: { content: string }) {
  return (
    <div className=" h-full w-full flex justify-center">
      <p className="leading-7 [&:not(:first-child)]:mt-6 ">{content}</p>
    </div>
  );
}

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEffect, useRef } from "react";

export function MenubarDemo() {
  return (
    <Menubar className=" border-none">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarTrigger>Profiles</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}

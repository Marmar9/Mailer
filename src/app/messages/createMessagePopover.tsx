"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DashboardLayoutContext } from "@/context/DashboardLayoutContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { trpc } from "@/lib/trpc/trpc-client";
import { useSession } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
const FormSchema = z.object({
  title: z.string(),
  receiversEmail: z.string(),
  content: z.string(),
  contentType: z.literal("plaintext").or(z.literal("html")),
});

const contentType = [
  { label: "html", value: "html" },
  { label: "plaintext", value: "plaintext" },
] as const;

export function CreateMessagePopover() {
  const session = useSession();
  const createMessageMutation = trpc.createMesssageProcedure.useMutation();
  const { setIsOpened } = useContext(DashboardLayoutContext);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
      receiversEmail: "",
      title: "",
      contentType: undefined,
    },
  });

  return (
    <Card className=" fixed z-50 bottom-10 sm:bottom-0 sm:left-1/2 sm:transform sm:-translate-x-1/2">
      <CardHeader>
        <CardTitle>New message</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data: z.infer<typeof FormSchema>) => {
              // session.data?.user.
              // console.log(data);
              // console.log(session.data?.user);
              createMessageMutation.mutate({
                title: data.title,
                content: data.content,
                sendersEmail: session.data?.user?.name as string,
                receiversEmail: data.receiversEmail,
                contentType: data.contentType,
                sendersName: session.data?.user?.name as string,
                date: new Date().toISOString(),
              });
              setIsOpened(false);
            })}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Email adress" {...field} />
                  </FormControl>
                  <FormDescription>Enter message title</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="receiversEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ReveiversEmail</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="ReceiversEmail"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter Receivers Email Here</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="message content"
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormDescription>Enter your message here</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contentType"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Content type</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? contentType.find(
                                (messageType) =>
                                  messageType.value === field.value
                              )?.label
                            : "Select message type"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search framework..."
                          className="h-9"
                        />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {contentType.map((messageType) => (
                            <CommandItem
                              value={messageType.label}
                              key={messageType.value}
                              onSelect={() => {
                                form.setValue("contentType", messageType.value);
                              }}
                            >
                              {messageType.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  messageType.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    On the basis of that what you chose message will be parsed
                    to html or displayed as plaintext
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsOpened(false)}>
                Cancel
              </Button>
              <Button type="submit">Send</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

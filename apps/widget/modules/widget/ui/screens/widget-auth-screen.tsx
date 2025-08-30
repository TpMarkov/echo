import { WidgetHeader } from "../components/widget-header";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
} from "@workspace/ui/components/form";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Doc } from "@workspace/backend/_generated/dataModel";
import { useAtomValue, useSetAtom } from "jotai";
import {
  contactSessionIdAtomFamily,
  organizationIdAtom,
} from "../../atoms/widget-atoms";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

export const WidgetAuthScreen = () => {
  const organizationId = useAtomValue(organizationIdAtom);
  const setContactSessionId = useSetAtom(
    contactSessionIdAtomFamily(organizationId || "")
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const createContactSession = useMutation(api.public.contactSessions.create);

  //  Temp hardcoded organizationId before implementing users-organization managment system

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const offset = new Date().getTimezoneOffset();

    if (!organizationId) {
      return;
    }

    const metadata: Doc<"contactSession">["metadata"] = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages?.join(","),
      platform: navigator.platform,
      vendor: navigator.vendor,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      cookieEnabled: navigator.cookieEnabled,
      referrer: document.referrer || "direct",
      currentUrl: window.location.href,
    };

    const contactSessionId = await createContactSession({
      ...values,
      organizationId,
      metadata,
    });

    setContactSessionId(contactSessionId);
  };

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <p className="font-semibold text-3xl">Hi there! 👋</p>
          <p className="font-semibold text-lg">Let's get you started</p>
        </div>
      </WidgetHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-y-4 p-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 bg-background"
                    placeholder="e.g John Doe"
                    type="text"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 bg-background"
                    placeholder="john-doe@example.com"
                    type="text"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            size={"lg"}
          >
            Continue
          </Button>
        </form>
      </Form>
    </>
  );
};

import React from "react";
import { FormSchema } from "@/modules/customization/types";

import { UseFormReturn } from "react-hook-form";
import {
  useVapiAssistants,
  useVapiPhoneNumbers,
} from "@/modules/plugins/hooks/use-vapi-data";

import {
  Form,
  FormField,
  FormDescription,
  FormLabel,
  FormItem,
  FormMessage,
  useFormField,
  FormControl,
} from "@workspace/ui/components/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@workspace/ui/components/select";

interface VapiFormFieldsProps {
  form: UseFormReturn<FormSchema>;
}

const VapiFormFields = ({ form }: VapiFormFieldsProps) => {
  const { data: assistants, isLoading: assistantsLoading } =
    useVapiAssistants();

  const { data: phoneNumbers, isLoading: phoneNumbersLoading } =
    useVapiPhoneNumbers();

  const disabled = form.formState.isSubmitting;

  return (
    <>
      <FormField
        control={form.control}
        name="vapiSettings.assistantId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Voice Assistant</FormLabel>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={assistantsLoading || disabled}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      assistantsLoading
                        ? "Loading assistants..."
                        : "Select an assistant"
                    }
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {assistants?.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name || "Unnamed Assistant"} -{" "}
                    {a.model?.model || "Unknown model"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              The Vapi assistat to use for voice calls
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="vapiSettings.phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Display Phone Number</FormLabel>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={phoneNumbersLoading || disabled}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      assistantsLoading
                        ? "Phone numbers loading..."
                        : "Select a phone number"
                    }
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {phoneNumbers?.map((pn) => (
                  <SelectItem key={pn.id} value={pn.number || pn.id}>
                    {pn.number || "Unknown"} - {pn.name || "Unnamed"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Phone number to display in the widget
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default VapiFormFields;

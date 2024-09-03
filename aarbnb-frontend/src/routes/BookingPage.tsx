import { useSessionContext } from "@/context/SessionContext";
import { cn } from "@/utils";
import { Button } from "@components/button";
import { Calendar } from "@components/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/form";
import { Input } from "@components/input";
import { Popover, PopoverContent, PopoverTrigger } from "@components/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useCallback } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { useServicesContext } from "../context/ServicesContext";

interface BookingForm {
  dateRange: DateRange | undefined;
  startTime: string;
  endTime: string;
}

export const BookingPage = () => {
  const { bookingService } = useServicesContext();
  const { user } = useSessionContext();

  const form = useForm<BookingForm>({
    defaultValues: {
      dateRange: undefined,
      startTime: "00:00",
      endTime: "00:00",
    },
  });

  const onSubmit = useCallback((formData: BookingForm) => {
    const dateRange = formData.dateRange;
    const startDate = dateRange?.from?.toISOString().split("T")[0];
    const endDate = dateRange?.to?.toISOString().split("T")[0];

    const startTime = formData.startTime;
    const endTime = formData.endTime;

    if (startDate == null || endDate == null) {
      throw new Error("pls leave");
    }

    bookingService
      .createBooking({
        userId: user?.id ?? "",
        startDate,
        startTime,
        endDate,
        endTime,
      })
      .then(() => {});
  }, []);

  return (
    <>
      <div>Why don't you come an stay at the Aarbnb?</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input {...field} type="time" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input {...field} type="time" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

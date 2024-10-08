import { DateTime } from "luxon";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/alert-dialog";
import { Button } from "@components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/form";
import { Input } from "@components/input";
import { Textarea } from "@components/textarea";
import { useServicesContext } from "../context/ServicesContext";
import { useSessionContext } from "../context/SessionContext";
import { AppRequest, User } from "../types";

export const HomePage: React.FC = () => {
  const { requestService } = useServicesContext();
  const { user } = useSessionContext();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [requestSubmitted, setRequestSubmitted] = useState<boolean>(false);

  const form = useForm<AppRequest>({
    defaultValues: {
      subject: "",
      description: "",
      user: user?.id ?? "",
      timestamp: DateTime.now().valueOf(),
    },
  });

  const onConfirm = (request: AppRequest) => {
    requestService
      .saveRequest(request)
      .then((id) => {
        alert(`submitted request with id: ${id}`);
        setRequestSubmitted(true);
      })
      .catch((e) => console.log(e))
      .finally(() => setShowModal(false));
  };

  return (
    <div>
      <div>{getWelcomeText(user)}</div>
      <AlertDialog
        open={requestSubmitted}
        onOpenChange={(open) => setRequestSubmitted(open)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Your request has succuessfully been submitted!
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div>
        <Dialog open={showModal} onOpenChange={(open) => setShowModal(open)}>
          <DialogTrigger asChild>
            <Button onClick={() => setShowModal(true)}>Make a Request</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Make a Request</DialogTitle>
            <DialogDescription>Please be nice</DialogDescription>
            <Form {...form}>
              <form
                className="space-y-8"
                onSubmit={form.handleSubmit(onConfirm)}
              >
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Submit</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Button>
          <Link to="/booking">Make a Booking</Link>
        </Button>
      </div>
    </div>
  );
};

const getWelcomeText = (user: User | null) => {
  return user ? `Welcome ${user.name}` : "Welcome!";
};

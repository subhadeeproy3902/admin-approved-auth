"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { approveUser, rejectUser } from "@/actions/user.actions";
import { useState, useEffect } from "react";
import {
  Loader2,
  Trash2,
  ChevronsUpDown,
  ArchiveIcon,
  ArchiveRestore,
  Clock,
  Edit,
  CheckCircle2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { sendToEmail } from "@/actions/sendEmail";

interface UserProps {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  isRegistered: boolean;
}

const ActionDialog = ({
  dialogTitle,
  user,
  dialogDescription,
  buttonName,
  successTitle,
}: {
  dialogTitle: string;
  dialogDescription: string;
  buttonName: string;
  successTitle: string;
  user: UserProps;
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    await approveUser(user.id);
    try {
      sendToEmail(
        user.email,
        `Hello ${user.name}, you have been approved as ${user.role}. Please try to login now.`,
        "You have been approved"
      );
      setTimeout(() => {
        setLoading(false);
        setIsSubmitted(true);
      }, 3000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    await rejectUser(user.id);
    try {
      sendToEmail(
        user.email,
        `Hello ${user.name}, you have been rejected as ${user.role}. Might be your credentials are not correct. Please try to register again.`,
        "You have been rejected"
      );
      setTimeout(() => {
        setLoading(false);
        setIsSubmitted(true);
      }, 3000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`h-9 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 
        ${
          buttonName == "Approve"
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-500 hover:bg-red-600"
        }  
      `}
      >
        {buttonName}
      </AlertDialogTrigger>
      <AlertDialogContent>
        {!isSubmitted && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
              <AlertDialogDescription>
                {dialogDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                onClick={buttonName == "Approve" ? handleApprove : handleReject}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Continue"}
              </Button>
            </AlertDialogFooter>
          </>
        )}
        {isSubmitted && !loading && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex gap-2 items-center">
                <p>{successTitle}</p> <CheckCircle2 className="w-6 h-6" />
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  window.location.reload();
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default function AdminCrud({ user }: { user: UserProps }) {
  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="font-bold text-lg text-wrap break-all">
              {user.name}
            </div>
          </div>
          <div className="text-muted-foreground mt-2 text-wrap break-all">
            {user.email}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-muted-foreground text-blue-400">{user.role}</div>
          <div className="flex justify-end gap-4">
            <ActionDialog
              successTitle={`${user.name} has been approved`}
              buttonName="Approve"
              dialogTitle="Are you absolutely sure?"
              dialogDescription={`This action cannot be undone. This will add ${user.email} as ${user.role}.`}
              user={user}
            />
            <ActionDialog
              successTitle={`${user.name} has been rejected`}
              buttonName="Reject"
              dialogTitle="Are you absolutely sure?"
              dialogDescription={`This action cannot be undone. This will reject ${user.email} as ${user.role}. He/She has to register again.`}
              user={user}
            />
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

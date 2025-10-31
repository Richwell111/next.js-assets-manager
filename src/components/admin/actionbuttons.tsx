"use client";

import { useState } from "react";
import { approveAssetAction, rejectAssetAction } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ActionButtonsProps {
  assetId: string;
}

export function ActionButtons({ assetId }: ActionButtonsProps) {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      await approveAssetAction(assetId);
      toast.success("Asset approved successfully");
    } catch (error) {
      toast.error("Failed to approve asset");
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      await rejectAssetAction(assetId);
      toast.warning("Asset rejected");
    } catch (error) {
      toast.error("Failed to reject asset");
    } finally {
      setIsRejecting(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleApprove}
        disabled={isApproving || isRejecting}
        className="bg-teal-500 hover:bg-teal-600 text-white flex items-center gap-2"
      >
        {isApproving ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Approving...
          </>
        ) : (
          "Approve"
        )}
      </Button>

      <Button
        onClick={handleReject}
        disabled={isApproving || isRejecting}
        className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
      >
        {isRejecting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Rejecting...
          </>
        ) : (
          "Reject"
        )}
      </Button>
    </div>
  );
}

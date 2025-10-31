import { getPendingAssetsAction } from "@/actions/admin-actions";
import { ActionButtons } from "@/components/admin/actionbuttons";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { User } from "lucide-react";
import Image from "next/image";


const AssetApprovalPage = async () => {
  const pendingAssets = await getPendingAssetsAction();

  return (
    <div className="container py-10">
      {pendingAssets.length === 0 ? (
        <Card className="bg-white">
          <CardContent className="py-16 flex flex-col items-center justify-center">
            <p className="text-center text-slate-500 text-lg">
              All assets have been reviewed
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pendingAssets.map(({ asset, userName }) => (
            <div
              key={asset.id}
              className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow transition-shadow"
            >
              {/* Asset Image */}
              <div className="h-48 bg-slate-100 relative">
                <Image
                  src={asset.fileUrl}
                  alt={asset.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Asset Info */}
              <div className="p-4">
                <h3 className="font-medium truncate">{asset.title}</h3>
                {asset.description && (
                  <p className="text-xs text-slate-500">{asset.description}</p>
                )}
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-slate-400">
                    {formatDistanceToNow(new Date(asset.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                  <div className="flex items-center text-xs text-slate-400">
                    <User className="mr-2 w-4 h-4" />
                    {userName}
                  </div>
                </div>
              </div>

              {/* ✅ Action Buttons */}
              <div className="p-4 flex justify-between items-center">
                <ActionButtons assetId={asset.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetApprovalPage;

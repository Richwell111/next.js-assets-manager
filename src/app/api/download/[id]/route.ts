// import { getAssetByIdAction } from "@/actions/dashboard-actions";
// import { hasUserPurchasedAssetAction } from "@/actions/payment-actions";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params;

//   try {
//     const session = await auth.api.getSession({
//       headers: await headers(),
//     });

//     if (!session?.user.id) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     const hasPurchased = await hasUserPurchasedAssetAction(id);

//     if (!hasPurchased) {
//       return NextResponse.redirect(new URL(`/gallery/${id}`, request.url));
//     }

//     const result = await getAssetByIdAction(id);

//     if (!result) {
//       return NextResponse.redirect(new URL(`/gallery`, request.url));
//     }

//     return NextResponse.redirect(result?.asset.fileUrl);
//   } catch (e) {
//     return NextResponse.redirect(new URL(`/gallery`, request.url));
//   }
// }
import { getAssetByIdAction } from "@/actions/dashboard-actions";
import { hasUserPurchasedAssetAction } from "@/actions/payment-actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // 🔒 Must be logged in
    if (!session?.user.id) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 🔒 Must have purchased
    const hasPurchased = await hasUserPurchasedAssetAction(id);
    if (!hasPurchased) {
      return NextResponse.redirect(new URL(`/gallery/${id}`, request.url));
    }

    // ✅ Fetch asset
    const result = await getAssetByIdAction(id);
    if (!result?.asset?.fileUrl) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    const fileUrl = result.asset.fileUrl;

    // ✅ Detect file name + extension
    const urlParts = fileUrl.split("/");
    const fileName = urlParts[urlParts.length - 1] || `asset-${id}.jpg`;

    // ✅ Fetch image directly and stream it to the user
    const imageResponse = await fetch(fileUrl);
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: 404 }
      );
    }

    const contentType =
      imageResponse.headers.get("content-type") || "image/jpeg";

    // ✅ Stream image to client as downloadable file
    return new NextResponse(imageResponse.body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("Download failed:", error);
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}

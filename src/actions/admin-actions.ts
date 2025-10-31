'use server'
import { auth } from "@/lib/auth"
import { asset, category, db, user } from "@/lib/db"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import {z} from "zod"

const categorySchema = z.object({
    name:z.string().min(2,"Category name must be at least 2 characters").max(100,"Category name must be at most 100 characters")
})

export type CategoryFormValues = z.infer<typeof categorySchema>

export async function addCategoryAction(formData:FormData){
    const session = await auth.api.getSession({
        headers:await headers()
    })
    if(!session?.user || session.user?.role !== "admin"){
        throw new Error("You must be an admin to add categories.")
    }
    try {
        const name = formData.get("name") as string
        const validateFields = categorySchema.parse({name})
        // Add logic to insert the new category into the database  
        const existingCategory =  await db.select().from(category).where(eq(category.name,validateFields.name)).limit(1)
        if(existingCategory.length > 0){
return {
    success:false,
    message:"Category with this name already exists."
}
        }
        await db.insert(category).values({
            name:validateFields.name
        })
        revalidatePath('/admin/settings')
        return{
            success:true,
            message:"Category added successfully."
        }

    } catch (error) {
        console.error("Error adding category:",error)
        return{
            success:false,
            message:"There was an error adding the category."
        }
        
    }

}

export async function getAllCategoriesAction(){
    try {

        const categories = await db.select().from(category).orderBy(category.name)
        return categories
        
    } catch (error) {
        console.error("Error fetching categories:",error)
        return []
        
    }
}
export async function editCategoryAction(categoryId:number,formData:FormData){}

export async function deleteCategoryAction(categoryId:number){
    const session = await auth.api.getSession({
        headers:await headers()
    })
    if(!session?.user || session.user?.role !== "admin"){
        throw new Error("You must be an admin to delete categories.")
    }
    try {
        await db.delete(category).where(eq(category.id,categoryId))
        revalidatePath('/admin/settings')
        return{
            success:true,
            message:"Category deleted successfully."
        }
        
    } catch (error) {
        console.error("Error deleting category:",error)
        return{
            success:false,
            message:"There was an error deleting the category."
        }
        
    }
}

export async function getTotalUsersCountAction(){
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user || session.user?.role !== "admin") {
      throw new Error("You must be an admin to view total users count.");
    }
    try {
        const result = await db.select({count: sql<number>`count(*)`}).from(user)
        return result[0]?.count || 0;
        

        
    } catch (error) {
        console.error("Error fetching total users count:",error)
        return 0
        
    }
}


export async function getTotalAssetsCountAction() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    throw new Error("You must be an admin to access this data");
  }

  try {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(asset);

    return result[0]?.count || 0;
  } catch (e) {
    console.log(e);

    return 0;
  }
}

export async function approveAssetAction(assetId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    throw new Error("You must be an admin to approve this data");
  }

  try {
    await db
      .update(asset)
      .set({ isApproved: "approved", updatedAt: new Date() })
      .where(eq(asset.id, assetId));
    revalidatePath("/admin/asset-approval");
    return {
      success: true,
    };
  } catch (e) {
    return {
      success: false,
    };
  }
}

export async function rejectAssetAction(assetId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    throw new Error("You must be an admin to reject this data");
  }

  try {
    await db
      .update(asset)
      .set({ isApproved: "rejected", updatedAt: new Date() })
      .where(eq(asset.id, assetId));
    revalidatePath("/admin/asset-approval");

    return {
      success: true,
    };
  } catch (e) {
    return {
      success: false,
    };
  }
}

export async function getPendingAssetsAction() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "admin") {
    throw new Error("You must be an admin to access this data");
  }

  try {
    const pendingAssets = await db
      .select({
        asset: asset,
        userName: user.name,
      })
      .from(asset)
      .leftJoin(user, eq(asset.userId, user.id))
      .where(eq(asset.isApproved, "pending"));

    return pendingAssets;
  } catch (e) {
    return [];
  }
}

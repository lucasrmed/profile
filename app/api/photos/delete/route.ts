import { NextResponse } from "next/server"
import { del } from "@vercel/blob"

export async function DELETE(request: Request) {
  try {
    const password = request.headers.get("x-admin-password")

    // Simple password check
    if (password !== "lucasmedeiros2025") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, imageUrl } = await request.json()

    // Delete from Vercel Blob if it's a blob URL
    if (imageUrl.includes("blob.vercel-storage.com")) {
      try {
        await del(imageUrl)
      } catch (error) {
        console.error("Error deleting from blob:", error)
      }
    }

    // TODO: Delete from database or persistent storage
    // For now, just return success

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting photo:", error)
    return NextResponse.json({ error: "Failed to delete photo" }, { status: 500 })
  }
}
